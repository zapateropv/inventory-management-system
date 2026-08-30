import React from 'react'
import { Button } from "@/components/ui/button"
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
  { label: "Choose category", value: null },
  { label: "Engineering", value: "engineering" },
  { label: "Design", value: "design" },
  { label: "Marketing", value: "marketing" },
  { label: "Sales", value: "sales" },
  { label: "Customer Support", value: "support" },
  { label: "Human Resources", value: "hr" },
  { label: "Finance", value: "finance" },
  { label: "Operations", value: "operations" },
]


const AddProduct = () => {
  
  return (
  <form className="w-full max-w-lg bg-black p-5 ">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="form-name">Product Name</FieldLabel>
          <Input
            id="form-name"
            type="text"
            placeholder="Evil Rabbit"
            required
          />
        </Field>
   <Field className="w-full ">
      <FieldLabel>Category</FieldLabel>
     
       <Select items={items}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value} >
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
            <FieldLabel htmlFor="form-phone">Price</FieldLabel>
            <Input id="form-phone" type="number" placeholder="0.00" />
          </Field>
          <Field>
            <FieldLabel htmlFor="form-country">Quantity</FieldLabel>
            <Input id="form-phone" type="number" placeholder="0" />
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="form-address">SKU</FieldLabel>
          <Input id="form-address" type="text" placeholder="Enter SKU" />
        </Field>
        <Field>
          <FieldLabel htmlFor="form-address">Low Stock Threshold </FieldLabel>
          <Input id="form-address" type="text" placeholder="Enter threshold" />
        </Field>
        <Field orientation="horizontal">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default AddProduct
