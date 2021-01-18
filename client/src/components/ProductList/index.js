import React, { useEffect } from "react";
import { useQuery } from '@apollo/react-hooks';

import ProductItem from "../ProductItem";
import { QUERY_PRODUCTS } from "../../utils/queries";
import spinner from "../../assets/spinner.gif"

import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';

import { idbPromise } from "../../utils/helpers";

function ProductList() {
  // pull state and dispatch out of useStoreContext()
  const [ state, dispatch ] = useStoreContext();

  // destruture currentCategory out of state
  const { currentCategory } = state;

  // destructure loading and data from the results of useQuery(QUERY_PRODUCTS). data will have results from query, loading will be a state to show that data has info. Asynchronous function that may take time
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  // include useEffect to act when data is no longer set to "undefined"
  useEffect(() => {
    if (data) { //if data has content
      dispatch({ // peform this dispatch
        type: UPDATE_PRODUCTS, // perform this action
        products: data.products // updates the globalStore with data
      });

      // let's take each product and save it to IndexedDB using the helper function
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
      // add else if to check if `loading` is undefined in `useQuery()` Hook
    } else if(!loading) {
      // since we're offline, get all of the data from the `products` store
      idbPromise('products', 'get').then((products) => {
        // use retrieved data to set global state for offline browsing
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products
        });
      });
    }
  }, [data, loading, dispatch]); // return data and dispatch. When complete this forces the useStoreContext() to run again to update "state"

  function filterProducts() {
    if (!currentCategory) {
      return state.products; // update code to include "state" to direct it to get it's data from the state
    }

    return state.products.filter(product => product.category._id === currentCategory);
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {state.products.length ? (
        <div className="flex-row">
            {filterProducts().map(product => (
                <ProductItem
                  key= {product._id}
                  _id={product._id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  quantity={product.quantity}
                />
            ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      { loading ? 
      <img src={spinner} alt="loading" />: null}
    </div>
  );
}

export default ProductList;
