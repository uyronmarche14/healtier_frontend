"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"

import { DataTable } from "./data-table"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

// Example data type
export type Patient = {
  id: string
  name: string
  email: string
  status: "active" | "inactive" | "pending"
  lastVisit: string
  prescriptions: number
  avatar?: string
}

// Example columns
export const columns: ColumnDef<Patient>[] = [
  // Optional: Add checkbox selection (requires Checkbox component)
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={status === "active" ? "default" : status === "inactive" ? "secondary" : "outline"}>
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "lastVisit",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Visit" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("lastVisit"))
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: "prescriptions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Prescriptions" />
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("prescriptions")}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row.original}
        actions={[
          {
            label: "View details",
            onClick: (patient) => console.log("View", patient),
          },
          {
            label: "Edit",
            onClick: (patient) => console.log("Edit", patient),
          },
          {
            label: "Delete",
            onClick: (patient) => console.log("Delete", patient),
            destructive: true,
            separator: true,
          },
        ]}
      />
    ),
  },
]

// Example usage
export function DataTableExample() {
  const [data, setData] = React.useState<Patient[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      status: "active",
      lastVisit: "2024-01-15",
      prescriptions: 3,
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      status: "inactive",
      lastVisit: "2024-01-10",
      prescriptions: 1,
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob@example.com",
      status: "pending",
      lastVisit: "2024-01-20",
      prescriptions: 5,
    },
  ])

  const handleRowClick = (row: Patient) => {
    console.log("Row clicked:", row)
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={data}
        searchable={true}
        searchPlaceholder="Search patients..."
        searchKey="name"
        pagination={true}
        pageSize={10}
        selectable={true}
        onRowClick={handleRowClick}
        toolbarActions={
          <Button variant="outline" size="sm">
            Export
          </Button>
        }
      />
    </div>
  )
}