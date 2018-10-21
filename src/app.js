const { createStore } = require('redux');

/*
APPLICATION-1
A basic counter app:
* no payload: actions of this app do not accept,
any payload.
* sync actions: means when the action triggers,
the store get updated at the same time
*/

// REDUX ACTIONS TYPES
const INCREASE_COUNTER = 'INCREASE_COUNTER';
const DECREASE_COUNTER = 'DECREASE_COUNTER';
const RESET_COUNTER = 'RESET_COUNTER';

// REDUX ACTION CREATOR
function increaseCounterAction(){ return {type: INCREASE_COUNTER } };
function decreaseCounterAction(){ return {type: DECREASE_COUNTER } };
function resetCounterAction(){ return {type: RESET_COUNTER } };

// STATE
const initialState = {
  count: 0,
}

// REDUCER
function counterReducer(state = initialState, action){
  const newState = {...state}; // immutable object
  switch (action.type) {
    case INCREASE_COUNTER:
      newState.count += 1;
      break;
    case DECREASE_COUNTER:
      newState.count -= 1;
      break;
    case RESET_COUNTER:
      newState.count = 0;
      break;
    default:
      return state;
      break;
  }
  return newState;
}

// creating redux store
const store = createStore(
  counterReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// get element from html
const addButton = document.getElementById('add');
const subButton = document.getElementById('sub');
const resetButton = document.getElementById('reset');
const displayHeading = document.getElementById('display');

// add listeners
addButton.addEventListener('click',function(){
  // on click of the button: ADD (+), this function is triggered
  console.log('ADD (+) button is clicked');
  store.dispatch(increaseCounterAction());
  console.log(store.getState());
});

subButton.addEventListener('click',function(){
  // on click of the button: ADD (+), this function is triggered
  console.log('SUB (-) button is clicked');
  store.dispatch(decreaseCounterAction());
  console.log(store.getState());
});

resetButton.addEventListener('click',function(){
  // on click of the button: ADD (+), this function is triggered
  console.log('Reset button is clicked');
  store.dispatch(resetCounterAction());
  console.log(store.getState());
});

// subscribing to store
store.subscribe(() => {
  const state = store.getState();
  displayHeading.innerText = state.count;
});