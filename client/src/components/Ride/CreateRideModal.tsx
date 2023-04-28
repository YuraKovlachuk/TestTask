import Input from "../Input";
import {ModalProps} from "../Station/CreateStationModal";
import {FC, useState} from "react";
import React from "react";
import Modal from 'react-modal';
import {useDispatch, useSelector} from "react-redux";
import moment from 'moment'
import {AppDispatch, RootState} from "../../store";
import DropDown from "../DropDown";
import {addRide} from "../../slice/rideSlice";
import {IRideAdd} from "../../models/IRideAdd";

const CreateRideModal: FC<ModalProps> = ({closeModal, modalIsOpen, customStyles}) => {
    const [inputDeparture, setInputDeparture] = useState<string>(moment().format("YYYY-MM-DDTHH:mm"))
    const [inputArrival, setInputArrival] = useState<string>(moment().add(1, 'd').format("YYYY-MM-DDTHH:mm"))
    const [departureDropdown, setDepartureDropdown] = useState<string>()
    const [arrivalDropdown, setArrivalDropdown] = useState<string>()
    const {stations} = useSelector((state: RootState) => state.stationReducer)
    const dispatch = useDispatch<AppDispatch>()

    const inputDepartureChange = (value: string) => {
        setInputDeparture(value)
    }

    const inputArrivalChange = (value: string) => {
        setInputArrival(value)
    }

    const dropdownDepartureChange = (value: string) => {
        setDepartureDropdown(value)
    }

    const dropdownArrivalChange = (value: string) => {
        setArrivalDropdown(value)
    }

    const setDefaultTime = () => {
        setInputDeparture(moment().format("YYYY-MM-DDTHH:mm"));
        setInputArrival(moment().add(1, 'd').format("YYYY-MM-DDTHH:mm"));
    }

    const onAddRide = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if(!inputDeparture || !inputArrival || !departureDropdown || !arrivalDropdown) { return; }
        if(departureDropdown === arrivalDropdown || inputArrival === inputDeparture) { return; }
        dispatch(addRide({
            departureStation: departureDropdown,
            arrivalStation: arrivalDropdown,
            arrivalTime: inputArrival,
            departureTime: inputDeparture
        } as IRideAdd))
        setDefaultTime()
        setDepartureDropdown('')
        setArrivalDropdown('')
        closeModal()
    }

    return (
        <Modal
            isOpen={modalIsOpen}
            style={customStyles}
            onRequestClose={closeModal}
            ariaHideApp={false}
            contentLabel="Example Modal"
        >
            <h1 className="text-center font-bold text-lg">Create Ride</h1>
            <form className="bg-white rounded px-8 pt-6 pb-6">
                <div className="flex flex-between gap-1">
                    <Input type={'datetime-local'}
                           id={'departure-time'}
                           label={'Departure time:'}
                           value={inputDeparture}
                           onChangeInput={inputDepartureChange}/>
                    <Input type={'datetime-local'}
                           id={'arrival-time'}
                           label={'Arrival time:'}
                           value={inputArrival}
                           onChangeInput={inputArrivalChange}/>
                </div>
                <div className="flex flex-between gap-1">
                    <DropDown
                        stationList={stations}
                        id={'departure-list'}
                        onChangeDropdown={dropdownDepartureChange}
                        value={departureDropdown}
                    />
                    <DropDown
                        stationList={stations}
                        id={'arrival-list'}
                        onChangeDropdown={dropdownArrivalChange}
                        value={arrivalDropdown}
                    />
                </div>
                <div className="flex items-center justify-around mt-5">
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={ () => {
                            closeModal();
                            setDefaultTime()
                        }}>
                        Cancel
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        onClick={onAddRide}
                        >
                        Create
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default CreateRideModal;
