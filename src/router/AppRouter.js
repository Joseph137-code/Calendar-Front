import React, {useEffect} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import LoginPage from '../components/auth/LoginPage';
import CalendarPage from '../components/calendar/CalendarPage';
import { startChecking } from '../reducers/authReducer';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import Loading from '../components/ui/Loading';


const AppRouter = () => {
    const dispatch = useDispatch();
    const {user, loading} = useSelector( state => state.auth);
    const {uid} = user

    useEffect(() => {
        
        dispatch( startChecking() );

    }, [dispatch])

    if (loading){
        return (
            <Loading/>
        )
    }
    

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        exact path="/Login"
                        component={LoginPage}
                        isAuthenticated={!!uid}
                    />

                    <PrivateRoute
                        exact path="/"
                        component={CalendarPage}
                        isAuthenticated={!!uid}
                    />  
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}

export default AppRouter
