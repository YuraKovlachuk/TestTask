import {FC} from "react";
import {IRide} from "../../models/IRide";
import moment from 'moment'

export interface RideListItemProp {
    ride: IRide
}

const RideListItem: FC<RideListItemProp> = ({ride}) => {

    return (
        <div className="p-10 ">
            <div className="max-w-full bg-white flex flex-col rounded overflow-hidden shadow-lg">
                <div className="flex flex-row items-baseline flex-nowrap bg-gray-100 p-2 justify-between">
                    <div className="flex">
                        <h1 className="ml-2 uppercase font-bold text-gray-500">departure</h1>
                        <p className="ml-2 font-normal text-gray-500">
                            {moment(ride.departureTime).format("dddd Do MMM")}
                        </p>
                    </div>
                    <div className="flex">
                        <h1 className="ml-2 uppercase font-bold text-gray-500">arrival</h1>
                        <p className="ml-2 font-normal text-gray-500">
                            {moment(ride.arrivalTime).format("dddd Do MMM")}
                        </p>
                    </div>
                </div>
                <div className="mt-2 flex sm:flex-row mx-6 sm:justify-around flex-wrap ">
                    <div className="flex flex-col p-2">
                        <p className="font-bold">{moment(ride.departureTime).format("h:mm a")}</p>
                        <p className="text-gray-500">{ride.departureStation.name}</p>
                    </div>
                    <div className="flex flex-col flex-wrap p-2">
                        <p className="font-bold">{moment(ride.arrivalTime).format("h:mm a")}</p>
                        <p className="text-gray-500">{ride.arrivalStation.name}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RideListItem;
