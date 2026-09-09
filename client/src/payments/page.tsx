import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useStore } from "../../store/store";

export default function DemoPage() {
  const products = useStore((state) => state.products);
  const deleteProducts = useStore((state) => state.deleteProducts);
 //ADDED DELETE
  const productColumns = columns(deleteProducts);

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={productColumns}
        data={products}
      />
    </div>
  );
}