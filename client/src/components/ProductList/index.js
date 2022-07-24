// Completed?
import React, { useEffect } from 'react';
import ProductItem from '../ProductItem';
// import { useStoreContext } from '../../utils/GlobalState';
// import { UPDATE_PRODUCTS } from '../../utils/actions';
import { useSelector, useDispatch } from 'react-redux';
// import categoriesReducer, { UPDATE_CURRENT_CATEGORY } from '../../features/categories';
import productsReducer, { UPDATE_PRODUCTS } from '../../features/products';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';
// check this file
function ProductList() {
  // const [state, dispatch] = useStoreContext();

  // const { currentCategory } = state;
  const currentCategory = useSelector(state => state.categories);

  const products = useSelector(state => state.products);
  const dispatch = useDispatch();

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: "UPDATE_PRODUCTS",
        products: data.products,
      });
      // dispatch(productsReducer(products, UPDATE_PRODUCTS({
      //   products: data.products
      // })))
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {
      idbPromise('products', 'get').then((products) => {
        dispatch({
          type: "UPDATE_PRODUCTS",
          products: products,
        });
        // dispatch(productsReducer(products, UPDATE_PRODUCTS({
        //   products: products
        // })))
      });
    }
  }, [data, loading, dispatch]);
  // }, [products, data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      // return state.products;
      return products;
    }

    // return state.products.filter(
    return products.filter(
      (product) => product.category._id === currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {products.length ? (
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
