import { configureStore } from '@reduxjs/toolkit'
// import farmsReducer from './farms/index.ts_'
// import poolsReducer from './pools/index.ts_'

export default configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    // farms: farmsReducer,
    // pools: poolsReducer,
  },
})
