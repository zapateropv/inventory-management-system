import React from 'react'
import { useStore } from '../../store/store'
import { Button } from "@/components/ui/button"
import { useState } from 'react'
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const items = [


  { label: "Electronics", value: "electronics" },
  { label: "Office Supplies", value: "office_supplies" },
  { label: "Furniture", value: "furniture" },
  { label: "Tools & Equipment", value: "tools_equipment" },
  { label: "Cleaning Supplies", value: "cleaning_supplies" },
  { label: "Food & Beverages", value: "food_beverages" },
  { label: "Clothing & Apparel", value: "clothing_apparel" },
  { label: "Hardware", value: "hardware" },

]


const AddProduct = () => {
  
  const [product_name, set_product_name] = useState<string>("")
  const [category, setCategory] = useState<string>("")
  const [price, setPrice] = useState<number>(0)
  const [quantity, setQuantity] = useState<number>(0)
  const [sku, setSku] = useState<string>("")
  const [stock_threshold, set_stock_threshold] = useState<number>(0)

  
  const {insertProducts} = useStore()
  const addProducts = (e:React.FormEvent) =>{
    e.preventDefault()
    insertProducts({product_name, category, price, quantity, sku, stock_threshold})
    set_product_name("")
    setCategory("")
    setPrice(0)
    setQuantity(0)
    setSku("")
    set_stock_threshold(0)
  }
 
  return (
    <form className="w-full max-w-2xl bg-black p-7 rounded-lg m-5 " onSubmit={addProducts}>
    
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="product-name">Product Name</FieldLabel>
          <Input
            id="product-name"
            type="text"
            placeholder="Keyboard"
            required
            value={product_name}
            onChange={(e) => (set_product_name(e.target.value))}
          />
        </Field>
        <Field className="w-full ">
          <FieldLabel>Category</FieldLabel>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Choose category" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {items.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
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

        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="form-price">Price</FieldLabel>
            <Input id="form-price" type="number" placeholder="0.00" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
          </Field>
          <Field>
            <FieldLabel htmlFor="form-quantity">Quantity</FieldLabel>
            <Input id="form-quantity" type="number" placeholder="0" value={quantity} onChange={(e) =>  setQuantity(Number(e.target.value))} />
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="form-sku">SKU</FieldLabel>
          <Input id="form-sku" type="text" placeholder="Enter SKU" value={sku} onChange={(e) => setSku(e.target.value)} />
        </Field>
        <Field>
          <FieldLabel htmlFor="form-stock">Low Stock Threshold </FieldLabel>
          <Input id="form-stock" type="text" placeholder="Enter threshold" value={stock_threshold} onChange={(e) => set_stock_threshold(Number(e.target.value))} />
          <FieldDescription>
            Alert when quantity falls below this number
          </FieldDescription>
        </Field>
        <Field orientation="horizontal">
          <Button type="submit" className='w-full  cursor-pointer' >Submit</Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default AddProduct
