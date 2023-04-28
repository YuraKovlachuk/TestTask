import {ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IStation} from "../models/IStation";
import {useHttp} from "../hooks/http.hook";

type operationStatus = 'idle' | 'loading' | 'error'

interface StationState {
    stationLoadingState: operationStatus
    stationAddingState: operationStatus
    stations: IStation[]
}

const initialState: StationState = {
    stationLoadingState: 'idle',
    stationAddingState: 'idle',
    stations: []
}

export const fetchStations = createAsyncThunk(
    'stations/fetchStations',
    async (): Promise<IStation[]> => {
        const {request} = useHttp()
        return await request('http://localhost:3000/station')
    }
)

export const addStation = createAsyncThunk(
    'stations/addStation',
    async (station: IStation): Promise<IStation> => {
        const {request} = useHttp()
        return await request('http://localhost:3000/station', 'POST', JSON.stringify(station))
    }
)

const stationSlice = createSlice({
    name: 'station',
    initialState,
    reducers: {

    },
    extraReducers: (builder: ActionReducerMapBuilder<StationState>) => {
        builder
            .addCase(fetchStations.pending, (state: StationState) => {
                state.stationLoadingState = 'loading'
            })
            .addCase(fetchStations.fulfilled,(state: StationState, action: PayloadAction<IStation[]>) => {
                state.stations = action.payload
                state.stationLoadingState = 'idle'
            })
            .addCase(fetchStations.rejected, (state: StationState) => {
                state.stationLoadingState = 'error'
            })
            .addCase(addStation.pending, (state: StationState) => {
                state.stationAddingState = 'loading'
            })
            .addCase(addStation.fulfilled, (state: StationState, action: PayloadAction<IStation>) => {
                state.stations.push(action.payload)
            })
            .addCase(addStation.rejected, (state: StationState) => {
                state.stationAddingState = 'error'
            })
    }
})

const {actions, reducer: stationReducer} = stationSlice

export default stationReducer

export const {

} = actions





