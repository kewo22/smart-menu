"use client";

import React, { useRef } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { createTemplateSheetSheet as createTemplateSheetSheetAction } from "@/app/actions/gl-sheet-2.actions";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

import { SubmitBtn } from "../../_components/SubmitBtn";
import { createTemplate as createTemplateAction } from "../../actions/template.actions";

import { cn } from "@/_lib/utils";
import { ActionResponse } from "@/_lib/interfaces/global";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { sheets_v4 } from "googleapis";
import { Template } from "@prisma/client";

export const CreateTemplateSchema = z.object({
    name: z.string().trim().min(1, { message: "Required" }).refine(s => !s.includes(' '), `Title cannot contain spaces.`)
});
export type CreateTemplateValidatePayload = z.infer<typeof CreateTemplateSchema>;
export type TemplatePayload = {
    spreadsheetId: string;
    spreadsheetUrl: string;
} & CreateTemplateValidatePayload;

type CreateTemplateFormProps = {
    onTemplateCreated: (row: Template) => void;
}

export default function CreateTemplateForm(props: CreateTemplateFormProps) {
    const { onTemplateCreated } = props;
    const isLoadingRef = useRef(false)

    const form = useForm<CreateTemplateValidatePayload>({
        resolver: zodResolver(CreateTemplateSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof CreateTemplateSchema>) => {
        isLoadingRef.current = true;
        const templateSheet = await createTemplateSheetSheet(values)
        setTimeout(async () => {
            const templateRes = templateSheet && await createTemplate(templateSheet)
            form.reset()
            isLoadingRef.current = false;
            if (templateRes) {
                // const template: Template = {
                //     ...templateRes,
                //     name: templateRes.name,
                //     id: templateRes.id,
                //     spreadsheetId: templateRes.spreadsheetId,
                //     spreadsheetUrl: templateRes.spreadsheetUrl,
                // }
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

    const createTemplate = async (template: sheets_v4.Schema$Spreadsheet) => {
        const sheet = await createTemplateAction({
            name: template.properties!.title!,
            spreadsheetUrl: template!.spreadsheetUrl!,
            spreadsheetId: template!.spreadsheetId!
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
                <SubmitBtn isLoading={isLoadingRef.current} />
            </form>
        </Form>
    );
}
