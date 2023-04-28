import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store";
import DropDown from "./DropDown";
import {useEffect, useState} from "react";
import {fetchStations} from "../slice/stationSlice";
import Header from "./Header";
import Input from "./Input";
import {filterRides} from "../slice/rideSlice";

const Form = () => {
    const [departureDropdown, setDepartureDropdown] = useState<string>()
    const [arrivalDropdown, setArrivalDropdown] = useState<string>()
    const [days, setDays] = useState<number>(7)
    const {stations} = useSelector((state: RootState) => state.stationReducer)
    const [error, setError] = useState(false)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(fetchStations())
    }, [])

    const dropdownDepartureChange = (value: string) => {
        setDepartureDropdown(value)
    }

    const dropdownArrivalChange = (value: string) => {
        setArrivalDropdown(value)
    }

    const inputDaysChange = (value: number) => {
        setDays(value)
    }

    const onFilterRides = () => {
        if(!arrivalDropdown || !departureDropdown) {
            setError(true)
            return
        }
        setError(false)
        dispatch(filterRides({
            days,
            departureStationId: departureDropdown,
            arrivalStationId: arrivalDropdown
        }))
    }

    return (
        <div className="m-5">
            <Header/>
        <form>
            <div className="grid md:grid-cols-3 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                    <DropDown stationList={stations}
                              id={'departure-list'}
                              label={'Departure station'}
                              onChangeDropdown={dropdownDepartureChange}
                              value={departureDropdown}/>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <DropDown
                        stationList={stations}
                        label={'Arrival station'}
                        id={'arrival-list'}
                        onChangeDropdown={dropdownArrivalChange}
                        value={arrivalDropdown}
                    />
                </div>
                <div className="relative z-0 w-full mb-6 group ">
                    <Input type={'number'}
                           id={'day-range'}
                           label={'Day count'}
                           value={days}
                           min={'1'}
                           onChangeInput={inputDaysChange}
                           customClass={'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'}/>
                </div>
            </div>
            <button type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={onFilterRides}
            >Search
            </button>
            {error ? <p className="text-red-600 text-center">Choose station first!</p> : null}
        </form>
        </div>
    );
};

export default Form;
