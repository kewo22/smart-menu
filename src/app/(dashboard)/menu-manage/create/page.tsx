"use client";
import { Fetcher } from "@/_lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Template } from "@prisma/client";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

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

  console.log(templateData)

  return (
    <div className="h-full overflow-hidden flex flex-col gap-5">
      <h2 className="flex items-center text-sm">
        <span>Create Menu</span>
        <ChevronRightIcon className="h-3 2-3" />
        <span>Choose Template</span>
      </h2>
      <div className="h-full overflow-hidden flex flex-row gap-5">
        <div className="grid grid-cols-2 gap-5 h-full overflow-auto flex-[0_0_60%] pr-5">
          {
            isLoading && <>Loading</>
          }
          {
            templateData.map(template => (
              <Card key={template.id}>
                <CardHeader>
                  <CardTitle className="text-base">{template.name}</CardTitle>
                  <CardDescription className="text-sm max-w-fit truncate">{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Template IMG here</p>
                </CardContent>
                <CardFooter className="w-full flex justify-end gap-2">
                  <Button variant="outline" size="sm" className="text-xs">Preview</Button>
                  <Button variant="outline" size="sm" className="text-xs">Create</Button>
                </CardFooter>
              </Card>
            ))
          }
        </div>

        <div className="box clipped flex-grow h-full">
          MENU HERE
          {/* <Image src='/sample-menu-card.webp' alt="" priority height={100} width={100} className="h-full w-full" /> */}
        </div>
      </div>
    </div>
  );
}
