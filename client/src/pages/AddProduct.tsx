import React from "react";
import { useStore } from "../../store/store";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useLocation } from "react-router-dom";

const items = [
  { label: "Electronics", value: "Electronics" },
  { label: "Office Supplies", value: "Office Supplies" },
  { label: "Furniture", value: "Furniture" },
  { label: "Tools & Equipment", value: "Tools & Equipment" },
  { label: "Cleaning Supplies", value: "Cleaning Supplies" },
  { label: "Food & Beverages", value: "Food & Beverages" },
  { label: "Clothing & Apparel", value: "Clothing & Apparel" },
  { label: "Hardware", value: "Hardware" },
];

const AddProduct = () => {
  const location = useLocation();
  const navigate = useNavigate()

  const isUpdating = location.state?.isUpdating === true;

  const [product_name, set_product_name] = useState<string>(
    isUpdating ? location.state.name : ""
  );

  const [category, setCategory] = useState<string>(
    isUpdating ? location.state.category : ""
  );

  const [price, setPrice] = useState<number>(
    isUpdating ? location.state.price : 0
  );

  const [quantity, setQuantity] = useState<number>(
    isUpdating ? location.state.quantity : 0
  );

  const [sku, setSku] = useState<string>(
    isUpdating ? location.state.sku : ""
  );

  const [stock_threshold, set_stock_threshold] = useState<number>(
    isUpdating ? location.state.threshold : 0
  );

  const { insertProducts, updateProducts } = useStore();
console.log(location.state)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isUpdating) {
      await updateProducts(
        location.state.id,
        product_name,
        category,
        quantity,
        sku,
        stock_threshold,
        location.state.user_id,
        price
      );
    navigate('/inventory')
      
    } else {
      await insertProducts({
        product_name,
        category,
        price,
        quantity,
        sku,
        stock_threshold,
      });

      

     
      set_product_name("");
      setCategory("");
      setPrice(0);
      setQuantity(0);
      setSku("");
      set_stock_threshold(0);
    }
  };

  return (
    <form
      className="w-full max-w-2xl bg-black p-7 rounded-lg m-5"
      onSubmit={handleSubmit}
    >
      <FieldGroup>

        {/* PRODUCT NAME */}
        <Field>
          <FieldLabel htmlFor="product-name">
            Product Name
          </FieldLabel>

          <Input
            id="product-name"
            type="text"
            placeholder="Keyboard"
            required
            value={product_name}
            onChange={(e) => set_product_name(e.target.value)}
          />
        </Field>

        {/* CATEGORY */}
        <Field className="w-full">
          <FieldLabel>Category</FieldLabel>

          <Select
            value={category}
            onValueChange={setCategory}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose category" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {items.map((item) => (
                  <SelectItem
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <FieldDescription>
            Select the category of your product.
          </FieldDescription>
        </Field>

        {/* PRICE + QUANTITY */}
        <div className="grid grid-cols-2 gap-4">

          <Field>
            <FieldLabel htmlFor="form-price">
              Price
            </FieldLabel>

            <Input
              id="form-price"
              type="number"
              placeholder="0.00"
              value={price}
              onChange={(e) =>
                setPrice(Number(e.target.value))
              }
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="form-quantity">
              Quantity
            </FieldLabel>

            <Input
              id="form-quantity"
              type="number"
              placeholder="0"
              value={quantity}
              onChange={(e) =>
                setQuantity(Number(e.target.value))
              }
            />
          </Field>

        </div>

        {/* SKU */}
        <Field>
          <FieldLabel htmlFor="form-sku">
            SKU
          </FieldLabel>

          <Input
            id="form-sku"
            type="text"
            placeholder="Enter SKU"
            value={sku}
            onChange={(e) =>
              setSku(e.target.value)
            }
          />
        </Field>

        {/* STOCK THRESHOLD */}
        <Field>
          <FieldLabel htmlFor="form-stock">
            Low Stock Threshold
          </FieldLabel>

          <Input
            id="form-stock"
            type="number"
            placeholder="Enter threshold"
            value={stock_threshold}
            onChange={(e) =>
              set_stock_threshold(Number(e.target.value))
            }
          />

          <FieldDescription>
            Alert when quantity falls below this number
          </FieldDescription>
        </Field>

        {/* SUBMIT */}
        <Field orientation="horizontal">
          <Button
            type="submit"
            className="w-full cursor-pointer"
          >
            {isUpdating ? "Update Product" : "Add Product"}
          </Button>
        </Field>

      </FieldGroup>
    </form>
  );
};

export default AddProduct;