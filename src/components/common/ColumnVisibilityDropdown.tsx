import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { HiViewColumns } from "react-icons/hi2";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

interface ColumnVisibilityDropdownProps<T> {
  table: Table<T>;
}

const ColumnVisibilityDropdown = <T,>({ table }: ColumnVisibilityDropdownProps<T>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="plain" className="rounded-[5px] h-8 px-2 py-1 text-sm border-[1px] shadow-sm border-gray-300 dark:border-gray-600">
          <HiViewColumns />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="hover:cursor-default">Show/Hide Columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table.getAllColumns()
          .filter(column => column.getCanHide())
          .map(column => (
            <DropdownMenuCheckboxItem
              key={column.id}
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
              className="hover:cursor-pointer"
            >
              {String(column.id)}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ColumnVisibilityDropdown;
