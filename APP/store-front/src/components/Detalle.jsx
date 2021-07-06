import React  from 'react'
import Rating from './Rating';
import {connect} from 'react-redux'
import {getReviewId} from '../redux/revDuck'

const Detalle = ({review, id, getReviewId }) => {

    const rate = review.calificacion
    var rating = ""
    
    if(rate === '5'){
        rating = 'Excelente!'
    }else if(rate === '4'){
        rating = 'Bueno'
    }else if(rate === '3'){
        rating = 'Regular'
    }else if(rate === '2'){
        rating = 'Malo'
    }else if(rate === '1'){
        rating = 'Muy Malo!'
    }

    React.useEffect(() => {
        if(id) getReviewId(id)
    },[getReviewId, id])

    return (
        <div className="card mt-4">
            <div className="card-body">
                <textarea
                    type="text"
                    className="form-control mb-2"
                    defaultValue={review.texto}
                />
                <div className="card-title">
                    Usuario: {review.usuario}
                </div>
                <p className="card-text">Calificación: {rating}</p>
                <Rating star={review.calificacion}/>
            </div>
        </div>
    )

}

Detalle.defaultProps = {
    review: {
        texto: '', calificacion: '', usuario: ''
    }
}

const mapStoreProps = (store, props) => {
    if(props.id) return { review: store.review.get[props.id] }
    return {}
}

const mapDispatchProps = (dispatch) => {
    return {
        getReviewId: (id) => dispatch(getReviewId(id))
    }
}

export default connect(mapStoreProps, mapDispatchProps)(Detalle)