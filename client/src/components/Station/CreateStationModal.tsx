import React, {FC, useState} from "react";
import {useDispatch} from "react-redux";
import Input from "../Input";
import Modal from 'react-modal';
import {addStation} from "../../slice/stationSlice";
import {AppDispatch} from "../../store";
import {IStation} from "../../models/IStation";

export interface ModalProps {
    closeModal: () => void
    modalIsOpen: boolean
    customStyles: {content: any}
}

const CreateStationModal: FC<ModalProps> = ({closeModal, modalIsOpen, customStyles}) => {
    const [input, setInput] = useState<string>('')
    const dispatch = useDispatch<AppDispatch>()

    const inputChange = (value: string) => {
        setInput(value)
    }

    const onAddStation = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if(!input) {return}
        dispatch(addStation({name: input} as IStation))
        setInput('')
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
            <h1 className="text-center font-bold text-lg">Create Station</h1>
            <form className="bg-white rounded px-8 pt-6 pb-6">
                <Input type={'text'}
                       placeholder={'Enter the name'}
                       id={'station-name'}
                       label={'Station name:'}
                       value={input}
                       onChangeInput={inputChange}/>
                <div className="flex items-center justify-around">
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={ () => {
                            closeModal();
                            setInput('');
                        }}>
                        Cancel
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        onClick={onAddStation}>
                        Create
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default CreateStationModal;
