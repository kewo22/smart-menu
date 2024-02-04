'use server';

import { google } from "googleapis";
import { getServerSession } from "next-auth";

import { authOptions } from "@/_lib/auth-options";
import { createSheet, glAuth } from "@/_lib/google";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { db } from "@/_lib/db";

export async function connectToGl() {
    const session = await getServerSession(authOptions);
    // console.log((session?.user as any).restaurant)
    const auth = await glAuth()

    const sheets = google.sheets({ version: "v4", auth });
    const drive = google.drive({ version: 'v3', auth });

    const sheet = await createSheet(sheets, 'title4');

    await sheets.spreadsheets.values.append({
        spreadsheetId: sheet.data.spreadsheetId!,
        range: "sheet1",
        valueInputOption: "USER_ENTERED",
        requestBody: {
            values: [
                [
                    "Starters"
                ],
                [
                    "Item", "Price"
                ],
                [
                    "Item 1", "100"
                ],
                [
                    "Item 2", "100"
                ],
                [
                    "Item 3", "100"
                ],
                [
                    "Mains"
                ],
                [
                    "Item", "Price"
                ],
                [
                    "Item 1", "100"
                ],
                [
                    "Item 2", "100"
                ],
                [
                    "Item 3", "100"
                ],
                [
                    "Desserts"
                ],
                [
                    "Item", "Price"
                ],
                [
                    "Item 1", "100"
                ],
                [
                    "Item 2", "100"
                ],
                [
                    "Item 3", "100"
                ],
            ]
        }
    })

    // delete the sheet if permission is not granted
    try {
        const res = await drive.permissions.create({
            fileId: sheet.data.spreadsheetId!,
            requestBody: {
                emailAddress: session?.user?.email,
                type: "user",
                role: "writer",
            },
        })
        try {
            const menuObj = {
                type: "",
                userId: (session?.user as any).id,
                isPublished: false,
                restaurantId: (session?.user as any).restaurant[0].id,
                sheetId: sheet.data.spreadsheetId!,
                sheetUrl: sheet.data.spreadsheetUrl!,
            }
            const restaurant = await db.menu.create({
                data: menuObj
            })
            console.log("🚀 ~ CreateRestaurant ~ restaurant:", restaurant)
            return { message: `Restaurant Added`, restaurant };
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                // logger.error(JSON.stringify(e));
                // if (e.code === 'P2002') {
                //     console.log("🚀 ~ createUser ~ e:", e) 
                //     console.log(
                //         'There is a unique constraint violation, a new user cannot be created with this email'
                //     )
                // }
            }
            // throw e
            return { error: "Failed to create restaurant" };
        }

    } catch (error) {
        console.log("🚀 ~ connectToGl ~ error:", error)
    }

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

