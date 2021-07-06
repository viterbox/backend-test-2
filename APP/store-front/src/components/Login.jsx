import React, {useState} from 'react'
import {connect} from 'react-redux'
import {registrarUser, iniciaSesion} from '../redux/userDuck'
import {withRouter} from 'react-router-dom'


const Login = ({user, mensaje, registrarUser, iniciaSesion, history}) => {

    const [banderaRegistro, setBanderaRegistro] = useState(true)
    const [aviso, setAviso] = useState(false)
    const [datos, setDatos] = useState({nombre: '', correo: '', password: ''})

    const validarUsuario = () => {

        if(banderaRegistro){
            registrarUser(datos)
            if(mensaje){
                setAviso(true)
            }
            
        }else{
            iniciaSesion(datos)
            //this.props.history.push('/reviews')
        }
        
    }

    const cambiarOpcion = () => {
        setBanderaRegistro(!banderaRegistro)
        setAviso(false)
        setDatos({nombre: '', correo: '', password: ''})
    }

    React.useEffect(() => {
        if(user){
            history.push('/reviews')
        }
    }, [user, history])

    return (
        <div className="container">
            <div className="mt-5">
                <h3 className="text-center">
                    {
                        banderaRegistro ? 'Registrate' : 'Inicia Sesión'
                    }
                </h3>
                <hr/>
                { aviso && (
                    <div className="row justify-content-center">
                        <div className="col-md-4 alert alert-danger" role="alert" >
                            Ya existe un Usuario con ese correo
                        </div>
                    </div>
                ) }
                <div className="row justify-content-center">
                    <div className="col-md-4 px-0">
                        {banderaRegistro && (
                            <input 
                                type="text"
                                className="form-control mb-2"
                                placeholder="Ingrese su Nombre"
                                onChange={(e) => setDatos({...datos, nombre: e.target.value})}
                                value={datos.nombre}
                            />
                        )}
                            <input 
                                type="email"
                                className="form-control mb-2"
                                placeholder="Ingrese su correo"
                                onChange={(e) => setDatos({...datos, correo: e.target.value})}
                                value={datos.correo}
                            />
                            <input
                                type="password"
                                className="form-control mb-2"
                                placeholder="Ingrese su contraseña"
                                onChange={(e) => setDatos({...datos, password: e.target.value})}
                                value={datos.password}
                            />
                            <button className="btn btn-dark btn-lg btn-block" type="button" onClick={() => validarUsuario()}>
                                {
                                    banderaRegistro ? 'Resgitrarse' : 'Acceder'
                                }
                            </button>
                            <button className="btn btn-info btn-sm btn-block" type="button"
                                onClick={() => cambiarOpcion()}
                            >
                            {
                                banderaRegistro ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'
                            }
                            </button>
                    
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStoreProps = (store) => {
    return {
        user: store.user.usuario,
        mensaje: store.user.mensaje
    }
}

const mapDispatchProps = (dispatch) => {
    return {
        registrarUser: (usuario) => dispatch(registrarUser(usuario)),
        iniciaSesion: (usuario) => dispatch(iniciaSesion(usuario))
    }
}

export default connect(mapStoreProps, mapDispatchProps)(withRouter(Login))
