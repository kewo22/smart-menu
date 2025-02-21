"use client";

import React, { useRef, useActionState } from "react";
import { useForm } from "react-hook-form";
import { PutBlobResult } from "@vercel/blob";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { createTemplateSheetSheet as createTemplateSheetSheetAction } from "@/app/actions/gl-sheet-2.actions";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

import { SubmitBtn } from "../../_components/SubmitBtn";
import { createTemplate as createTemplateAction, UploadPreviewImage } from "../../actions/template.actions";

import { cn } from "@/_lib/utils";
import { ActionResponse } from "@/_lib/interfaces/global";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { sheets_v4 } from "googleapis";
import { Template } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/_lib/constants/global";

export const CreateTemplateSchema = z.object({
    name: z.string().trim().min(1, { message: "Required" }).refine(s => !s.includes(' '), `Title cannot contain spaces.`),
    description: z.string().trim().min(1, { message: "Required" }),
    previewImage: z
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
export type CreateTemplateValidatePayload = z.infer<typeof CreateTemplateSchema>;
export type TemplatePayload = {
    spreadsheetId: string;
    spreadsheetUrl: string;
    previewImageUrl: string;
} & Omit<CreateTemplateValidatePayload, 'previewImage'>;

type CreateTemplateFormProps = {
    onTemplateCreated: (row: Template) => void;
}

export default function CreateTemplateForm(props: CreateTemplateFormProps) {
    const { onTemplateCreated } = props;
    const isLoadingRef = useRef(false);

    const defaultValues = {
        name: "",
        description: "",
        previewImage: undefined,
    }

    const form = useForm<CreateTemplateValidatePayload>({
        resolver: zodResolver(CreateTemplateSchema),
        defaultValues,
    });

    const onSubmit = async (values: z.infer<typeof CreateTemplateSchema>) => {
        isLoadingRef.current = true;
        const logoFormData = new FormData();
        logoFormData.append("previewImage", values.previewImage[0]);
        const previewImageResult = await UploadPreviewImage(logoFormData);
        if (previewImageResult.error) {
            isLoadingRef.current = false;
            showToast(previewImageResult)
            return;
        }
        const templateSheet = await createTemplateSheetSheet(values)
        setTimeout(async () => {
            const templateRes = templateSheet && (await createTemplate(templateSheet, previewImageResult.data!))
            form.reset(defaultValues);
            form.setValue("previewImage", undefined as any);
            isLoadingRef.current = false;
            if (templateRes) {
                onTemplateCreated(templateRes);
            }
        }, 1000);
    }

    const createTemplateSheetSheet = async (values: z.infer<typeof CreateTemplateSchema>) => {
        const template = await createTemplateSheetSheetAction(values.name);
        if (template.error) {
            isLoadingRef.current = false;
            showToast(template);
            return;
        }
        if (!template.data) {
            isLoadingRef.current = false;
            // show error alert or toast
            return;
        }
        showToast(template);
        return template.data;
    }

    const createTemplate = async (template: sheets_v4.Schema$Spreadsheet, imageResult: PutBlobResult) => {
        const sheet = await createTemplateAction({
            name: template.properties!.title!,
            spreadsheetUrl: template!.spreadsheetUrl!,
            spreadsheetId: template!.spreadsheetId!,
            description: form.getValues('description'),
            previewImageUrl: imageResult.url
        });
        if (sheet.error) {
            isLoadingRef.current = false;
            showToast(sheet);
            return;
        }
        isLoadingRef.current = false;
        showToast(sheet);
        return sheet.data;
    }

    const showToast = (response: ActionResponse) => {
        if (response.error) {
            toast({
                className: cn(
                    "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
                ),
                title: "Error from server",
                description: response.message,
                variant: "destructive",
            });
            return;
        }
        toast({
            className: cn(
                "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-green-500 text-white"
            ),
            title: "Success",
            description: response.message,
            variant: "default",
        });
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-row items-end gap-5"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Sheet Name</FormLabel>
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
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea {...field} rows={1} className="min-h-full" />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="previewImage"
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
                                        // disabled={!!formData}
                                        onChange={(event) => {
                                            const dataTransfer = new DataTransfer();
                                            dataTransfer.items.add(event.target.files![0]);
                                            const newFile = dataTransfer.files;
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

                <SubmitBtn isLoading={isLoadingRef.current} />
            </form>
        </Form>
    );
}
