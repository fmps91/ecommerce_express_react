import React, { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import {useParams} from 'react-router-dom'
import Breadcrum from '../../Components/Breadcrums/Breadcrum'
import ProductDisplay from '../../Components/ProductDisplay/ProductDisplay'
import DescriptionBox from '../../Components/DescriptionBox/DescriptionBox'
import RelatedProducts from '../../Components/RelatedProducts/RelatedProducts'
import { useEffect } from 'react'

const Product = () => {
  const {all_product,getAllData}= useContext(ShopContext)
  
  const {productId}= useParams();
  console.log("products: ",all_product)
  /* all_product.find((e)=>{
    console.log("eeeeee: ",e.id, typeof(e.id), "productId: ",productId, typeof(Number(productId)))
    e.id===Number(productId)}) */
    useEffect(()=>{
      getAllData()
    },[])
    const product = all_product.find((e)=>e.id===Number(productId))
    
  
  return (
    <div>
          <Breadcrum product={product} />
          <ProductDisplay product={product} />
          <DescriptionBox />
          <RelatedProducts />
    </div>
  )
}

export default Product