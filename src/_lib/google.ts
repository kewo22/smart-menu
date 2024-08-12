import { Auth, google, sheets_v4 } from "googleapis";

export const glAuth = async () => {
  const glAuth = await google.auth.getClient({
    projectId: "iconic-elevator-412810",
    credentials: {
      type: "service_account",
      project_id: "iconic-elevator-412810",
      private_key_id: "ea01117a0cf2d632c13228641659beed70107ac6",
      private_key:
        "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDfcKn5AtDDcO3i\ntEI/tMcJPxtmUvKAZv/RyVr7bEr2ehBsmDleZD/olhkzd855E+NwB0CwUzPEWh0B\neoV+g9lXis5T4FJBmJCl2UgS0LGVGEC1GPbv5ZA95whtegD6+5pmbZiMhkS3qRHd\nhplJJql3AnHhNiI55rX4i2fUEsMfZ0GPdzyVDuWg+rz/wMpt/2amtXi3MnmdU3h9\nORuCilqdzfvPJCgwXRan43MBw6p2o7bD5lP+coyOhoRWFpimCgSlAn3PBhIIrYIj\ngIGJF9Icnz/kxN4RthrZNWQXE4CrBMldd8Z1QQLhpRcjMgnJFOY5c8KMjKAImG9i\nDH8mYCo9AgMBAAECggEAKcBNooAKLlrtuIziTDEld+7Y2dfqBGA6sSKk45Iqt7+7\nTe9r2N12q6lQcDOU2z8CIq7YQZpqc+g6v0n7o9ZTSG5he37RH/y4GqVtOEbSx/9O\nKAjQK6eDum1vP7WqdTuKcFVOSgPU11S6R+Ccx/R3egt06BZLcvJPUnAKKLCQ0U8K\ndjfvhXgOYIEZwqI1RtKlIM5Q3UqgH++MluDTMtUFPC3UVvbKrH5X+FssgtjjM6xX\nAa8c+zQB/arq9B4MBHsVLS50LYbV5L1gxVRy76pEg2/tRT6ZzWn7EFr8687h0GHj\nWW2IsmNiFPwg7MSs0uf0Uo3yosl/+v7NwketuG3EqQKBgQD/vPfakWRV/fVAriw/\nUZaBEaTxnpdiPCaOXt2uiWF355DSAmAZOnOVh9W6tIlLkQEu63hUX9oqEb38SGvJ\nmC7Y3gaTMWSM0I3Q/a+omC1+JVcP7xqPyuwcSOMrzAP5ZwiT9QgQg4nnfKuam2Wq\nXGXwNQ66EkV/HWKF9WzozGLSnwKBgQDfqzrne6ByRlctDaPuYxyDAb0//HqIq/rG\nHJJR7f3yHVGuUdJy0RkzDVc+rVxcYHBttsU9ve6HfuWIyMkzmFkmgPXzetL+RE48\ne/W3yKCn4kjMuJWL3JjmZAszV9ESodqZbkVwSoRh1fs+jMgzSEr3+LlhRAxJVppd\nTDuULNiRowKBgBfnpAtsN8LKAFjRbxVkHPtnmNF1D5WBJeF9AJ/F+7RnkuPukOkK\ny68YiWPwaD0GCuRF4nOQmiYAjo+8fUbU0Nw4tMihf1KiU/9LF1ZdEzONbfvxT7xN\nLZDfR0zavyxa8zRRXTWd9hALWUcUa4ZnKKgxbXT7LD/bkVAQRuPj5wDlAoGBALu8\nHVTuj11bbRCDwnT0+5l6fD6YzMCqmXJvyOC7wcrWkRif1ORKXbxcFj6lhECFMdjk\n7+lC4lMYT9DftwF3flyzIb2b+j0xV/mskjIQU8iWRkSPKfaa0juO/Ve6/eGFuNXP\nmLkH0tXLpXZ69A8XPtWkDvV1CFsGNcrZkahte9nBAoGBAMx4rdGLknWZqHQNz/CR\nx2KBV2AqaTiC/LWoaQksC3g92sSUJrVEHthUVWaP1VQ/cTeqsCeM8y12juIeDCp7\nVoRs7/AppbVPJIAKr5/zHQHZWeamcLpGFGrx0/Qf4QCIO6UtBZGH4nmOasNKarDT\nTgwhkpbxIRjEn3DGFID+8HTD\n-----END PRIVATE KEY-----\n",
      client_email:
        "smart-menu-ser-acc@iconic-elevator-412810.iam.gserviceaccount.com",
      //   client_id: "108903925330752175034",
      //   auth_uri: "https://accounts.google.com/o/oauth2/auth",
      //   token_uri: "https://oauth2.googleapis.com/token",
      //   auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      //   client_x509_cert_url:
      // "https://www.googleapis.com/robot/v1/metadata/x509/smart-menu-ser-acc%40iconic-elevator-412810.iam.gserviceaccount.com",
      universe_domain: "googleapis.com",
    },
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/drive",
      "https://www.googleapis.com/auth/drive.file",
      "https://www.googleapis.com/auth/drive.readonly",
      "https://www.googleapis.com/auth/spreadsheets.readonly",
    ],
  });
  return glAuth;
};

export const createSheet = async (sheets: sheets_v4.Sheets, title: string) => {
  const res = await sheets.spreadsheets.create({
    requestBody: {
      properties: {
        title,
      },
      // dataSources: [
      //     {
      //         sheetId: "Sheet1"
      //     }
      // ]
    },
  });

  return res;
};
