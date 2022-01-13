import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authLogout } from '../../reducers/authReducer'
import { eventLogout } from '../../reducers/calendarReducer'


const Navbar = () => {
    const dispatch = useDispatch()
    const {user} = useSelector( state => state.auth);
    const {name} = user

    const handleLogOut = () => {
        dispatch(authLogout());
        dispatch(eventLogout())
    };


    return (
        <div className="navbar navbar-dark bg-secondary mb-4">
            <span className="navbar-brand">
               <h3>{name}</h3>
            </span>
        
            <button 
                className="btn btn-outline-danger"
                onClick={handleLogOut}
            >
                <i className="fas fa-sign-out-alt"></i>
                <span> Salir</span>
            </button>
        </div>
    )
}

export default Navbar
