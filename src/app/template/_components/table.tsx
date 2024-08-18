import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Template } from "@prisma/client";
import { ExternalLinkIcon, ImageIcon } from "@radix-ui/react-icons";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import React from "react";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type TemplateProps = {
    data: Template[];
    isLoading: boolean;
};

export default function TemplateList(props: TemplateProps) {
    const { data, isLoading } = props;

    const columns: ColumnDef<Template>[] = [
        {
            accessorKey: "previewImageUrl",
            header: "Preview Image",
            cell: ({ row }) => (
                <Popover>
                    <PopoverTrigger asChild>
                        <Image
                            src={row.getValue("previewImageUrl")}
                            alt={`previewImageUrl-${row.original.id}`}
                            priority
                            height={80}
                            width={50}
                            className="rounded-md cursor-pointer"
                        />
                    </PopoverTrigger>
                    <PopoverContent className="w-auto">
                        <Image
                            src={row.getValue("previewImageUrl")}
                            alt={`previewImageUrl-${row.original.id}`}
                            priority
                            height={300}
                            width={150}
                            className="rounded-md cursor-pointer"
                        />
                    </PopoverContent>
                </Popover>
            ),
        },
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "description",
            header: "Description",
            cell: ({ row }) => (
                <div className="capitalize max-w-56 truncate">{row.getValue("description")}</div>
            ),
        },
        {
            accessorKey: "spreadsheetId",
            header: "Spreadsheet Id",
        },
        {
            accessorKey: "spreadsheetUrl",
            header: "Spreadsheet Url",
            cell: ({ row }) => (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" onClick={() =>
                                (table?.options?.meta as any).onOpenSheetUrl(row.original)
                            }><ExternalLinkIcon className="size-4" /></Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <span className="text-xs">{row.getValue("spreadsheetUrl")}</span>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )
        },
    ];

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable<Template>({
        data: data || [],
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        // getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        meta: {
            onOpenSheetUrl: (row: Template) => onOpenSheetUrl(row),
        },
    });

    const onOpenSheetUrl = (row: Template) => {
        window.open(row.spreadsheetUrl, '_blank')!.focus();
    }

    if (isLoading) {
        return <>Loading</>
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                No Templates Added.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table >
        </div >
    );
}