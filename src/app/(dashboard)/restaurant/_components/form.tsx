"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { PutBlobResult } from "@vercel/blob";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Restaurant } from "@prisma/client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubmitBtn } from "@/app/_components/SubmitBtn";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/_lib/utils";
import {
  CreateRestaurant,
  EditRestaurant,
  UploadLogo,
} from "@/app/actions/restaurant-actions";
import { Button } from "@/components/ui/button";

const MAX_FILE_SIZE = 4000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const RestaurantSchema = z.object({
  name: z.string().trim().min(1, { message: "Required" }),
  address: z.string().trim().min(1, { message: "Required" }),
  logo: z
    .custom<FileList>((val) => val instanceof FileList, "Required")
    // .refine((files) => files.length > 0, `Required`)
    // .refine((files) => files.length <= 5, `Maximum of 5 images are allowed.`)
    .refine(
      (files) =>
        Array.from(files).every((file) =>
          ACCEPTED_IMAGE_TYPES.includes(file.type)
        ),
      "Only these types are allowed .jpg, .jpeg, .png"
    )
    .refine((files) => {
      return Array.from(files).every((file) => file.size <= MAX_FILE_SIZE);
    }, `Each file size should be less than 4 MB.`),
});

export type RestaurantValidatePayload = z.infer<typeof RestaurantSchema>;
export type RestaurantCreate = Omit<RestaurantValidatePayload, "logo"> & {
  logoUrl: string;
};

type CreateRestaurantFormProps = {
  formData?: Restaurant | null;
  onRestaurantCreated: (restaurant: Restaurant) => void;
  onRestaurantEdited: (restaurant: Restaurant) => void;
  onResetRestaurantForm: () => void;
};

export default function CreateRestaurantForm(props: CreateRestaurantFormProps) {
  const {
    formData,
    onRestaurantCreated,
    onRestaurantEdited,
    onResetRestaurantForm,
  } = props;
  const { toast } = useToast();
  const [logoPreview, setLogoPreview] = useState("/placeholder-image.jpg");
  const submitBtnTextRef = useRef("Add Restaurant");

  const form = useForm<RestaurantValidatePayload>({
    resolver: zodResolver(RestaurantSchema),
    defaultValues: {
      name: formData?.name || "",
      address: formData?.address || "",
      logo: undefined,
    },
  });

  useEffect(() => {
    if (formData) {
      form.setValue("name", formData.name);
      form.setValue("address", formData.address);
      const dataTransfer = new DataTransfer();
      const newFile = dataTransfer.files;
      form.setValue("logo", newFile);
      setLogoPreview(formData.logo);
      // RestaurantSchema.safeParse(form.getValues())
    }
  }, [formData, form]);

  if (formData) {
    submitBtnTextRef.current = "Edit Restaurant";
  }

  const onSubmit = async (values: z.infer<typeof RestaurantSchema>) => {
    try {
      const logoFormData = new FormData();
      logoFormData.append("logo", values.logo[0]);
      const logoResponse = await UploadLogo(logoFormData);
      if (logoResponse) {
        let res = null;
        if (formData) {
          // edit
          const restaurantData: Restaurant = {
            ...values,
            id: formData.id,
            userId: formData.userId,
            logo: formData.logo,
          };
          res = await EditRestaurant(restaurantData);
        } else {
          // create
          const restaurantFormData: RestaurantCreate = {
            address: values.address,
            logoUrl: (logoResponse as PutBlobResult).url,
            name: values.name,
          };
          res = await CreateRestaurant(restaurantFormData);
        }

        if (res.error) {
          toast({
            className: cn(
              "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
            ),
            title: "Error from server",
            description: res.error,
            variant: "destructive",
          });
        } else {
          if (formData) {
            onRestaurantEdited(res.restaurant as Restaurant);
          } else {
            onRestaurantCreated(res.restaurant as Restaurant);
          }
          form.reset();
          setLogoPreview("/placeholder-image.jpg");
          const dataTransfer = new DataTransfer();
          const newFile = dataTransfer.files;
          form.setValue("logo", newFile);
          toast({
            className: cn(
              "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-green-500 text-white"
            ),
            title: "Success",
            description: formData ? "Restaurant edited" : "Restaurant created",
            variant: "default",
          });
        }
      }
    } catch (error) {
      toast({
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
        title: "Error from server",
        description: "Operation failed, Please contact the developer",
        variant: "destructive",
      });
    }
  };

  const onResetClick = () => {
    submitBtnTextRef.current = "Add Restaurant";
    form.reset();
    form.setValue("logo", undefined as any);
    setLogoPreview("/placeholder-image.jpg");
    onResetRestaurantForm();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 px-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} disabled={!!formData} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="logo"
          render={({ field: { onChange }, ...field }) => {
            return (
              <FormItem>
                <FormLabel>Logo</FormLabel>
                <FormControl>
                  <Input
                    accept="image/*"
                    id="file-input"
                    type="file"
                    {...field}
                    disabled={!!formData}
                    onChange={(event) => {
                      const dataTransfer = new DataTransfer();
                      dataTransfer.items.add(event.target.files![0]);
                      const newFile = dataTransfer.files;
                      setLogoPreview(URL.createObjectURL(newFile[0]));
                      onChange(newFile);
                    }}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Image
          src={logoPreview}
          alt=""
          id="preview-image"
          priority
          height={100}
          width={100}
          className="border border-dashed border-slate-500 w-full p-1 rounded"
        />
        <SubmitBtn btnText={submitBtnTextRef.current} />
        {formData && (
          <Button variant="outline" onClick={onResetClick}>
            Reset
          </Button>
        )}
      </form>
    </Form>
  );
}
