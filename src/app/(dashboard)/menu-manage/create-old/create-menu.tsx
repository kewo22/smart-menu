"use client";

import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { Loader2 } from "lucide-react";

import { Fetcher } from "@/_lib/utils";
import { Button } from "@/components/ui/button";

export default function CreateMenuBtn() {
    const [shouldFetch, setShouldFetch] = useState(false);
    const idRef = useRef('')
    const dataRef = useRef(null)
    // const [data, setData] = useState(null);

    const { data: _data, error, isLoading } = useSWR(shouldFetch ? `/api/gl-template/template/${idRef.current}` : null, Fetcher, {
        errorRetryCount: 0,
        // onSuccess: () => {
        //     dataRef.current = null;
        // }
    });

    // dataRef.current = _data || null;

    // useEffect(() => {
    //     setData(_data)
    // }, [_data])

    if (error) {
        console.log("error", JSON.parse(JSON.stringify(error)))
        alert('error')
        setShouldFetch(false);
    }

    if (dataRef.current) {
        console.log('1', dataRef.current)
        alert('success')
        dataRef.current = null;
        setShouldFetch(false);
    }

    const onCreateMenu = async () => {
        idRef.current = '1UsbfZvk-OiaEVOq0eDn8BC9a7_wMZkEai4zMJ1sKmcg'
        setShouldFetch(true);
    }

    if (isLoading) {
        return (
            <Button type="submit" disabled={isLoading}>
                <Loader2 className="h-4 w-4 animate-spin" />
            </Button>
        )
    }

    return (
        <Button variant="outline" size="sm" className="text-xs" onClick={onCreateMenu}>Create</Button>
    );
}
































// {
//     "info": {
//         "error": {
//             "config": {
//                 "method": "POST",
//                 "url": "https://www.googleapis.com/oauth2/v4/token",
//                 "data": {
//                     "grant_type": "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>.",
//                     "assertion": "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>."
//                 },
//                 "headers": {
//                     "Content-Type": "application/x-www-form-urlencoded",
//                     "User-Agent": "google-api-nodejs-client/9.6.0",
//                     "x-goog-api-client": "gl-node/20.14.0",
//                     "Accept": "application/json"
//                 },
//                 "responseType": "json",
//                 "body": "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>."
//             },
//             "response": {
//                 "config": {
//                     "method": "POST",
//                     "url": "https://www.googleapis.com/oauth2/v4/token",
//                     "data": {
//                         "grant_type": "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>.",
//                         "assertion": "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>."
//                     },
//                     "headers": {
//                         "Content-Type": "application/x-www-form-urlencoded",
//                         "User-Agent": "google-api-nodejs-client/9.6.0",
//                         "x-goog-api-client": "gl-node/20.14.0",
//                         "Accept": "application/json"
//                     },
//                     "responseType": "json",
//                     "body": "<<REDACTED> - See `errorRedactor` option in `gaxios` for configuration>."
//                 },
//                 "data": {
//                     "error": "invalid_grant",
//                     "error_description": "Invalid grant: account not found"
//                 },
//                 "headers": {
//                     "alt-svc": "h3=\":443\"; ma=2592000,h3-29=\":443\"; ma=2592000",
//                     "cache-control": "private",
//                     "content-encoding": "gzip",
//                     "content-type": "application/json; charset=UTF-8",
//                     "date": "Thu, 22 Aug 2024 16:08:09 GMT",
//                     "server": "scaffolding on HTTPServer2",
//                     "transfer-encoding": "chunked",
//                     "vary": "Origin, X-Origin, Referer",
//                     "x-content-type-options": "nosniff",
//                     "x-frame-options": "SAMEORIGIN",
//                     "x-xss-protection": "0"
//                 },
//                 "status": 400,
//                 "statusText": "Bad Request",
//                 "request": {
//                     "responseURL": "https://www.googleapis.com/oauth2/v4/token"
//                 }
//             },
//             "status": 400
//         }
//     },
//     "status": 400
// }

















