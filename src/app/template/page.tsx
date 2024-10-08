"use client";

import useSWR from "swr";

import CreateTemplateForm, { TemplatePayload } from "./_components/form";
import Table from "./_components/table";
import { Fetcher } from "@/_lib/utils";
import { Template } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Page() {

    const { data, error, isLoading } = useSWR<Template[]>(
        "/api/menu-template",
        Fetcher,
        {
            revalidateOnFocus: false,
        }
    );

    const [templateData, setTemplateData] = useState<Template[]>(
        data || []
    );

    useEffect(() => {
        if (data) setTemplateData(data);
    }, [data]);

    const onRestaurantCreated = (template: Template) => {
        setTemplateData((templates: Template[]) => {
            const fullTemplates = [...templates];
            fullTemplates.unshift(template)
            return [...fullTemplates];
        });
    }

    return (
        <div className="min-h-screen w-full h-full flex flex-col items-start p-5 gap-5 overflow-hidden">
            <CreateTemplateForm onTemplateCreated={onRestaurantCreated} />
            <div className="flex-grow overflow-y-auto w-full">
                <Table data={templateData} isLoading={isLoading} />
            </div>
        </div>
    );
}
