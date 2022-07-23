import React from 'react';
// import { useStoreContext } from "../../utils/GlobalState";
import { useDispatch, useSelector } from 'react-redux';
// import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import cartReducer, { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../features/cart";
import { idbPromise } from "../../utils/helpers";
// check this file
const CartItem = ({ item }) => {

  // const [, dispatch] = useStoreContext();
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch();

  const removeFromCart = item => {
    // dispatch({
    //   type: REMOVE_FROM_CART,
    //   _id: item._id
    // });
    dispatch(
      (cartReducer
        (cart, REMOVE_FROM_CART
          ({_id: item._id})
        )
      ));
    idbPromise('cart', 'delete', { ...item });

  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      // dispatch({
      //   type: REMOVE_FROM_CART,
      //   _id: item._id
      // });
      dispatch(
        (cartReducer
          (cart, REMOVE_FROM_CART
            ({_id: item._id})
          )
        ));
      idbPromise('cart', 'delete', { ...item });

    } else {
      // dispatch({
      //   type: UPDATE_CART_QUANTITY,
      //   _id: item._id,
      //   purchaseQuantity: parseInt(value)
      // });
      dispatch(cartReducer
        (cart, UPDATE_CART_QUANTITY({  _id: item._id,
        purchaseQuantity: parseInt(value)
            })
          )
        );
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