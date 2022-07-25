import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { useSelector, useDispatch } from "react-redux";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../features/cart"; // redux toolkit cartSlice actions
import { idbPromise } from "../../utils/helpers";

function ProductItem(item) {
  
  const state = useSelector(state => state.cart); // gets the state of the cart
  const dispatch = useDispatch(); // dispatches actions to the state of the cart
  
  const {
    image,
    name,
    _id,
    price,
    quantity
  } = item; // destructures the item being added to the cart
  

  const addToCart = () => {
    const itemInCart = state.cart.find((cartItem) => cartItem._id === _id) // has to check if the id is in the cart
    if (itemInCart) {
      dispatch(UPDATE_CART_QUANTITY({ // redux toolkit action method of useDispatch
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      }))
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch(ADD_TO_CART({ // redux toolkit action method of useDispatch
        product: { ...item, purchaseQuantity: 1 }
      }))
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img
          alt={name}
          src={`/images/${image}`}
        />
        <p>{name}</p>
      </Link>
      <div>
        <div>{quantity} {pluralize("item", quantity)} in stock</div>
        <span>${price}</span>
      </div>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default ProductItem;
