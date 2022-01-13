import React from 'react';
import { useDispatch } from 'react-redux';
import { modalOpening} from '../../reducers/pruebaReducer'


export const AddNewFab = () => {

    const dispatch = useDispatch();

    const handleClickNew = () => {
        dispatch( modalOpening() );
        //dispatch( uiOpenModal() );
    }


    return (
        <button
            className="btn btn-primary fab"
            onClick={ handleClickNew }
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}