// {
//     "data": {
//         "config": {
//             "url": "https://www.googleapis.com/drive/v3/files/1We8hpf0EQLojZbim9mHZpsAOuixvdjrIiulfN44CWrk/permissions",
//             "method": "POST",
//             "apiVersion": "",
//             "userAgentDirectives": [
//                 {
//                     "product": "google-api-nodejs-client",
//                     "version": "7.0.1",
//                     "comment": "gzip"
//                 }
//             ],
//             "data": {
//                 "emailAddress": "agalya177@gmail.com",
//                 "type": "user",
//                 "role": "writer"
//             },
//             "headers": {
//                 "x-goog-api-client": "gdcl/7.0.1 gl-node/20.14.0",
//                 "Accept-Encoding": "gzip",
//                 "User-Agent": "google-api-nodejs-client/7.0.1 (gzip)",
//                 "Authorization": "Bearer ya29.c.c0ASRK0GY5OhTW8H8MA3RQngu-qPStza7PfBnJ6WTLEF6nxAOhAhl7YnIpcqibLpwiOzotYZH8eQrHuztxZ9CgTHhmXMVBUYwnnGEDMnrfp8yvMZ8CQSpr5OpCgXRSb3rACgkBc2BZcJWPrrJvb3lldW8tNCSemLjjA2s7JpLZC7CiKssQm9HV37vVSzB7A9bTeLd_o_z8RNoZMkEAMh6vXmJBtqMpeg3v_8HAeibC2QD0sydP28CLFkGEKTJto9kJ3l2otCN6jMHInbNTf9qShsIJSKmPkyME4GkOEjfcPuA1qjnmFRCdAcuYXI5z1qk9ddOI_f9b6LSu7ZYg05mWZoYeKw3G9yomqsHrB-XiU62sSUJ-kUcOUB34jG7KEx3AqAH395D0U5kRZa-SliI1goIztZihIJ6pVh3br-gBcOyt7BnX684m88Zu6_S2Z1a4Xe00p8rRrwcrSqngq9RJkvcufdvBfSgMdyjfZcOUcS5tt9JVz4mQcttQ54vf2b1ItgJsiiYwX_cQ49i2v1mYRVi5-3a_dl0ZR8ygsvmsk104RFWq58Zuk9BmiItJ-zzO52xBlSt2_cqF8JVZmi0qo1wmOXgyY_xmfoSkcZ8O70Q9MM5vstmlgyac1BwWYJQfkZaj53gjn-6R03IYXf9b2m6XWobQxFavvWdmOty00Urczpb5xoYekW1Yue0shq68tcYiQ7poY46_vmpjllUfMSq9U6mfUSms_Fyo2pQ8alSbZOgInwthdFUI1jWXibJJghk0SRtQwIpq5QpVw4arbnzthbr-_jjJmzyXb51Qh3je8pdrMkv_7OO0vb2hZxVUhnYQwQ9Jmz4UbzBrQ8ofqZz4Zqltb9rpspyykM3glpshWcXJXQx7V4mevqRyOjiwVx_eqatfl99ZJoBjpXz8tye1Si4X_j5vk2zOlzj3cVoRjkb_x5xfaV_u47XgtQ9xZrSS3-hct7wd_Obep3jYeizX9txe4BhI2my-fprlxbreXB8j1ptBnbi",
//                 "Content-Type": "application/json"
//             },
//             "params": {},
//             "retry": true,
//             "body": "{\"emailAddress\":\"agalya177@gmail.com\",\"type\":\"user\",\"role\":\"writer\"}",
//             "responseType": "unknown"
//         },
//         "data": {
//             "kind": "drive#permission",
//             "id": "08332768991911929402",
//             "type": "user",
//             "role": "writer"
//         },
//         "headers": {
//             "alt-svc": "h3=\":443\"; ma=2592000,h3-29=\":443\"; ma=2592000",
//             "cache-control": "no-cache, no-store, max-age=0, must-revalidate",
//             "content-encoding": "gzip",
//             "content-type": "application/json; charset=UTF-8",
//             "date": "Thu, 22 Aug 2024 16:26:56 GMT",
//             "expires": "Mon, 01 Jan 1990 00:00:00 GMT",
//             "pragma": "no-cache",
//             "server": "ESF",
//             "transfer-encoding": "chunked",
//             "vary": "Origin, X-Origin",
//             "x-content-type-options": "nosniff",
//             "x-frame-options": "SAMEORIGIN",
//             "x-xss-protection": "0"
//         },
//         "status": 200,
//         "statusText": "OK",
//         "request": {
//             "responseURL": "https://www.googleapis.com/drive/v3/files/1We8hpf0EQLojZbim9mHZpsAOuixvdjrIiulfN44CWrk/permissions"
//         }
//     }
// }