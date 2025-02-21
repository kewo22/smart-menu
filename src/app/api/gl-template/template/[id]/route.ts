import { authOptions } from "@/_lib/auth-options";
import { getServerSession } from "next-auth";
import { google, sheets_v4 } from "googleapis";
import { glAuth } from "@/_lib/google";

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const auth = await glAuth();
    const sheets = google.sheets({ version: "v4", auth });
    const drive = google.drive({ version: "v3", auth });
    const session = await getServerSession(authOptions);

    // GET TemplateSheet
    const templateSheetData = await sheets.spreadsheets.values.get({
      spreadsheetId: params.id,
      range: "Sheet1",
    });

    // create sheet for user
    const createdSheet = await sheets.spreadsheets.create({
      requestBody: {
        properties: {
          title: `User-ID`,
        },
      },
    });

    await sheets.spreadsheets.values.append({
      spreadsheetId: createdSheet.data.spreadsheetId!,
      range: "sheet1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: templateSheetData.data.values,
      },
    });

    // transfer ownership not working, check later
    // https://issuetracker.google.com/issues/228791253
    const res = await drive.permissions.create({
      fileId: createdSheet.data.spreadsheetId!,
      requestBody: {
        emailAddress: "kewinf271@gmail.com",
        type: "user",
        role: "writer",
      },
    });

    return Response.json({ data: res }, { status: res.status });
  } catch (error: any) {
    return Response.json({ error }, { status: error.status });
  }
}
