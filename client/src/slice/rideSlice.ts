import {ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useHttp} from "../hooks/http.hook";
import {IRide} from "../models/IRide";
import {IRideAdd} from "../models/IRideAdd";

type operationStatus = 'idle' | 'loading' | 'error'

interface RideState {
    rideRideState: operationStatus
    rideAddingState: operationStatus
    rides: IRide[]
}

const initialState: RideState = {
    rideRideState: 'idle',
    rideAddingState: 'idle',
    rides: []
}

export const fetchRides = createAsyncThunk(
    'rides/fetchRides',
    async (): Promise<IRide[]> => {
        const {request} = useHttp()
        return await request('http://localhost:3000/ride')
    }
)

export const addRide = createAsyncThunk(
    'rides/addStation',
    async (ride: IRideAdd): Promise<IRide> => {
        const {request} = useHttp()
        return await request('http://localhost:3000/ride', 'POST', JSON.stringify(ride))
    }
)

export const filterRides = createAsyncThunk(
'rides/filterRides',
    async ({days, departureStationId, arrivalStationId}: {days: number, departureStationId: string, arrivalStationId: string}) : Promise<IRide[]> => {
        const {request} = useHttp()
        return await request(`http://localhost:3000/ride/filter?dayRange=${days}&departureStationId=${departureStationId}&arrivalStationId=${arrivalStationId}`)
    }
)

const rideSlice = createSlice({
    name: 'rides',
    initialState,
    reducers: {

    },
    extraReducers: (builder: ActionReducerMapBuilder<RideState>) => {
        builder
            .addCase(fetchRides.pending, (state: RideState) => {
                state.rideRideState = 'loading'
            })
            .addCase(fetchRides.fulfilled,(state: RideState, action: PayloadAction<IRide[]>) => {
                state.rides = action.payload
                state.rideRideState = 'idle'
            })
            .addCase(fetchRides.rejected, (state: RideState) => {
                state.rideRideState = 'error'
            })
            .addCase(addRide.pending, (state: RideState) => {
                state.rideAddingState = 'loading'
            })
            .addCase(addRide.fulfilled, (state: RideState, action: PayloadAction<IRide>) => {
                state.rides.push(action.payload)
            })
            .addCase(addRide.rejected, (state: RideState) => {
                state.rideAddingState = 'error'
            })
            .addCase(filterRides.fulfilled, (state: RideState, action: PayloadAction<IRide[]>) => {
                console.log(action.payload)
                state.rides = action.payload
            })
    }
})

const {actions, reducer: rideReducer} = rideSlice

export default rideReducer

export const {

} = actions





