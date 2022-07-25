import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY} from "../../features/categories" // redux toolkit categorySlice actions
import { useSelector, useDispatch } from 'react-redux';
import { QUERY_CATEGORIES } from '../../utils/queries'; // here is where the categories appear on page
import { idbPromise } from '../../utils/helpers';

function CategoryMenu() {

  const state = useSelector(state => state.categories); // gets the state from the store
  const dispatch = useDispatch(); // will dispatch the action to the store

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch(UPDATE_CATEGORIES({ // this is how you get dispatch to work with redux toolkit, the action is imported and used like a function, no type needed!
        categories: categoryData.categories
      }))
      categoryData.categories.forEach((category) => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then((categories) => {
        dispatch(UPDATE_CATEGORIES({ // this is how you get dispatch to work with redux toolkit, the action is imported and used like a function
          categories: categories
        }))
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = (id) => {
  dispatch(UPDATE_CURRENT_CATEGORY({ // this is how you get dispatch to work with redux toolkit, the action is imported and used like a function
      currentCategory: id
    }))
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {state.categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
