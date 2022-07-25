import productsReducer, { UPDATE_PRODUCTS } from "../features/products";
import cartReducer, { 
  ADD_TO_CART, 
  ADD_MULTIPLE_TO_CART, 
  REMOVE_FROM_CART,
  CLEAR_CART,
  TOGGLE_CART,
  UPDATE_CART_QUANTITY,
} from "../features/cart";
import categoryReducer, { UPDATE_CURRENT_CATEGORY, UPDATE_CATEGORIES } from "../features/categories";

const initialState = {
  products: [],
  cart: [
    {
      _id: '1',
      name: 'Soup',
      purchaseQuantity: 1
    },
    {
      _id: '2',
      name: 'Bread',
      purchaseQuantity: 2
    }
  ],
  cartOpen: false,
  categories: [{ name: 'Food' }],
  currentCategory: '1',
};

test('UPDATE_PRODUCTS', () => {
  let newState = productsReducer(initialState, UPDATE_PRODUCTS({ products: [{}, {}] }));

  expect(newState.products.length).toBe(2);
  expect(initialState.products.length).toBe(0);
});

test('ADD_TO_CART', () => {
  let newState = cartReducer(initialState, ADD_TO_CART( { products: { purchaseQuantity: 1 }}) );

  expect(newState.cart.length).toBe(3);
  expect(initialState.cart.length).toBe(2);
});

test('UPDATE_CART_QUANTITY', () => {

  let newState = cartReducer(initialState, UPDATE_CART_QUANTITY({ _id: "1", purchaseQuantity: 3 }))

  expect(newState.cartOpen).toBe(true);
  expect(newState.cart[0].purchaseQuantity).toBe(3);
  expect(newState.cart[1].purchaseQuantity).toBe(2);
  expect(initialState.cartOpen).toBe(false);
});

test('REMOVE_FROM_CART', () => {

  let newState1 = cartReducer(initialState, REMOVE_FROM_CART({ _id: "1" }))

  expect(newState1.cartOpen).toBe(true);
  expect(newState1.cart.length).toBe(1);
  expect(newState1.cart[0]._id).toBe('2');

  let newState2 = cartReducer(newState1, REMOVE_FROM_CART({ _id: "2" }))

  expect(newState2.cartOpen).toBe(false);
  expect(newState2.cart.length).toBe(0);

  expect(initialState.cart.length).toBe(2);
});

test('ADD_MULTIPLE_TO_CART', () => {

  let newState = cartReducer(initialState, ADD_MULTIPLE_TO_CART({ products: [{}, {}] }));
  console.log(newState.cart);
  expect(newState.cart.length).toBe(4);
  expect(initialState.cart.length).toBe(2);
});

test('UPDATE_CATEGORIES', () => {
  let newState = categoryReducer(initialState, UPDATE_CATEGORIES({ categories: [{}, {}]}));

  expect(newState.categories.length).toBe(2);
  expect(initialState.categories.length).toBe(1);
});

test('UPDATE_CURRENT_CATEGORY', () => {

  let newState = categoryReducer(initialState, UPDATE_CURRENT_CATEGORY(
    { currentCategory: "2"},
  ));

  expect(newState.currentCategory).toBe('2');
  expect(initialState.currentCategory).toBe('1');
});

test('CLEAR_CART', () => {
  let newState = cartReducer(initialState, CLEAR_CART())

  expect(newState.cartOpen).toBe(false);
  expect(newState.cart.length).toBe(0);
  expect(initialState.cart.length).toBe(2);
});

test('TOGGLE_CART', () => {

  let newState = cartReducer(initialState, TOGGLE_CART())

  expect(newState.cartOpen).toBe(true);
  expect(initialState.cartOpen).toBe(false);

  let newState2 = cartReducer(newState, TOGGLE_CART())

  expect(newState2.cartOpen).toBe(false);
});