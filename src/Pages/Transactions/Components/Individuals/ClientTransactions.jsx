import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
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
  // DropdownMenuItem,
  // DropdownMenuLabel,
  // DropdownMenuSeparator,
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
import  useAuth  from "@/MiddleWares/Hooks/useAuth";

export function ClientTransactions() {
  // const { client_id } = useParams();
  const { auth } = useAuth();
// console.log(auth);
const client_id = auth?.client?.client_id;
  const navigate = useNavigate();
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const axiosPrivate = useAxiosPrivate();
  const [showDialog, setShowDialog] = useState(false);

  const { data = {}, isLoading, refetch, isRefetching, isError } = useQuery({
    queryKey: [
      "client-transactions",
      client_id,
      pagination.pageIndex,
      pagination.pageSize,
      globalFilter,
      sorting,
    ],
    queryFn: async () => {
      const fetchURL = `/accounting/individual/deposits/${client_id}`;
      try {
        const response = await axiosPrivate.get(fetchURL, {
          params: {
            start: pagination.pageIndex * pagination.pageSize,
            size: pagination.pageSize,
            globalFilter: globalFilter || "",
            sorting: JSON.stringify(sorting || []),
          },
        });
        return response.data ?? {};
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
      id: "amount",
      header: "Amount",
      accessorFn: (row) => row.amount,
    },
    {
      id: "code",
      header: "Code",
      accessorFn: (row) => row.code,
    },
    {
      id: "method",
      header: "Method",
      accessorFn: (row) => row.method,
    },
    {
      id: "status",
      header: "Status",
      accessorFn: (row) => row.status,
    },
    {
      id: "account",
      header: "Account",
      accessorFn: (row) => row.account,
    },
    {
      id: "account_name",
      header: "Account Name",
      accessorFn: (row) => row.account_name,
    },
    {
      id: "account_number",
      header: "Account Number",
      accessorFn: (row) => row.account_number,
    },
    {
      id: "timestamp",
      header: "Timestamp",
      accessorFn: (row) => row.timestamp,
    }
  ];

  const table = useReactTable({
    data: data?.data?.transactions || [],
    rowCount: data?.data?.rows_returned,
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
    const csvData = data?.data?.transactions.map((row) => ({
      Amount: row.amount,
      Code: row.code,
      Method: row.method,
      Status: row.status,
      Account: row.account,
      AccountName: row.account_name,
      AccountNumber: row.account_number,
      Timestamp: row.timestamp,
      
    }));

    const csv = [
      [
        "Amount",
        "Code",
        "Method",
        "Status",
        "Account",
        "AccountName",
        "AccountNumber",
        "Timestamp",
      ],
      ...csvData.map((row) => Object.values(row)),
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [
        [
          "Amount",
          "Code",
          "Method",
          "Status",
          "Account",
          "AccountName",
          "AccountNumber",
          "Timestamp",
        ],
      ],
      body: data?.data?.transactions.map((row) => [
        row.amount,
        row.code,
        row.method,
        row.status,
        row.account,
        row.account_name,
        row.account_number,
        row.timestamp,
      ]),
    });
    doc.save("transactions.pdf");
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
          placeholder="Search transactions..."
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />

        <Button
          variant="outline"
          size="sm"
          onClick={() => exportToCSV(data?.data?.transactions)}
        >
          Export to CSV
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => exportToPDF(data?.data?.transactions)}
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
            ) : data?.data?.transactions?.length ? (
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
            (data?.data?.rows_returned || 0) <=
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