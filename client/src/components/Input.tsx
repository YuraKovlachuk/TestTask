import {ChangeEvent, FC} from "react";


export interface InputProps {
    type: string
    placeholder?: string
    id: string
    label: string,
    value: string | number,
    onChangeInput: (value: any) => void,
    customClass?: string
    min?: string
}

const Input: FC<InputProps> = ({type, label, id, placeholder, onChangeInput, value, customClass, min}) => {
    return (
        <div className="mb-4 ">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
                {label}
            </label>
            <input
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeInput(e.target.value)}
                value={value}
                min={min}
                className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" + customClass}
                id={id} type={type} placeholder={placeholder}/>
        </div>
    );
};

export default Input;
