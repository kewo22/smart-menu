"use client";

import { Fetcher } from "@/_lib/utils";
import { createMenu } from "@/app/actions/menu-actions";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";

export default function CreateMenuBtn() {
    const [shouldFetch, setShouldFetch] = useState(false);
    const idRef = useRef('')

    const { data } = useSWR(shouldFetch ? `/api/gl-template/${idRef.current}` : null, Fetcher);
    // template ? `/api/menu/template/${template.sheetId}` : null,

    useEffect(() => {
        console.log(data)
    }, [data])

    const onCreateMenu = async () => {
        idRef.current = '1UsbfZvk-OiaEVOq0eDn8BC9a7_wMZkEai4zMJ1sKmcg'
        setShouldFetch(true);
    }

    return (
        <Button variant="outline" size="sm" className="text-xs" onClick={onCreateMenu}>Create</Button>
    );
}
