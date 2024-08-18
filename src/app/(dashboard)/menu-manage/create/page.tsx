"use client";
import { Fetcher } from "@/_lib/utils";
import { createMenu } from "@/app/actions/menu-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Template } from "@prisma/client";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import CreateMenuBtn from "./create-menu";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

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

  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(
    null
  );
  const [previewSheetIsOpen, setPreviewSheetIsOpen] = useState(false)

  useEffect(() => {
    if (data) setTemplateData(data);
  }, [data]);


  const onCreateMenu = async () => {
    // const x = await createMenu();
    // console.log(x)
  }

  const onPreviewClick = (template: Template) => {
    setPreviewSheetIsOpen(true);
    setPreviewTemplate(template);
  }

  return (
    <div className="h-full overflow-hidden flex flex-col gap-5">

      <Sheet open={previewSheetIsOpen} onOpenChange={setPreviewSheetIsOpen}>
        <SheetContent className="flex flex-col">
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
          <div className="flex-grow">
            {
              previewTemplate && <Image
                src={previewTemplate.previewImageUrl}
                alt={`previewImage-${previewTemplate.id}`}
                priority
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }} // optional check this: low priority
              />
            }
          </div>
          <SheetFooter className="">
            <SheetClose asChild>
              {/* <Button type="submit">Save changes</Button> */}
              <CreateMenuBtn />
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>


      <h2 className="flex items-center text-sm">
        <span>Create Menu</span>
        <ChevronRightIcon className="h-3 2-3" />
        <span>Choose Template</span>
      </h2>
      <div className="h-full overflow-hidden flex flex-row gap-5">
        <div className="grid grid-cols-5 gap-5 h-full overflow-auto flex-grow pr-5">
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
                  <Image
                    src={template.previewImageUrl}
                    alt={`previewImage-${template.id}`}
                    priority
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }} // optional check this: low priority
                    className="rounded-md cursor-pointer"
                  />
                </CardContent>
                <CardFooter className="w-full flex justify-end gap-2">
                  <Button variant="outline" size="sm" className="text-xs" onClick={() => { onPreviewClick(template) }}>Preview</Button>
                  {/* <Button variant="outline" size="sm" className="text-xs" onClick={onCreateMenu}>Create</Button> */}
                  <CreateMenuBtn />
                </CardFooter>
              </Card>
            ))
          }
        </div>

        {/* <div className="flex-[0_0_0%] h-full bg-red-50">
          MENU HERE
          <Image src='/sample-menu-card.webp' alt="" priority height={100} width={100} className="h-full w-full" />
        </div> */}
      </div>
    </div>
  );
}
