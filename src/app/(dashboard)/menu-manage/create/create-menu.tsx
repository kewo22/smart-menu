"use client";

import { Fetcher } from "@/_lib/utils";
import { createMenu } from "@/app/actions/menu-actions";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";

export default function CreateMenuBtn() {
    const [shouldFetch, setShouldFetch] = useState(false);
    const idRef = useRef('')

    const { data, error, isLoading } = useSWR(shouldFetch ? `/api/gl-template/template/${idRef.current}` : null, Fetcher, {
        errorRetryCount: 0,
    });

    useEffect(() => {
        console.log("data", data, Boolean(data))
        // console.log("error", JSON.parse(JSON.stringify(error)))
        console.log(isLoading)
    }, [data, error, isLoading])

    if (error) {
        console.log("error", JSON.parse(JSON.stringify(error)))
        alert('error')
        setShouldFetch(false);
    }

    if (data) {
        console.log('1', data)
        alert('success')
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
