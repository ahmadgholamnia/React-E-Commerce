import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  const { filtered_products: products, grid_view, loading } = useFilterContext()

  if (loading) {
    return <div className='loading'></div>
  } else {
    if (products.length < 1) {
      return (
        <h5 style={{ textTransform: 'none' }}>
          Sorry, no products match your search...
        </h5>
      )
    }
    if (grid_view === false) {
      return <ListView products={products} />
    }
    return <GridView products={products} />
  }
}
export default ProductList
