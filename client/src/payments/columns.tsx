

import { createColumnHelper } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { type DataTableFeatures } from "./data-table-features"
import { MoreHorizontal } from "lucide-react"
 import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type Products } from "../../store/store"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
  product_name: string
}

// Use `accessor` for data columns and `display` for columns without one.

const columnHelper = createColumnHelper<DataTableFeatures, Products>()

export const columns = (deleteProducts: (id: number) => Promise<void>, updateProducts: { (id: number, name: string, category: string, quantity: number, sku: string, threshold: number, user_id: number, price: number): void;  }) => columnHelper.columns([
 
  columnHelper.accessor("product_name", {
      header: ({ column }) => {
      return (
        <Button
          variant="ghost"
         
        >
          Product
          
        </Button>
      )
    },
  }),
  
  columnHelper.accessor("category", {
      header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          
        >
         Category
          
        </Button>
      )
    },
  }),
  columnHelper.accessor("quantity", {
      header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
         Quantity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  }),
  columnHelper.accessor("sku", {
      header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          
        >
       SKU
         
        </Button>
      )
    },
  }),
  columnHelper.accessor("stock_threshold", {
      header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
         Stock Threshold
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  }),
  columnHelper.accessor("price", {
      header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
         Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  }),
 

   columnHelper.display({
    id: "select",
    header: ({ table }) => (
     <h1>Action</h1>
    ),
    
    cell: ({ row }) => (
      <span className="flex justify-start items-center gap-5">
        <button className="cursor-pointer"
        onClick={()=>updateProducts(row.original.product_id, row.original.product_name, row.original.category, row.original.quantity, row.original.sku, row.original.stock_threshold, row.original.user_id, row.original.price)}>Edit</button>
        <button className="cursor-pointer" 
          onClick={() => deleteProducts(row.original.product_id)} >
            Delete
          </button>
      </span>
    ),
    
    enableSorting: false,
    enableHiding: false,
  }),
])