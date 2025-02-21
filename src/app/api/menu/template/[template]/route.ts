import { authOptions } from "@/_lib/auth-options";
import { getServerSession } from "next-auth";
import { google } from "googleapis";
import { glAuth } from "@/_lib/google";

export async function GET(request: Request, props: { params: Promise<{ template: string }> }) {
  const params = await props.params;
  const auth = await glAuth();
  const sheets = google.sheets({ version: "v4", auth });

  // GET
  const data = await sheets.spreadsheets.values.get({
    spreadsheetId: params.template,
    range: "Sheet1",
  });

  return Response.json({ data: data.data.values });
}
