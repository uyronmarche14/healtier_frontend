import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface DataTableSkeletonProps {
  columnCount: number
  rowCount?: number
  searchable?: boolean
  pagination?: boolean
}

export function DataTableSkeleton({
  columnCount,
  rowCount = 10,
  searchable = true,
  pagination = true,
}: DataTableSkeletonProps) {
  return (
    <div className="w-full space-y-4">
      {searchable && (
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-[150px] lg:w-[250px]" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-[100px]" />
            <Skeleton className="h-8 w-[80px]" />
          </div>
        </div>
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {Array.from({ length: columnCount }).map((_, i) => (
                <TableHead key={i}>
                  <Skeleton className="h-4 w-full" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: rowCount }).map((_, i) => (
              <TableRow key={i}>
                {Array.from({ length: columnCount }).map((_, j) => (
                  <TableCell key={j}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {pagination && (
        <div className="flex items-center justify-end space-x-2">
          <Skeleton className="h-8 w-[100px]" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      )}
    </div>
  )
}