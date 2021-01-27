import { act } from '@testing-library/react'
import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

// At here
// all_products: [...action.payload]
// We are copying the values
// and we are not refrencing to the SAME palce in the memory
const filter_reducer = (state, action) => {
  if (action.type === 'LOADING') {
    return {
      ...state,
      loading: true,
    }
  }
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload
      .map((p) => {
        return p.price
      })
      .sort((a, b) => {
        return b - a
      })

    return {
      ...state,
      loading: false,
      filters: {
        ...state.filters,
        max_price: maxPrice[0],
        price: maxPrice[0],
      },

      all_products: [...action.payload].sort((a, b) => {
        return a.price - b.price
      }),
      filtered_products: [...action.payload].sort((a, b) => {
        return a.price - b.price
      }),
    }
  }

  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true }
  }

  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false }
  }

  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload }
  }
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state

    let newArr = [...filtered_products]
    if (sort === 'price-lowest') {
      newArr = newArr.sort((a, b) => {
        return a.price - b.price
      })
    }
    if (sort === 'price-highest') {
      newArr = newArr.sort((a, b) => {
        return b.price - a.price
      })
    }
    if (sort === 'name-a') {
      newArr = newArr.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
    }
    if (sort === 'name-z') {
      newArr = newArr.sort((a, b) => {
        return b.name.localeCompare(a.name)
      })
    }
    return { ...state, filtered_products: newArr }
  }

  if (action.type === UPDATE_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        ...action.payload,
      },
    }
  }

  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state
    let filterdProducts = [...all_products]
    const {
      text,
      company,
      category,
      color,
      min_price,
      max_price,
      price,
      shipping,
    } = state.filters
    if (text) {
      filterdProducts = filterdProducts.filter((p) => {
        if (p.name.toLowerCase().startsWith(text)) {
          return p
        }
      })
    }

    if (category === 'all') {
      filterdProducts = filterdProducts
    } else {
      filterdProducts = filterdProducts.filter((p) => {
        return p.category === category
      })
    }

    if (company === 'all') {
      filterdProducts = filterdProducts
    } else {
      filterdProducts = filterdProducts.filter((p) => {
        return p.company === company
      })
    }

    if (color === 'all') {
      filterdProducts = filterdProducts
    } else {
      filterdProducts = filterdProducts.filter((p) => {
        return p.colors.find((c) => c === color)
      })
      // let a = [
      //   ...new Set(
      //     filterdProducts
      //       .map((p) => {
      //         return p.colors
      //       })
      //       .flat()
      //   ),
      // ].filter((p) => {
      //   return p === color
      // })
      // filterdProducts = filterdProducts.filter((p) => {
      //   return p.colors.includes(`${a}`)
      // })
    }

    filterdProducts = filterdProducts.filter((p) => p.price <= price)

    // let a = filterdProducts
    //   .map((p) => {
    //     return p.price
    //   })
    //   .filter((p) => {
    //     return p <= price
    //   })
    // filterdProducts = filterdProducts.slice(0, a.length)
    // console.log(filterdProducts, price, a, 'gav')

    if (!shipping) {
      filterdProducts = filterdProducts
    } else {
      filterdProducts = filterdProducts.filter((p) => {
        return p.shipping === true
      })
      console.log(filterdProducts)
    }

    return {
      ...state,
      filtered_products: filterdProducts,
    }
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        price: state.filters.max_price,
        shipping: false,
      },
    }
  }
  // return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
