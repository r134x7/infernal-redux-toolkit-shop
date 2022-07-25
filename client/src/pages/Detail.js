import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY, ADD_TO_CART} from "../features/cart"; // redux toolkit cartSlice actions
import { UPDATE_PRODUCTS } from "../features/products" // redux toolkit productsSlice actions
import Cart from '../components/Cart';
import { QUERY_PRODUCTS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';

function Detail() {
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const state = useSelector(state => state.cart); // the state of the cart taken from the store
  const productsState = useSelector(state => state.products); // the state of the products taken from the store

  const dispatch = useDispatch(); // will dispatch the action to the store affecting one of the above states depending on which action was used

  useEffect(() => {
    if (productsState.products.length) { // using the products state
      setCurrentProduct(productsState.products.find((product) => product._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch(UPDATE_PRODUCTS({ // redux toolkit action method of useDispatch
        products: data.products
      }))
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        dispatch(UPDATE_PRODUCTS({ // redux toolkit action method of useDispatch
          products: indexedProducts
        }))
      });
    }
  }, [productsState, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = state.cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch(UPDATE_CART_QUANTITY({ // redux toolkit action method of useDispatch
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      }))
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch(ADD_TO_CART({ // redux toolkit action method of useDispatch
          product: { ...currentProduct, purchaseQuantity: 1 },
      }))
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch(REMOVE_FROM_CART({ // redux toolkit action method of useDispatch
        _id: currentProduct._id,
    }))
    idbPromise('cart', 'delete', { ...currentProduct });
  };

  return (
    <>
      {currentProduct && state.cart ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{currentProduct.name}</h2>

          <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>${currentProduct.price}{' '}
            <button onClick={addToCart}>Add to Cart</button>
            <button
              disabled={!state.cart.find((p) => p._id === currentProduct._id)}
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;
