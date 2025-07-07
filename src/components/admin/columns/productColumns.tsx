
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Trash, Star, Tag, Package, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/contexts/ProductContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const columns = (
  onEdit: (product: Product) => void,
  onDelete: (id: string) => void
): ColumnDef<Product>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() 
            ? true 
            : table.getIsSomePageRowsSelected() 
              ? "indeterminate" 
              : false
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Seleccionar todo"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Seleccionar fila"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent"
        >
          Nombre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">{product.name}</span>
          <span className="text-xs text-gray-500">SKU: {product.sku}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Categoría",
    cell: ({ row }) => (
      <Badge variant="outline" className="flex items-center gap-1 border-gray-300 text-gray-700">
        <Tag className="h-3 w-3" />
        <span>{row.getValue("category")}</span>
      </Badge>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent justify-end w-full"
        >
          Precio
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
      }).format(price);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "stock",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent justify-end w-full"
        >
          Stock
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const stock = parseInt(row.getValue("stock"));
      let badgeVariant = "default";
      
      if (stock === 0) {
        badgeVariant = "destructive";
      } else if (stock < 10) {
        badgeVariant = "warning";
      } else {
        badgeVariant = "success";
      }
      
      return (
        <div className="text-center">
          <Badge variant={badgeVariant as "default" | "destructive" | "warning" | "success"} className="font-medium">
            {stock}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "featured",
    header: "Destacado",
    cell: ({ row }) => {
      const isFeatured = row.getValue("featured");
      
      return (
        <div className="text-center">
          {isFeatured ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Star className="h-5 w-5 text-yellow-500 mx-auto" fill="currentColor" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Producto destacado</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Star className="h-5 w-5 text-gray-300 mx-auto" />
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(product)}
            className="hover:bg-blue-50 hover:text-blue-600"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(product.id)}
            className="hover:bg-red-50 hover:text-red-600"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
