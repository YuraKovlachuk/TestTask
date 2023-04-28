import {ChangeEvent, FC} from "react";
import {IStation} from "../models/IStation";

export interface DropDownProps {
    stationList: IStation[]
    label?: string,
    onChangeDropdown: (value: string) => void,
    id: string,
    value?: string
}

const DropDown: FC<DropDownProps> = ({stationList, label,id, onChangeDropdown, value}) => {

    const options = stationList.map((station) => {
        return <option key={station.id} value={station.id}>{station.name}</option>
    })

    return (
        <>
            <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">{label}</label>
            <select id={id}
                    value={value}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => onChangeDropdown(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    defaultValue={'all'}>
                <option value="all">Choose a station</option>
                {options}
            </select>
        </>
    );
};

export default DropDown;
