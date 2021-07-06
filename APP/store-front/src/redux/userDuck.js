import axios from 'axios'

//data
const dataInicial = {
    usuario: null,
    mensaje: ''
}

//tipos
const USER_GET_SUCCES = 'USER_GET_SUCCES'
const USER_SESSION_SUCCES = 'USER_SESSION_SUCCES'
const USER_CLOSE_SESSION_SUCCES = 'USER_CLOSE_SESSION_SUCCES'

//reducers
export default function reducerUser (state = dataInicial, action) {
    switch(action.type){
        case USER_GET_SUCCES:
            return {...state, usuario: action.payload}
        case USER_SESSION_SUCCES:
            return {...state, usuario: action.payload}
        case USER_CLOSE_SESSION_SUCCES:
            return dataInicial
        default:
            return state
    }
}

//acciones
export const registrarUser = (user) => async (dispatch) => {
    try{
        const res = await axios.post(`http://localhost:3200/review/user/signUp`, user)
        
        dispatch({
            type: USER_GET_SUCCES,
            payload: res.data.auth
        })
    }catch(err){
        console.log(err)
    }
}

export const iniciaSesion = (user) => async (dispatch) => {
    try{
        const res = await axios.post(`http://localhost:3200/review/user/signIn`, user)
        dispatch({
            type: USER_SESSION_SUCCES,
            payload: res.data.auth
        })
    }catch(err){
        console.log(err)
    }
}

export const cerrarSesion = () => (dispatch) => {
    try{
        dispatch({
            type: USER_CLOSE_SESSION_SUCCES
        })
    }catch(err){
        console.log(err)
    }
}