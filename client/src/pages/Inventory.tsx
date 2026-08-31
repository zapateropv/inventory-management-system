import React from 'react'
import { useStore } from '../../store/store'
import { useEffect } from 'react'

const Inventory = () => {

  const {getProducts, products} = useStore()
  console.log(products + 'test')
  useEffect(() => {
    getProducts()
  }, [])
  return (
   <div>
      inventory
   </div>
  )
}

export default Inventory
