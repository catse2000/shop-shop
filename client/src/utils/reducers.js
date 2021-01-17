// import useReducer function that will be used to take in our state and update it through reducer()
import { useReducer } from 'react';

import { // import actions
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART
} from './actions';

export const reducer = (state, action) => {
    switch (action.type) {
        // if action type value is the value of `UPDATE_PRODUCTS`, return a new state object with an updated products array
        case UPDATE_PRODUCTS: 
            return {
                ...state,
                products: [...action.products],
            };
        
        // if action type value is the value of `UPDATE_CATEGORIES`, return a new state object with an updated categories array
        case UPDATE_CATEGORIES: 
            return {
                ...state,
                categories: [...action.categories],
            };

        case UPDATE_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory: action.currentCategory,
            };
        
        case ADD_TO_CART: 
            return {
                ...state,
                cartOpen: true,
                cart: [...state.cart, action.product]
            };
        
        case ADD_MULTIPLE_TO_CART:
            return {
                ...state,
                cart: [...state.cart, ...action.products]
            }

        case REMOVE_FROM_CART: 
            // search through and keep items that don't match product._id
            let newState = state.cart.filter(product => {
                return product._id !== action._id;
            });

            return {
                ...state,
                // change cartOpen to true if newState.length is more than 0
                cartOpen: newState.length > 0,
                // update cart with products remaining from newState
                cart: newState
            }
        
        case UPDATE_CART_QUANTITY: 
        // when UPDATe_CART_QUANTITY action is run return:
            return {
                // existing state
                ... state,
                // change cartOpen to true if it's false
                cartOpen: true,
                // map out the list of products and
                cart: state.cart.map(product => {
                    // check if action_id matches a product._id under state
                    if (action._id === product._id) {
                        // if there is a match, update the purchaseQuantity of product with the quantity under action
                        product.purchaseQuantity = action.purchaseQuantity;
                    }
                    // then return product
                    return product;
                })
            };
        
        case CLEAR_CART: 
            return {
                ...state,
                cartOpen: false,
                cart: []
            };

        case TOGGLE_CART:
            return {
                ...state,
                cartOpen: !state.cartOpen
            }

        // if it's none of these actions, do not update state at all and keep things the same!
        default: 
            return state;
    }
};

// used to initialize the global state object and provide fundtionality for updating state
export function useProductReducer(initialState) {
    return useReducer(reducer, initialState);
}