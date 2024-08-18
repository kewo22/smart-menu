"use server";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { db } from "@/_lib/db";
import { ActionResponse } from "@/_lib/interfaces/global";

import {
  CreateTemplateValidatePayload,
  TemplatePayload,
} from "../template/_components/form";
import { Prisma, Template } from "@prisma/client";
import { put, PutBlobResult } from "@vercel/blob";

export async function createTemplate(
  template: TemplatePayload
): Promise<ActionResponse<Template>> {
  const templateObj = {
    ...template,
    name: template.name,
    spreadsheetUrl: template.spreadsheetUrl,
    spreadsheetId: template.spreadsheetId,
    description: template.description,
    previewImageUrl: template.previewImageUrl,
  };

  try {
    const template = await db.template.create({
      data: templateObj,
    });
    return { message: `Template created successfully`, data: template };
  } catch (e: any) {
    if (e instanceof PrismaClientKnownRequestError) {
    }
    return { message: "Failed to create template", error: e };
  }
}

export async function UploadPreviewImage(
  formData: any
): Promise<ActionResponse<PutBlobResult>> {
  try {
    const previewImgFile = formData.get("previewImage") as File;
    const blob: PutBlobResult = await put(previewImgFile.name, previewImgFile, {
      access: "public",
    });
    return {
      data: blob,
      message: "Preview image uploaded",
    };
  } catch (e: any) {
    return { error: JSON.stringify(e), message: "Preview image upload fail" };
  }
}
