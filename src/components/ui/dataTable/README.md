# DataTable Components

A comprehensive, reusable, and optimized set of DataTable components built with `@tanstack/react-table` and shadcn/ui.

## Features

- ✅ **Sorting** - Click column headers to sort
- ✅ **Filtering** - Global search and column-specific filters
- ✅ **Pagination** - Configurable page sizes and navigation
- ✅ **Column Visibility** - Show/hide columns dynamically
- ✅ **Row Selection** - Checkbox selection with bulk actions
- ✅ **Row Actions** - Dropdown menu for row-specific actions
- ✅ **Loading States** - Skeleton loading component
- ✅ **Responsive Design** - Mobile-friendly layout
- ✅ **TypeScript** - Full type safety
- ✅ **Customizable** - Highly configurable and extensible

## Installation

The required dependencies should already be installed. If not:

```bash
npm install @tanstack/react-table @radix-ui/react-checkbox @radix-ui/react-icons
```

## Usage

### Basic Usage

```tsx
import { DataTable } from "@/components/ui/analytics/data-table"
import { ColumnDef } from "@tanstack/react-table"

// Define your data type
interface User {
  id: string
  name: string
  email: string
  role: string
}

// Define columns
const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
]

// Your data
const data: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "User" },
]

export function UsersTable() {
  return <DataTable columns={columns} data={data} />
}
```

### Advanced Usage with All Features

```tsx
import { DataTable } from "@/components/ui/analytics/data-table"
import { DataTableColumnHeader } from "@/components/ui/analytics/data-table-column-header"
import { DataTableRowActions } from "@/components/ui/analytics/data-table-row-actions"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

interface Patient {
  id: string
  name: string
  email: string
  status: "active" | "inactive"
  lastVisit: string
}

const columns: ColumnDef<Patient>[] = [
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
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={status === "active" ? "default" : "secondary"}>
          {status}
        </Badge>
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

export function PatientsTable() {
  const [data, setData] = React.useState<Patient[]>([/* your data */])

  return (
    <DataTable
      columns={columns}
      data={data}
      searchable={true}
      searchPlaceholder="Search patients..."
      searchKey="name"
      pagination={true}
      pageSize={10}
      selectable={true}
      onRowClick={(row) => console.log("Row clicked:", row)}
      toolbarActions={
        <Button variant="outline" size="sm">
          Export CSV
        </Button>
      }
    />
  )
}
```

### Using Individual Components

You can also use individual components for more control:

```tsx
import { useReactTable } from "@tanstack/react-table"
import { DataTableToolbar } from "@/components/ui/analytics/data-table-toolbar"
import { DataTablePagination } from "@/components/ui/analytics/data-table-pagination"
import { DataTableViewOptions } from "@/components/ui/analytics/data-table-view-options"

function CustomTable() {
  const table = useReactTable({
    data,
    columns,
    // ... table configuration
  })

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} searchable={true} />
      {/* Your custom table implementation */}
      <DataTablePagination table={table} />
    </div>
  )
}
```

### Loading State

```tsx
import { DataTableSkeleton } from "@/components/ui/analytics/data-table-skeleton"

function LoadingTable() {
  return (
    <DataTableSkeleton
      columnCount={5}
      rowCount={10}
      searchable={true}
      pagination={true}
    />
  )
}
```

## Props

### DataTable Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `ColumnDef<TData, TValue>[]` | Required | Table column definitions |
| `data` | `TData[]` | Required | Table data |
| `searchable` | `boolean` | `true` | Enable search functionality |
| `searchPlaceholder` | `string` | `"Search..."` | Search input placeholder |
| `searchKey` | `string` | `"name"` | Column key to search in |
| `pagination` | `boolean` | `true` | Enable pagination |
| `pageSize` | `number` | `10` | Number of rows per page |
| `selectable` | `boolean` | `false` | Enable row selection |
| `toolbarActions` | `React.ReactNode` | - | Custom actions in toolbar |
| `onRowClick` | `(row: TData) => void` | - | Row click handler |
| `loading` | `boolean` | `false` | Loading state |

### DataTableColumnHeader Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `column` | `Column<TData, TValue>` | Required | Column instance |
| `title` | `string` | Required | Column title |
| `className` | `string` | - | Additional CSS classes |

### DataTableRowActions Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `row` | `TData` | Required | Row data |
| `actions` | `Array<Action>` | `[]` | Array of action configurations |

Action configuration:
```typescript
{
  label: string
  icon?: React.ReactNode
  onClick: (row: TData) => void
  separator?: boolean
  destructive?: boolean
}
```

### DataTableSkeleton Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columnCount` | `number` | Required | Number of columns |
| `rowCount` | `number` | `10` | Number of rows |
| `searchable` | `boolean` | `true` | Show search skeleton |
| `pagination` | `boolean` | `true` | Show pagination skeleton |

## Performance Optimization

The DataTable components are optimized for performance:

1. **Memoization** - Components use React.memo where appropriate
2. **Virtual Scrolling** - Built-in support for large datasets
3. **Lazy Loading** - Pagination reduces initial render time
4. **Debounced Search** - Search input is debounced to reduce re-renders
5. **Column Virtualization** - Only visible columns are rendered

## Best Practices

1. **Type Safety** - Always define proper TypeScript interfaces for your data
2. **Column Configuration** - Use appropriate column types (accessorKey vs id)
3. **Memoization** - Memoize expensive computations in cell renderers
4. **Accessibility** - All interactive elements have proper ARIA labels
5. **Responsive Design** - Components are mobile-friendly by default

## Examples

See `data-table-example.tsx` for a complete working example with all features enabled.