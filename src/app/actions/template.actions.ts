"use server";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { db } from "@/_lib/db";
import { ActionResponse } from "@/_lib/interfaces/global";

import {
  CreateTemplateValidatePayload,
  TemplatePayload,
} from "../template/_components/form";
import { Prisma, Template } from "@prisma/client";

export async function createTemplate(
  template: TemplatePayload
): Promise<ActionResponse<Template>> {
  const templateObj = {
    ...template,
    name: template.name,
    spreadsheetUrl: template.spreadsheetUrl,
    spreadsheetId: template.spreadsheetId,
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
