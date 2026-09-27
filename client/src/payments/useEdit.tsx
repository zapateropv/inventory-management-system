import React from 'react'
import { useNavigate } from 'react-router-dom'
const useEdit = () => {

    const navigate = useNavigate()
    const updateProducts = (id:number, name:string, category:string, quantity:number, sku:string, threshold:number, user_id:number, price:number) => {
    console.log(id, name, category, quantity, sku, threshold, user_id, price)
    navigate('/add-product', {state: {
      id, name, category, quantity, sku, threshold, user_id, price,
     isUpdating: true
    }})
  
    }
  return{updateProducts}
}

export default useEdit
