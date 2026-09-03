import { columns, type Payment } from "./columns"
import { DataTable } from "./data-table"
import {type Products } from "../../store/store"
import { useStore } from "../../store/store"
function getData(): Products[] {
  const {products} = useStore()
  return products
}

export default function DemoPage() {
  const data = getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}