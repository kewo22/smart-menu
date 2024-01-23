"use client";
import React, { useRef } from "react";

import type { Restaurant } from "@prisma/client";

import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
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

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DeleteRestaurant } from "@/app/actions/restaurant-actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/_lib/utils";

type RestaurantsProps = {
  data: any;
  isLoading: boolean;
  onEditRow: (row: Restaurant) => void;
  onDeleteSuccess: (row: Restaurant) => void;
};

export default function Restaurants(props: RestaurantsProps) {
  const { data, isLoading, onEditRow, onDeleteSuccess } = props;

  const { toast } = useToast();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [deleteConfirmationDialogIsOpen, setDeleteConfirmationDialogIsOpen] =
    React.useState(false);

  const restaurantToDeleteRef = useRef<Restaurant | null>(null);

  const columns: ColumnDef<Restaurant>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="capitalize w-28">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: ({ row }) => (
        <div className="capitalize w-64">{row.getValue("address")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="w-13 flex flex-row justify-end">
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={() =>
                (table?.options?.meta as any).handleEditRow(row.original)
              }
            >
              <span className="sr-only">Edit Restaurant</span>
              <Pencil1Icon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={() =>
                (table?.options?.meta as any).handleDeleteRow(row.original)
              }
            >
              <span className="sr-only">Delete Restaurant</span>
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable<Restaurant>({
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
      handleEditRow: (row: Restaurant) => handleEditRow(row),
      handleDeleteRow: (row: Restaurant) => handleDeleteRow(row),
    },
  });

  const handleEditRow = (row: Restaurant) => {
    onEditRow(row);
  };

  const handleDeleteRow = async (row: Restaurant) => {
    restaurantToDeleteRef.current = row;
    setDeleteConfirmationDialogIsOpen(true);
  };

  const onDeleteConfirm = async () => {
    if (restaurantToDeleteRef && restaurantToDeleteRef.current) {
      const res = await DeleteRestaurant(restaurantToDeleteRef.current.id);
      if (res.error) {
        toast({
          className: cn(
            "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
          ),
          title: "Error from server",
          description: res.error,
          variant: "destructive",
        });
      } else {
        onDeleteSuccess(res.restaurant!);
        setDeleteConfirmationDialogIsOpen(false);
        toast({
          className: cn(
            "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4 bg-green-500 text-white"
          ),
          title: "Success",
          description: "Restaurant deleted",
          variant: "default",
        });
      }
    }
  };

  return (
    <div className="w-full">
      <Dialog open={deleteConfirmationDialogIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete restaurant ?</DialogTitle>
            <DialogDescription>
              This will remove all associated menus.
            </DialogDescription>
          </DialogHeader>
          <div className="mb-5">
            Are you sure you want to delete
            <span className="font-bold text-destructive">
              &nbsp;{restaurantToDeleteRef?.current?.name}&nbsp;
            </span>
            ?
          </div>
          <DialogFooter>
            <Button
              type="button"
              onClick={() => {
                setDeleteConfirmationDialogIsOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={onDeleteConfirm}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isLoading && "Loading"}
      {!isLoading && (
        <>
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
                      No Restaurants Added.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
}
