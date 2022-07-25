import React from 'react';
import { useDispatch } from 'react-redux';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../features/cart"; // redux toolkit cartSlice actions
import { idbPromise } from "../../utils/helpers";

const CartItem = ({ item }) => {

  const dispatch = useDispatch(); // only useDispatch is needed and not the state of the cart i.e. useSelector(state => state.cart)

  const removeFromCart = item => {
    dispatch(REMOVE_FROM_CART({ // redux toolkit action method of useDispatch
      _id: item._id
    }))
    idbPromise('cart', 'delete', { ...item });

  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      dispatch(REMOVE_FROM_CART({ // redux toolkit action method of useDispatch
        _id: item._id
      }))
      idbPromise('cart', 'delete', { ...item });

    } else {
      dispatch(UPDATE_CART_QUANTITY({ // redux toolkit action method of useDispatch
        _id: item._id,
        purchaseQuantity: parseInt(value)
      }))
      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });

    }
  }

  return (
    <div className="flex-row">
      <div>
        <img
          src={`/images/${item.image}`}
          alt=""
        />
      </div>
      <div>
        <div>{item.name}, ${item.price}</div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart(item)}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;