import axios from 'axios'

//data
const dataInicial = {
    results: [],
    user_rev: [],
    get: {},
    mensaje: '',
    modal: false,
    reload: false

}

//tipos
const ALL_REV_SUCCES = "ALL_REV_SUCCES"
const MY_REV_SUCCES = "MY_REV_SUCCES"
const ID_REV_SUCCES = "ID_REV_SUCCES"
const SAVE_REV_SUCCES = "SAVE_REV_SUCCES"
const DELETE_REV_SUCCES = "DELETE_REV_SUCCES"
const UPDATE_REV_SUCCES = "UPDATE_REV_SUCCES"
const MODAL_REVIEW = "MODAL_REVIEW"
const RELOAD_REVIEW = "RELOAD_REVIEW"

const updateReviewGet = (state, review) => {
    return {
        ...state.get,
        [review._id]: review
    }
}

//reducers
export default function reviewReducer(state = dataInicial, action){
    switch(action.type){
        case ALL_REV_SUCCES:
            return {...state, results: action.payload}
        case MY_REV_SUCCES:
            return {...state, user_rev: action.payload}
        case ID_REV_SUCCES:
            return {...state, get: updateReviewGet(state, action.payload)}
        case SAVE_REV_SUCCES:
            return {...state, get: updateReviewGet(state, action.payload.data), mensaje: action.payload.mensaje}
        case DELETE_REV_SUCCES:
            return {...state, mensaje: action.payload}
        case UPDATE_REV_SUCCES:
            return {...state, get: updateReviewGet(state, action.payload)}
        case MODAL_REVIEW:
            return {...state, modal: action.payload}
        case RELOAD_REVIEW:
            return {...state, reload: action.payload}
        default:
            return state
    }
}

//acciones
export const obtenerReviews = (url = "http://localhost:3200/review/store/all") => async (dispatch) => {
    try{
        const res = await axios.get(url)
        dispatch({
            type: ALL_REV_SUCCES,
            payload: res.data
        })

        dispatch({
            type: RELOAD_REVIEW,
            payload: false
        })

    }catch(err){
        console.log(err)
    }
}

export const getReviewId = (id) => async (dispatch) => {
    try{
        const res = await axios.get(`http://localhost:3200/review/store/get/${id}`)
        dispatch({
            type: ID_REV_SUCCES,
            payload: res.data
        })
    }catch(err){
        console.log(err)
    }
}

export const saveReview = (rev) => async (dispatch) => {
    try{
        const res = await axios.post(`http://localhost:3200/review/store/save`, rev)
        dispatch({
            type: SAVE_REV_SUCCES,
            payload: res
        })

        dispatch({
            type: MODAL_REVIEW,
            payload: false
        })

        dispatch({
            type: RELOAD_REVIEW,
            payload: true
        })

    }catch(err){
        console.log(err)
    }
}

export const eliminateReview = (id) => async (dispatch) => {
    try{
        const res = await axios.delete(`http://localhost:3200/review/store/delete/${id}`)
        dispatch({
            type: DELETE_REV_SUCCES,
            payload: res.data

        })

        dispatch({
            type: RELOAD_REVIEW,
            payload: true
        })

    }catch(err){
        console.log(err)
    }
}

export const updateReview = (id, rev) => async dispatch => {
    try{
        const res = await axios.put(`http://localhost:3200/review/store/update/${id}`, rev)
        dispatch({
            type: UPDATE_REV_SUCCES,
            payload: res.data
        })

        dispatch({
            type: MODAL_REVIEW,
            payload: false
        })

        dispatch({
            type: RELOAD_REVIEW,
            payload: true
        })

    }catch(err){
        console.log(err)
    }
}

export const controlModal = (bool) => dispatch => {
    dispatch({
        type: MODAL_REVIEW,
        payload: bool
    })
}

export const obtenerMyReviews = (rev) => async (dispatch) => {
    try{
        const res = await axios.post(`http://localhost:3200/review/store/get/myreviews`, rev)
    
        dispatch({
            type: MY_REV_SUCCES,
            payload: res.data
        })

        dispatch({
            type: RELOAD_REVIEW,
            payload: false
        })

    }catch(err){
        console.log(err)
    }
}