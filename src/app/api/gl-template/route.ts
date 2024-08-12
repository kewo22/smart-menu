import { authOptions } from "@/_lib/auth-options";
import { db } from "@/_lib/db";
import { glAuth } from "@/_lib/google";
import { google } from "googleapis";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  console.log(url);
  // const skip = url.searchParams.get("skip");

  const session = await getServerSession(authOptions);

  const auth = await glAuth();
  const drive = google.drive({ version: "v3", auth });
  const sheets = google.sheets({ version: "v4", auth });

  // get sheet data
  const sheetData = await sheets.spreadsheets.values.get({
    spreadsheetId: "1UsbfZvk-OiaEVOq0eDn8BC9a7_wMZkEai4zMJ1sKmcg",
    range: "Sheet1",
  });

  const sheet = await sheets.spreadsheets.create({
    requestBody: {
      properties: {
        title: `RestaurantName-ID`,
      },
    },
  });

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheet.data.spreadsheetId!,
    range: "sheet1",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: sheetData.data.values,
    },
  });

  const res = await drive.permissions.create({
    fileId: sheet.data.spreadsheetId!,
    requestBody: {
      emailAddress: session?.user?.email,
      type: "user",
      role: "writer",
    },
  });

  return Response.json(sheetData);
}
