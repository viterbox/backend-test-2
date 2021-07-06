import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import Logo from '../img/logowhite.svg'
import {connect} from 'react-redux'
import {cerrarSesion} from '../redux/userDuck'

const Navbar = ({user, cerrarSesion}) => {

    const btnLogout = e => {
        e.preventDefault()
        cerrarSesion()
    }

    return (
        <div className="navbar navbar-primary bg-primary">
            <Link className="navbar-brand" to="/">
                <img width="90px" height="auto" className="img-responsive" src={Logo} alt="logo"/>
            </Link>
            <div>
                <div className="d-flex">
                    { user && (
                        <>
                            <NavLink className="btn btn-primary mr-2" to="/myreviews" exact>
                                Mis Ordenes
                            </NavLink>
                            <NavLink className="btn btn-primary mr-2" to="/reviews" exact>
                                Reseñas
                            </NavLink>
                        </>
                    )}
                    
                    { user ? (       
                        <NavLink className="btn btn-primary mr-2" to="/#" onClick={e => btnLogout(e)} exact>
                            Logout
                        </NavLink>           
                    ) : (
                        <NavLink className="btn btn-primary mr-2" to="/login" exact>
                            Login
                        </NavLink>
                    )}
                </div>
            </div>
        </div>
    )
}

const mapStoreProps = (store) => {
    return {
        user: store.user.usuario
    }
}

const mapDispatchProps = (dispatch) => {
    return {
        cerrarSesion: () => dispatch(cerrarSesion())
    }
}

export default connect(mapStoreProps, mapDispatchProps)(Navbar)
