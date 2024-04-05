import {useState, useLayoutEffect} from 'react';
import {store} from './store';
const storeKey = 'shop';
const storeKey2 = 'shop2';
const storeKey3 = 'countCart';

const initialState = [];
const initialState2 = [];
const countCart = 0;

const reducers = {
  addAllItemCategory: (_, item) => item,
};

const reducers2 = {
  addAllItemFashion: (_, item) => item,
};

const reducersCount = {
  addCount: (count, _) => count + 1,
  deleteCount: (count, _) => 0,
};

// HELPERS
const getState = () => store.getState()[storeKey];
const getState2 = () => store.getState()[storeKey2];
const getCount = () => store.getState()[storeKey3];

const subscribe = f => {
  let lastState = getState();
  return store.subscribe(
    () => lastState !== getState() && f((lastState = getState())),
  );
};
const subscribe2 = f => {
  let lastState = getState2();
  return store.subscribe(
    () => lastState !== getState2() && f((lastState = getState2())),
  );
};

const subscribeCount = f => {
  let lastState = getCount();
  return store.subscribe(
    () => lastState !== getCount() && f((lastState = getCount())),
  );
};

// EXPORTS
export const useListCategory = () => {
  const [state, setState] = useState(getState());
  useLayoutEffect(() => subscribe(setState), [setState]);
  return state;
};

export const useListFashion = () => {
  const [state, setState] = useState(getState2());
  useLayoutEffect(() => subscribe2(setState), [setState]);
  return state;
};

export const useCountCart = () => {
  const [state, setState] = useState(getCount());
  useLayoutEffect(() => subscribeCount(setState), [setState]);
  return state;
};

export const addCount = _ => store.dispatch({type: 'addCount'});

export const addAllItemCategory = item =>
  store.dispatch({type: 'addAllItemCategory', payload: item});

export const addAllItemFashion = item =>
  store.dispatch({type: 'addAllItemFashion', payload: item});

export const deleteCount = _ => store.dispatch({type: 'deleteCount'});

// INJECT-REDUCERS INTO REDUX STORE
store.injectReducer(storeKey, (state = initialState, {type, payload}) =>
  reducers[type] ? reducers[type](state, payload) : state,
);

store.injectReducer(storeKey2, (state = initialState2, {type, payload}) =>
  reducers2[type] ? reducers2[type](state, payload) : state,
);

store.injectReducer(storeKey3, (state = countCart, {type, payload}) =>
  reducersCount[type] ? reducersCount[type](state, payload) : state,
);
