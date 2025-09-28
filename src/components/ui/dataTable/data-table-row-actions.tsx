import * as React from "react"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DataTableRowActionsProps<TData> {
  row: TData
  actions?: Array<{
    label: string
    icon?: React.ReactNode
    onClick: (row: TData) => void
    separator?: boolean
    destructive?: boolean
  }>
}

export function DataTableRowActions<TData>({
  row,
  actions = [],
}: DataTableRowActionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        {actions.map((action, index) => (
          <React.Fragment key={index}>
            {action.separator && <DropdownMenuSeparator />}
            <DropdownMenuItem
              onClick={() => action.onClick(row)}
              className={action.destructive ? "text-destructive" : ""}
            >
              {action.icon && <span className="mr-2">{action.icon}</span>}
              {action.label}
            </DropdownMenuItem>
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}