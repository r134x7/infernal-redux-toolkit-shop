import React, { useEffect } from 'react';
import ProductItem from '../ProductItem';
import { useSelector, useDispatch } from 'react-redux';
import { UPDATE_PRODUCTS } from '../../features/products'; // redux toolkit productsSlice actions
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries'; // here is where the items are spawned on page
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function ProductList() {
  
  const catState = useSelector(state => state.categories); // not checking what was inside catState made it take very very long to figure out why the products didn't render.

  const state = useSelector(state => state.products); // getting the products state from the store
  const dispatch = useDispatch(); // dispatching actions to any of the states above depending on the action used

  const { loading, data } = useQuery(QUERY_PRODUCTS); // graphQL query

  useEffect(() => {
    if (data) {
      dispatch(UPDATE_PRODUCTS({ // redux toolkit action method of useDispatch
        products: data.products,
      }))
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {
      idbPromise('products', 'get').then((products) => {
        dispatch(UPDATE_PRODUCTS({ // redux toolkit action method of useDispatch
          products: products
        }))
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!catState.currentCategory) {
      return state.products;
    }

    return state.products.filter(
      (product) => product.category._id === catState.currentCategory
    );
  }
  
  
  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {state.products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
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
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
