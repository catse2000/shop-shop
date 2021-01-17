import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';

import { QUERY_PRODUCTS } from "../utils/queries";
import spinner from '../assets/spinner.gif';

import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_PRODUCTS } from "../utils/actions";

function Detail() {
  // pull state and dispatch out of useStoreContext()
  const [ state, dispatch ] = useStoreContext();

  // useParams() stores the id here for use when a user clicks on a product on the page
  const { id } = useParams();

  // state to keep track of currentProduct and to update currentProduct
  const [currentProduct, setCurrentProduct] = useState({})

  // destructure and add result of QUERY_PRODUCTS to data. Set loading to know if data is undefined or not
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  // destructure products from state where that data is loaded to use through application
  const { products } = state;

  useEffect(() => {
    // if products has data
    if (products.length) {
      // set state of "setCurrentProduct" to include the specific "product" discovered through comparing "product._id" and "id". Used to show the current product information we want to display
      setCurrentProduct(products.find(product => product._id === id));
      // else if there is no products.length, run the dispatch to update global state with query so as to load the "products" object again
    } else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products
      });
    }
  }, [products, data, dispatch, id]);

  return (
    <>
      {currentProduct ? (
        <div className="container my-1">
          <Link to="/">
            ← Back to Products
          </Link>

          <h2>{currentProduct.name}</h2>

          <p>
            {currentProduct.description}
          </p>

          <p>
            <strong>Price:</strong>
            ${currentProduct.price}
            {" "}
            <button>
              Add to Cart
            </button>
            <button>
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {
        loading ? <img src={spinner} alt="loading" /> : null
      }
    </>
  );
};

export default Detail;
