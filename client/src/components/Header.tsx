import {FC, useState} from "react";
import CreateStationModal from "./Station/CreateStationModal";
import CreateRideModal from "./Ride/CreateRideModal";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const Header: FC = () => {
    const [stationModalIsOpen, setStationIsOpen] = useState<boolean>(false);
    const [rideModalIsOpen, setRideIsOpen] = useState<boolean>(false);

    const openRideModal = () => {
        setRideIsOpen(true);
    }

    const openStationModal = () => {
        setStationIsOpen(true);
    }

    const closeStationModal = () => {
        setStationIsOpen(false);
    }

    const closeRideModal = () => {
        setRideIsOpen(false);
    }

    return (
        <div className="flex justify-between">
            <button type="button"
                    className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    onClick={openStationModal}>
                Create Station
            </button>
            <CreateStationModal modalIsOpen={stationModalIsOpen} closeModal={closeStationModal} customStyles={customStyles}/>
            <button type="button"
                    className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    onClick={openRideModal}
            >Create Ride
            </button>
            <CreateRideModal modalIsOpen={rideModalIsOpen} closeModal={closeRideModal} customStyles={customStyles}/>
        </div>


    );
};

export default Header;
