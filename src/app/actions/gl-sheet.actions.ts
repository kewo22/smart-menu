'use server';

import { google } from "googleapis";
import { getServerSession } from "next-auth";

import { authOptions } from "@/_lib/auth-options";
import { createSheet, glAuth } from "@/_lib/google";

export async function connectToGl() {
    const session = await getServerSession(authOptions);

    const auth = await glAuth()

    const sheets = google.sheets({ version: "v4", auth });
    const drive = google.drive({ version: 'v3', auth });

    const sheet = await createSheet(sheets, 'title4');
    console.log("🚀 ~ connectToGl ~ res:", sheet)
    console.log("🚀 ~ connectToGl ~ res:", sheet.data.spreadsheetUrl)
    console.log(session?.user?.email)

    const res = await drive.permissions.create({
        fileId: sheet.data.spreadsheetId!,
        requestBody: {
            emailAddress: session?.user?.email,
            type: "user",
            role: "writer",
        },
    })
    console.log("🚀 ~ connectToGl ~ res:", res)

    // drive.permissions.create({
    //     fileId: sheet.data.spreadsheetId!,
    //     requestBody: {
    //         emailAddress: "kewinf271@gmail.com",
    //         type: "user",
    //         role: "writer",
    //     },
    //     fields: "id"
    // }, function (err: any, res: any) {
    //     if (err) {
    //         console.error('Error sharing the sheet:', err);
    //         return;
    //     }
    //     console.log('Sheet shared successfully:', res);
    // });



    // GET
    // const data = await sheets.spreadsheets.values.get({
    //     spreadsheetId: "1E02HuASgeNK4FMg-wCvzadotO_d85ggwfYotlhF9iSs",
    //     range: 'Sheet1',
    // });
    // return { data: data.data.values }

    // WRITE
    // await sheets.spreadsheets.values.append({
    //     auth: glAuth,
    //     spreadsheetId: "1E02HuASgeNK4FMg-wCvzadotO_d85ggwfYotlhF9iSs",
    //     range: "Sheet1",
    //     valueInputOption: "USER_ENTERED",
    //     requestBody: {
    //         values: [
    //             [
    //                 "row4 col1", "row4 col2", "row4 col3",
    //                 "row5 col1", "row5 col2", "row5 col3",
    //             ]
    //         ]
    //     }
    // })

}