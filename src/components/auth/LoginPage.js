import React from 'react'
import {useForm} from '../../hooks/useForm'
import { useDispatch } from 'react-redux'
import {startLogin, startRegister} from '../../reducers/authReducer'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './login.css';

const MySwal = withReactContent(Swal)

const LoginPage = () => {

    const dispatch = useDispatch()
  
    const [ formValRegis, handleInputChangeRegis] = useForm({
        rName:"",
        rEmail:"",
        rPassword:"",
        rPassword1:""
    });

    const [ formValLogin, handleInputChangeLogin] = useForm({
        lEmail:"",
        lPassword:""
    });

    const {rName, rEmail, rPassword, rPassword1} = formValRegis;
    const {lEmail, lPassword} = formValLogin;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLogin(formValLogin))
    }

    const handleRegister = (e) => {
        e.preventDefault();

        if ( rPassword !== rPassword1 ) {
            return MySwal.fire({
                icon: 'error',
                title: 'Error!',
                text:'Las contraseñas deben de ser iguales' ,
              });
        }
        dispatch(startRegister(formValRegis))
      
    }


    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name= "lEmail"
                                value={lEmail}
                                onChange={handleInputChangeLogin}
                                autoComplete="off"
                            />
                        </div>
                  
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name= "lPassword"
                                value={lPassword}
                                onChange={handleInputChangeLogin}
                                autoComplete="off"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name= "rName"
                                value={rName}
                                onChange={handleInputChangeRegis}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name= "rEmail"
                                value={rEmail}
                                onChange={handleInputChangeRegis}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name= "rPassword"
                                value={rPassword}
                                onChange={handleInputChangeRegis}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name= "rPassword1"
                                value={rPassword1}
                                onChange={handleInputChangeRegis}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
