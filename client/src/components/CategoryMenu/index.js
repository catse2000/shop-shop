import React, { useEffect } from "react";
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions.js';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_CATEGORIES } from "../../utils/queries";
import { useStoreContext } from "../../utils/GlobalState";

function CategoryMenu({}) {
  // pull state and dispatch out of useStoreContext()
  const [state, dispatch] = useStoreContext();

  // destruture categories out of state
  const { categories } = state;

  // create data labeled "categoryData" from the results of useQuery(QUERY_CATEGORIES). Asynchronous function that may take time
  const { data: categoryData } = useQuery(QUERY_CATEGORIES);

  // Use useeffect to update state whenever categoryData is not longer set to undefined. Runs whenever there is a state change on this component
  useEffect(()=> {
    // if categoryData exists or has changed from the response of useQuery, then run dispatch()
    if (categoryData) {
      // execute our dispatch function with our action object indicating the type of action adn the data to set our state for categories to 
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories
      });
    }
  }, [categoryData, dispatch]);

  const handleClick = id => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id
    });
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map(item => (
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
