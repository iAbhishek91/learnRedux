# learn Redux

## to start the app

`yarn start`

## Action

- actions are simple javascript objects(should be a *plain object*). It describes **WHAT HAPPENED** in the app.
- actions object should have `type` property.
- they are also called as payload (information from application) of data.
- best practices of creating actions [flux ref](https://github.com/redux-utilities/flux-standard-action)
- try to send as less data as possible in payload.

## Action type

- actions type are generally strings.
- action types are mandatory attributes for action object.
- action types are kept in separate module sometimes in case of complex app.
- There are three default action-type reserverd(defined) by redux - INIT, REPLACE, PROBE_UNKNOWN_ACTION.
  - INIT: @@redux/INIT0.d.r.o.w.d.e
  - REPLACE: @@redux/REPLACE0.d.r.o.w.d.e
  - INIT: @@redux/PROBE_UNKNOWN_ACTION0.d.r.o.w.d.e

## Async Action

- async functions are actions that takes time to process. and meanwhile we continue to process other request.

- we have to do two thing, to handel this scenrio.
  1. inform store that process have srated.
  2. inform store that process have completed successfully or failed.

## Action creator

- action creator are simple javascript functions that returns a action object.
- this is good practice to pass action using action creator (helps in testing and increase portability).
- when action creator are bound with dispatcher it is called `bound action creator`
- binding action creator **bindActionCreator()**:
  - is a concept of binding multiple action creator to call store.dispatch.
  - takes two parameter:
    1. `actionCreaters` functions or action itself.
    2. `dispatch` functions.
  - returns function or object: 

> ACTION CREATOR FUNCTION ARE TRIGGERED WHEN WE PERFORM CERTAIN ACTIONS ON UI.
> THEN, THE DISPATCHER IS CALLED, WHICH DISPATCHES THE ACTION TO STORE(NTERNALLY TO REDUCER).

## Dispatcher

- dispatcher are mothod defined in redux.
- can be invoked using `store.dispatch()`.
- note in react-redux we invoke `connect()`, which is internally invokes `dispatcher()`.

## Reducers

- these are user defined pure functions.
- they describe how application's state changes when actions are dispatched to store.
- always **takes two parameter**:
  1. current state
  2. action
- returns new state.

## Reducers compositions

- composition/combination of reducers are required as store can be created using one recucer function.
- Either you write one complex reducer or you write simple reducers and combine them togather.
- composition of reducers are how you can break complex reducers into smaller - related functions.
- `combineReducers()` is a method provided by redux. This method takes all the top level reducers(independent reducers) and combine them into one.
- `combineReducers()` accept an object as a parameter.

## Store

- this is a single object that hold the state of the App.
- store is created using **createStore()**
  - this is the only method to create a store in `Redux`.
  - **accepts THREE parameter**:
    1. `reducer`: a function, in case of multiple reducer we have to use `combineReducer()`
    2. `[preloadedState]`: an object initialState to hydrate the state from the server or previous state.
    3. `[enhancer]`: its a function. optionally specify to enhance the store with third party capabilities such as enhancer. `applyMiddleware()` is an enhancer which ships with redux.
  - **returns redux STORE**
    - `Store` is an object that contains serveral function:
    - *dispatch* function:
      - this function is the **one and only** function to trigger a state change.
      - `reducer` function creates the store and `dispatcher` will be called with the current state tree and given the `action` and return a new state.
      - **accepts one parameter**: action object.
      - invokes `reducers` with `currentState` and `action`.
      - invokes all the `listeners`.(inprogress).
      - **returns the same action object**.
    - *subscribe* function
      - subscribe adds a change listener, it will be called anytime an action is dispatched.
      - **accepts one parameter**: listener callback function.
        - this callback function is pushed into the `nextListeners` array. Initially `nextListeners` is an empty Array.
      - `ensureCanMutateNextListeners()` function is invoekd. `if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice()
    }`
      - **returns an unsubscibe function**
        - the callback function is spliced out of the `nextListener` function.
        - if required we can unsubscribe a listener when required by using `store.subscribe(listener).unsubscribe();`
    - *getState* function
      - returns the current state object.
      - **accept no parameter**
    - *replaceReducer* function
      - this is required when we need to dynamically change the initial reducer.
    - *observable* function
  - incase second parameter is `enhancer` instead of `preloadedState` and third parameter is missing/undefined, then `createStore` swaps it internally. i,e no need to call `createStore(reducer, undefined,enhancer)`, instead we can call it using `createStore(reducer,enhancer)`.
  - `createStore()` will error:
    - if reducer is not a function.
    - if enhancer is not a function.
    - if preloadedState is a function.
  - `dispatch()` function is invoked within the `createStore({type: ActionTypes.INIT})` function.
    - this will initiate the store.
    - hence everytime you invoke `createStore()` it will initiate the redux store. So invoke `createStore()` only once from your app.