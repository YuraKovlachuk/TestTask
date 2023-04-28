import {configureStore} from "@reduxjs/toolkit";
import stationReducer from "../slice/stationSlice";
import {CurriedGetDefaultMiddleware} from "@reduxjs/toolkit/dist/getDefaultMiddleware";
import rideReducer from "../slice/rideSlice";


const store = configureStore({
    reducer: {stationReducer, rideReducer},
    middleware: (getDefaultMiddleware: CurriedGetDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
