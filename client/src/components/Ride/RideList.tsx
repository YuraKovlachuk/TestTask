import {useEffect} from 'react';
import RideListItem from "./RideListItem";
import {useDispatch, useSelector} from "react-redux";
import {fetchRides} from "../../slice/rideSlice";
import {AppDispatch, RootState} from "../../store";
import {IRide} from "../../models/IRide";

const RideList = () => {

    const {rides} = useSelector((state: RootState) => state.rideReducer)

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(fetchRides())
    }, [])


    const ridesEl = rides.map((ride: IRide) => <RideListItem ride={ride} key={ride.id}/>)

    return (
        <ul>
            {ridesEl}
        </ul>
    );
};

export default RideList;
