"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"

import { DataTable } from "@/components/ui/dataTable/data-table"
import { DataTableColumnHeader } from "@/components/ui/dataTable/data-table-column-header"
import { DataTableRowActions } from "@/components/ui/dataTable/data-table-row-actions"
import { DataTableSkeleton } from "@/components/ui/dataTable/data-table-skeleton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Sample data types
export type AnalyticsData = {
  id: string
  patientName: string
  email: string
  status: "active" | "inactive" | "pending"
  lastVisit: string
  prescriptions: number
  totalSpent: number
  subscriptionType: "basic" | "premium" | "enterprise"
}

// Generate sample data
const generateSampleData = (): AnalyticsData[] => {
  const statuses: ("active" | "inactive" | "pending")[] = ["active", "inactive", "pending"]
  const subscriptionTypes: ("basic" | "premium" | "enterprise")[] = ["basic", "premium", "enterprise"]
  const names = ["John Doe", "Jane Smith", "Bob Johnson", "Alice Brown", "Charlie Wilson", "Diana Prince", "Edward Norton", "Fiona Apple", "George Lucas", "Helen Mirren"]
  
  return Array.from({ length: 50 }, (_, i) => ({
    id: `patient-${i + 1}`,
    patientName: names[i % names.length] + ` ${i + 1}`,
    email: `patient${i + 1}@healthcare.com`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    lastVisit: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
    prescriptions: Math.floor(Math.random() * 10),
    totalSpent: Math.floor(Math.random() * 5000) + 100,
    subscriptionType: subscriptionTypes[Math.floor(Math.random() * subscriptionTypes.length)],
  }))
}

// Column definitions
const columns: ColumnDef<AnalyticsData>[] = [
  {
    accessorKey: "patientName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Patient Name" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("patientName")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <div className="lowercase text-sm text-muted-foreground">
        {row.getValue("email")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge 
          variant={
            status === "active" ? "default" : 
            status === "inactive" ? "secondary" : "outline"
          }
        >
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "subscriptionType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Subscription" />
    ),
    cell: ({ row }) => {
      const type = row.getValue("subscriptionType") as string
      return (
        <Badge 
          variant={
            type === "enterprise" ? "default" : 
            type === "premium" ? "secondary" : "outline"
          }
        >
          {type.toUpperCase()}
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
    accessorKey: "totalSpent",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Spent" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalSpent"))
      return (
        <div className="font-medium">
          ${amount.toLocaleString()}
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableRowActions
        row={row.original}
        actions={[
          {
            label: "View details",
            onClick: (patient) => alert(`Viewing details for ${patient.patientName}`),
          },
          {
            label: "Edit patient",
            onClick: (patient) => alert(`Editing ${patient.patientName}`),
          },
          {
            label: "Send message",
            onClick: (patient) => alert(`Sending message to ${patient.patientName}`),
          },
          {
            label: "Delete patient",
            onClick: (patient) => alert(`Deleting ${patient.patientName}`),
            destructive: true,
            separator: true,
          },
        ]}
      />
    ),
  },
]

export default function AnalyticsDemoPage() {
  const [data, setData] = React.useState<AnalyticsData[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setData(generateSampleData())
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleRowClick = (row: AnalyticsData) => {
    console.log("Row clicked:", row)
    alert(`Clicked on ${row.patientName}`)
  }

  const handleExport = () => {
    alert("Export functionality would be implemented here")
  }

  const handleRefresh = () => {
    setLoading(true)
    setTimeout(() => {
      setData(generateSampleData())
      setLoading(false)
    }, 1000)
  }

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Healthcare analytics and patient management
          </p>
        </div>
        <DataTableSkeleton 
          columnCount={columns.length} 
          rowCount={10} 
          searchable={true} 
          pagination={true} 
        />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Healthcare analytics and patient management
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleRefresh}>
              Refresh
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <DataTable
          columns={columns}
          data={data}
          searchable={true}
          searchPlaceholder="Search patients by name or email..."
          searchKey="patientName"
          pagination={true}
          pageSize={10}
          selectable={false}
          onRowClick={handleRowClick}
          toolbarActions={
            <>
              <Button variant="outline" size="sm" onClick={handleExport}>
                Export CSV
              </Button>
              <Button variant="outline" size="sm">
                Filter
              </Button>
            </>
          }
        />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Total Patients</h3>
          <p className="text-2xl font-bold">{data.length}</p>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Active Patients</h3>
          <p className="text-2xl font-bold">
            {data.filter(p => p.status === "active").length}
          </p>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Total Revenue</h3>
          <p className="text-2xl font-bold">
            ${data.reduce((sum, p) => sum + p.totalSpent, 0).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  )
}