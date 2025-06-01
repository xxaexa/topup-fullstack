import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './slice/theme'
import { authApi } from './api/auth'
import { voucherApi } from './api/voucher'
import { transactionApi } from './api/transaction'
import tutorialPopupReducer from './slice/tutorial'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
    [voucherApi.reducerPath]: voucherApi.reducer,
    theme: themeReducer,
    tutorialPopup: tutorialPopupReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      transactionApi.middleware,
      voucherApi.middleware,),
  
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
