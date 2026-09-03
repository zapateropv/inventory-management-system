import React from 'react'
import { useStore } from '../../store/store'
import { useEffect } from 'react'
import Page from '../payments/page'
const Inventory = () => {

  const {getProducts, products} = useStore()
  console.log(products )
  useEffect(() => {
    
    getProducts()
  }, [])
  return (
   <div>
      <Page />
   </div>
  )
}

export default Inventory
