"use server";

import { drive_v3, google, sheets_v4 } from "googleapis";
import { getServerSession } from "next-auth";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { authOptions } from "@/_lib/auth-options";
import { createSheet, glAuth } from "@/_lib/google";
import { db } from "@/_lib/db";
import {
  ActionErrors,
  ActionResponse,
  ActionResult,
  FieldErrors,
} from "@/_lib/interfaces/global";
import { CreateTemplateSchema } from "../template/_components/form";
import { ZodError } from "zod";

export const createTemplateSheetSheet = async (
  title: string
): Promise<ActionResponse<sheets_v4.Schema$Spreadsheet>> => {
  const auth = await glAuth();
  const sheets = google.sheets({ version: "v4", auth });

  try {
    const sheet = await sheets.spreadsheets.create({
      requestBody: {
        properties: {
          title,
        },
      },
    });
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheet.data.spreadsheetId!,
      range: "sheet1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        // make dynamic
        values: [
          ["Starters"],
          ["Item", "Price"],
          ["Item 1", "100"],
          ["Item 2", "100"],
          ["Item 3", "100"],
          ["Mains"],
          ["Item", "Price"],
          ["Item 1", "100"],
          ["Item 2", "100"],
          ["Item 3", "100"],
          ["Desserts"],
          ["Item", "Price"],
          ["Item 1", "100"],
          ["Item 2", "100"],
          ["Item 3", "100"],
        ],
      },
    });

    const permissionRes = await createPermission(sheet.data);

    return { message: `Sheet created`, data: sheet.data };
  } catch (e: any) {
    return {
      message: "Failed to create sheet",
      error: "e",
    };
  }
};

const createPermission = async (
  sheet: sheets_v4.Schema$Spreadsheet
): Promise<ActionResponse<drive_v3.Schema$Permission>> => {
  const auth = await glAuth();
  const session = await getServerSession(authOptions);
  const drive = google.drive({ version: "v3", auth });
  try {
    const res = await drive.permissions.create({
      fileId: sheet.spreadsheetId!,
      requestBody: {
        emailAddress: session?.user?.email,
        type: "user",
        role: "writer",
      },
    });
    return { data: res.data, message: "Permission created" };
  } catch (error: any) {
    return {
      error,
      message: "Failed to create permission",
    };
  }
};
