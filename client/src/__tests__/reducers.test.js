// import reducer
import { reducer } from '../utils/reducers';

// import our actions
import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART
} from '../utils/actions';

// create a sample of what our global state will look like
const initialState = {
    products: [],
    categories: [{ name: 'Food' }],
    currentCategory: '1',
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
    cartOpen: false
};

test('UPDATE_PRODUCTS', () => {
    let newState = reducer(initialState, {
        type: UPDATE_PRODUCTS,
        products: [{}, {}]
    });

    expect(newState.products.length).toBe(2);
    expect(initialState.products.length).toBe(0);
});

test('UPDATE_CATEGORIES', () => {
    let newState = reducer(initialState, {
        type: UPDATE_CATEGORIES,
        categories: [{}, {}]
    });

    expect(newState.categories.length).toBe(2);
    expect(initialState.categories.length).toBe(1);
});

test('UPDATE_CURRENT_CATEGORY', () => {
    let newState = reducer(initialState, {
        type: UPDATE_CURRENT_CATEGORY,
        currentCategory: '2'
    });

    expect(newState.currentCategory).toBe('2');
    expect(initialState.currentCategory).toBe('1');
});

test('ADD_TO_CART', () => {
    let newState = reducer(initialState, {
        type: ADD_TO_CART,
        product: { purchaseQuantity: 1 }
    });

    expect(newState.cart.length).toBe(3);
    expect(initialState.cart.length).toBe(2);
});

test('ADD_MULTIPLE_TO_CART', () => {
    let newState = reducer(initialState, {
        type: ADD_MULTIPLE_TO_CART,
        products: [{}, {}]
    })

    expect(newState.cart.length).toBe(4);
    expect(initialState.cart.length).toBe(2);
});

test('REMOVE_FROM_CART', () => {
    // create a brand new state to test
    // test that an item is removed from the cart, but that cart is still open
    let newState1 = reducer(initialState, {
        type: REMOVE_FROM_CART,
        // remove product with id that matches "1"
        _id: '1'
    });

    // check to make sure the cart is still open
    expect(newState1.cartOpen).toBe(true);

    // check that the state should be at a length of 1 instead of 2
    expect(newState1.cart.length).toBe(1);
    // check that the remaining item has an "id" of "2"
    expect(newState1.cart[0]._id).toBe('2');

    // create a new state variable and set the initial to be newState1. 
    // testing to verify that the cart goes to 0 and is no longer open with no products
    let newState2 = reducer(newState1, {
        type: REMOVE_FROM_CART,
        // remove the remaining item in the cart
        _id: '2'
    });

    // cart is empty and closed
    expect(newState2.cartOpen).toBe(false);
    // cart has no items in it
    expect(newState2.cart.length).toBe(0);

    // initialState hasn't been affected
    expect(initialState.cart.length).toBe(2);
});

test('UPDATE_CART_QUANTITY', () => {
    let newState = reducer(initialState, {
        // run action UPDATE_CART_QUANTITY
        type: UPDATE_CART_QUANTITY, 
        // affect _id: 1
        _id: '1',
        // update purchaseQuantity for _id: 1 to be "3"
        purchaseQuantity: 3
    });

    // expect newState to have the cartOpen due to the increase in quantity
    expect(newState.cartOpen).toBe(true);
    // expect the newState product of _id: 1 [0] to be updated to a purchaseQuanity of "3"
    expect(newState.cart[0].purchaseQuantity).toBe(3);
    // expect the newState product of _id: 2 [1] to remain unchanged
    expect(newState.cart[1].purchaseQuantity).toBe(2);

    // expect the initialState cart to be closed
    expect(initialState.cartOpen).toBe(false);
});

test('CLEAR_CART', () => {
    let newState = reducer(initialState, {
        type: CLEAR_CART
    });

    expect(newState.cartOpen).toBe(false);
    expect(newState.cart.length).toBe(0);
    expect(initialState.cart.length).toBe(2);
});

test ('TOGGLE_CART', () => {
    let newState = reducer(initialState, {
        type: TOGGLE_CART
    });

    expect(newState.cartOpen).toBe(true);
    expect(initialState.cartOpen).toBe(false);

    let newState2 = reducer(newState, {
        type: TOGGLE_CART
    });

    expect(newState2.cartOpen).toBe(false);
})