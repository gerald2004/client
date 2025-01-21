import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import useAxiosPrivate from "@/MiddleWares/Hooks/useAxiosPrivate";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import jsPDF from "jspdf";
import "jspdf-autotable";
import { ChevronDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import AlertModal from "@/components/AlertModal";

export function Individuals() {
  const navigate = useNavigate();
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 7 });
  const axiosPrivate = useAxiosPrivate();
  const [showDialog, setShowDialog] = useState(false);

  const { data = [], isLoading, refetch, isRefetching, isError } = useQuery({
    queryKey: [
      "individuals-data",
      pagination.pageIndex,
      pagination.pageSize,
      globalFilter,
      sorting,
    ],
    queryFn: async () => {
      const fetchURL = `/serverside/clients/individual`;
      try {
        const response = await axiosPrivate.get(fetchURL, {
          params: {
            start: pagination.pageIndex * pagination.pageSize,
            size: pagination.pageSize,
            globalFilter: globalFilter || "",
            sorting: JSON.stringify(sorting || []),
          },
        });
        return response.data.data ?? [];
      } catch (error) {
        if (error?.response?.status === 401) {
           navigate("/", { state: { from: location }, replace: true });
        }
        return error;
      }
    },
    keepPreviousData: true,
  });

  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
    },
    {
      id: "client_account_number",
      header: "Account Number",
      accessorFn: (row) => row.client_account_number,
      cell: ({ row }) => (
        <Link
          to={`/clients/individual/${row.original.client_id}`}
          className="capitalize hover:uppercase"
        >
          {row.original.client_account_number}
        </Link>
      ),
    },
    {
      id: "client_lastname",
      header: "Last Name",
      accessorFn: (row) => row.client_lastname,
      cell: ({ row }) => (
        <Link
          to={`/clients/individual/${row.original.client_id}`}
          className="capitalize hover:uppercase"
        >
          {row.original.client_lastname}
        </Link>
      ),
    },
    {
      id: "client_firstname",
      header: "First Name",
      accessorFn: (row) => row.client_firstname,
      cell: ({ row }) => (
        <Link
          to={`/clients/individual/${row.original.client_id}`}
          className="capitalize hover:uppercase"
        >
          {row.original.client_firstname}
        </Link>
      ),
    },
    {
      accessorKey: "client_contact",
      header: "Contact",
    },
    {
      id: "client_gender",
      accessorFn: (row) => row.client_gender,
      cell: ({ row }) => (
        <p className="capitalize">{row.original.client_gender}</p>
      ),
      header: "Gender",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              ...
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(
                  row.original.client_account_number
                )
              }
            >
              Copy Client Account
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to={`/clients/individual/${row.original.client_id}`}>
                View Cient Account Summary
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const table = useReactTable({
    data: data?.data || [],
    rowCount: data?.meta?.totalRowCount,
    columns,
    manualPagination: true,
    manualSorting: true,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      globalFilter,
      pagination,
    },
  });

  const exportToCSV = () => {
    const csvData = data?.data.map((row) => ({
      AccountNumber: row.client_account_number,
      LastName: row.client_lastname,
      FirstName: row.client_firstname,
      Contact: row.client_contact,
      Gender: row.client_gender,
    }));

    const csv = [
      ["Account Number","Last Name", "First Name", "Contact", "Gender"],
      ...csvData.map((row) => Object.values(row)),
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `individuals-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["Account Number","Last Name", "First Name", "Contact", "Gender"]],
      body: data?.data.map((row) => [
        row.client_account_number,
        row.client_lastname,
        row.client_firstname,
        row.client_contact,
        row.client_gender,
      ]),
    });
    doc.save(`individuals-${Date.now()}.pdf`);
  };

  const renderSkeletonRows = () => {
    return [...Array(pagination.pageSize)].map((_, index) => (
      <TableRow key={`skeleton-${index}`}>
        {columns.map((column, colIndex) => (
          <TableCell key={`skeleton-cell-${colIndex}`}>
            <Skeleton className="col-span-4 h-[20px]  rounded-xl" />
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  const handlePageSizeChange = (size) => {
    setPagination((prev) => ({
      ...prev,
      pageSize: size,
      pageIndex: 0,
    }));
  };

  return (
    <div className="w-full">
      <div className="flex items-center py-4 space-x-4">
        <Input
          placeholder="Search clients..."
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />

        <Button
          variant="outline"
          size="sm"
          onClick={() => exportToCSV(data?.data)}
        >
          Export to CSV
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => exportToPDF(data?.data)}
        >
          Export to PDF
        </Button>
        <Button variant="outline" size="sm" onClick={() => window.print()}>
          Print
        </Button>
        <Button variant="outline" size="sm" onClick={refetch}>
          {isRefetching ? "Refreshing" : "Refresh"}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .filter((column) => column.id !== "select")
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.columnDef.header}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Show <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {[5, 10, 20, 50, 100].map((size) => (
              <DropdownMenuCheckboxItem
                key={size}
                className="capitalize"
                checked={pagination.pageSize === size}
                onCheckedChange={(checked) => {
                  if (checked) handlePageSizeChange(size);
                }}
              >
                {size}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Bulk Actions <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {[
              { title: "Activate Clients", action: "active_clients" },
              { title: "De Activate Clients", action: "deactive_client" },
              { title: "Send Bulk SMS", action: "active_clients" },
              { title: "Delete", action: "delete_clients" },
            ].map((action) => (
              <DropdownMenuCheckboxItem
                key={action.title}
                className="capitalize"
                onClick={() => setShowDialog(true)}
              >
                {action.title}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading || isRefetching ? (
              renderSkeletonRows()
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  Error Loading Data
                </TableCell>
              </TableRow>
            ) : data?.data?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
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
                <TableCell colSpan={columns.length} className="text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setPagination((prev) => ({
              ...prev,
              pageIndex: Math.max(prev.pageIndex - 1, 0),
            }))
          }
          disabled={pagination.pageIndex === 0 || isLoading}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setPagination((prev) => ({
              ...prev,
              pageIndex: prev.pageIndex + 1,
            }))
          }
          disabled={
            (data?.meta?.totalRowCount || 0) <=
              (pagination.pageIndex + 1) * pagination.pageSize || isLoading
          }
        >
          Next
        </Button>
      </div>
      {showDialog && (
        <AlertModal
          showDialog={showDialog}
          setShowDialog={setShowDialog}
          title="Alert"
          message="This action is not permitted."
          method={() => setShowDialog(false)}
          // buttonName="Close"
          // modalSize="325px"
        />
      )}
    </div>
  );
}
