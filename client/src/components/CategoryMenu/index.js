// Completed?
import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
// import { useStoreContext } from '../../utils/GlobalState';
// import {
//   UPDATE_CATEGORIES,
//   UPDATE_CURRENT_CATEGORY,
// } from '../../utils/actions';

import categoriesReducer, { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY} from "../../features/categories"
import { useSelector, useDispatch } from 'react-redux';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
// check this file
function CategoryMenu() {
  // const [state, dispatch] = useStoreContext();

  // const { categories } = state;

  const state = useSelector(state => state.categories);
  const dispatch = useDispatch();

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: "UPDATE_CATEGORIES",
        categories: categoryData.categories,
      });
      // dispatch(categoriesReducer(state, UPDATE_CATEGORIES({
      //   categories: categoryData.categories
      // })))
      categoryData.categories.forEach((category) => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then((categories) => {
        dispatch({
          type: "UPDATE_CATEGORIES",
          categories: categories,
        });
        // dispatch(categoriesReducer(state, UPDATE_CATEGORIES({
        //   categories: categories
        // })))
      });
    }
  }, [categoryData, loading, dispatch]);
  // }, [state, categoryData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: "UPDATE_CURRENT_CATEGORY",
      currentCategory: id,
    });
    // dispatch(categoriesReducer(state, UPDATE_CURRENT_CATEGORY({
    //   currentCategory: id
    // })))
  };

  // console.log(categories.categories);
  // // console.log(categories.map((item) => item));
  // console.log(categories.categories.name);
  // console.log(categories.categories._id);

  // const test = categories.categories.map((item) => 
  //   item._id
  // )

  // console.log(state.categories);

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
