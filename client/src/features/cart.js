import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
  //   cart: [],
  //   cartOpen: false,
  // };
  
  const initialState = {
    categories: [{ name: 'Food', _id: "1" },
    { name: 'Household Supplies', _id: "2" },
    { name: 'Electronics', _id: "3" },
    { name: 'Books', _id: "4" },
    { name: 'Toys', _id: "5" }],
    products: [
        {
          name: 'Tin of Cookies',
          description:
            'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
          image: 'cookie-tin.jpg',
          category: "Food",
          price: 2.99,
          quantity: 500
        },
        {
          name: 'Canned Coffee',
          description:
            'Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis. Donec iaculis rutrum vulputate. Suspendisse lectus sem, vulputate ac lectus sed, placerat consequat dui.',
          image: 'canned-coffee.jpg',
          category: "Food",
          price: 1.99,
          quantity: 500
        },
        {
          name: 'Toilet Paper',
          category: "Household Supplies",
          description:
            'Donec volutpat erat erat, sit amet gravida justo sodales in. Phasellus tempus euismod urna. Proin ultrices nisi ut ipsum congue, vitae porttitor libero suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam lacinia a nisi non congue.',
          image: 'toilet-paper.jpg',
          price: 7.99,
          quantity: 20
        },
        {
          name: 'Handmade Soap',
          category: "Household Supplies",
          description:
            'Praesent placerat, odio vel euismod venenatis, lectus arcu laoreet felis, et fringilla sapien turpis vestibulum nisl.',
          image: 'soap.jpg',
          price: 3.99,
          quantity: 50
        },
        {
          name: 'Set of Wooden Spoons',
          category: "Household Supplies",
          description:
            'Vivamus ut turpis in purus pretium mollis. Donec turpis odio, semper vel interdum ut, vulputate at ex. Duis dignissim nisi vel tortor imperdiet finibus. Aenean aliquam sagittis rutrum.',
          image: 'wooden-spoons.jpg',
          price: 14.99,
          quantity: 100
        },
        {
          name: 'Camera',
          category: "Electronics",
          description:
            'Vestibulum risus metus, luctus non tortor quis, tincidunt consectetur ex. Nullam vitae lobortis ligula, ut sagittis massa. Curabitur consectetur, tellus at pulvinar venenatis, erat augue cursus erat, eu ullamcorper eros lectus ultrices ipsum. Integer rutrum, augue vitae auctor venenatis, turpis turpis elementum orci, at sagittis risus mi a leo.',
          image: 'camera.jpg',
          price: 399.99,
          quantity: 30
        },
        {
          name: 'Tablet',
          category: "Electronics",
          description:
            'In sodales, ipsum quis ultricies porttitor, tellus urna aliquam arcu, eget venenatis purus ligula ut nisi. Fusce ut felis dolor. Mauris justo ante, aliquet non tempus in, tempus ac lorem. Aliquam lacinia dolor eu sem eleifend ultrices. Etiam mattis metus metus. Sed ligula dui, placerat non turpis vitae, suscipit volutpat elit. Phasellus sagittis, diam elementum suscipit fringilla, libero mauris scelerisque ex, ac interdum diam erat non sapien.',
          image: 'tablet.jpg',
          price: 199.99,
          quantity: 30
        },
        {
          name: 'Tales at Bedtime',
          category: "Books",
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare diam quis eleifend rutrum. Aliquam nulla est, volutpat non enim nec, pharetra gravida augue. Donec vitae dictum neque. Pellentesque arcu lorem, fringilla non ligula ac, tristique bibendum erat. Ut a semper nibh. Quisque a mi et mi tempor ultricies. Maecenas eu ipsum eu enim hendrerit accumsan at euismod urna.',
          image: 'bedtime-book.jpg',
          price: 9.99,
          quantity: 100
        },
        {
          name: 'Spinning Top',
          category: "Toys",
          description: 'Ut vulputate hendrerit nibh, a placerat elit cursus interdum.',
          image: 'spinning-top.jpg',
          price: 1.99,
          quantity: 1000
        },
        {
          name: 'Set of Plastic Horses',
          category: "Toys",
          description:
            'Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.',
          image: 'plastic-horses.jpg',
          price: 2.99,
          quantity: 1000
        },
        {
          name: 'Teddy Bear',
          category: "Toys",
          description:
            'Vestibulum et erat finibus erat suscipit vulputate sed vitae dui. Ut laoreet tellus sit amet justo bibendum ultrices. Donec vitae felis vestibulum, congue augue eu, finibus turpis.',
          image: 'teddy-bear.jpg',
          price: 7.99,
          quantity: 100
        },
        {
          name: 'Alphabet Blocks',
          category: "Toys",
          description:
            'Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.',
          image: 'alphabet-blocks.jpg',
          price: 9.99,
          quantity: 600
        }
      ],
    cart: [],
    cartOpen: false,
    currentCategory: '',
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        ADD_TO_CART(state, action) {
            return {
                ...state,
                cartOpen: true,
                cart: [...state.cart, action.payload.products],
            };
        },
        UPDATE_CART_QUANTITY(state, action) {
            return {
                ...state,
                cartOpen: true,
                cart: state.cart.map((product) => {
                  if (action.payload._id === product._id) {
                    return {...product, purchaseQuantity: action.payload.purchaseQuantity} // has to be a return statement else it won't work
                    // return {_id: product._id, name: product.name, purchaseQuantity: action.payload.purchaseQuantity} // alternative working method
                  } else {
                    return product;
                  }
                }),
              };
        },
        REMOVE_FROM_CART(state, action) {
            let newState = state.cart.filter(product => {
                return product._id !== action.payload._id;
              });
              
              return {
                ...state,
                cartOpen: newState.length > 0,
                cart: newState
              };
        },
        ADD_MULTIPLE_TO_CART(state, action) {
            return {
                ...state,
                cart: [...state.cart, ...action.products],
              };
        },
        CLEAR_CART(state, action) {
            return {
                ...state,
                cartOpen: false,
                cart: []
            };
        },
        TOGGLE_CART(state, action) {
            return {
                ...state,
                cartOpen: !state.cartOpen
              };
        }
    }
});

export const { ADD_TO_CART, UPDATE_CART_QUANTITY, ADD_MULTIPLE_TO_CART, REMOVE_FROM_CART, CLEAR_CART, TOGGLE_CART } = cartSlice.actions;

export default cartSlice.reducer;