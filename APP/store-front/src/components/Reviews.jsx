import React, {useState} from 'react'
import Detalle from './Detalle'
import {connect} from 'react-redux'
import {obtenerReviews} from '../redux/revDuck'


const Reviews = ({reviews, obtenerReviews}) => {

    React.useEffect(() => {
        obtenerReviews()
    }, [obtenerReviews])

    const [id, setId] = useState(null)

    return (
        <div className="container mt-5">
            <h1 className="text-center">Reseñas</h1>
            <hr/>
            <div className="row">
                <div className="col-md-6">
                    <h4 className="text-center" >Lista Reseñas</h4>
                    <br/>
                    <ul className="list-group mt-3">
                        {
                            reviews.map(item => (
                                <li key={item._id} className="list-group-item">
                                    <span className="lead">{item.texto}</span>
                                <button
                                className="btn btn-dark btn-sm float-right"
                                onClick={() => setId(item._id)}
                                >Info</button>
                                </li>
                                
                            ))
                        }
                    </ul>
                </div>
                <div className="col-md-6">
                    <h4 className="text-center" >Detalle Reseña</h4>
                    <Detalle id={id}></Detalle>
                </div>
            </div>
        </div>
        
    )
}

const mapStoreProps = (store) => {
    return {
        reviews: store.review.results
    }
}

const mapDispatchProps = (dispatch) => {
    return {
        obtenerReviews: () => dispatch(obtenerReviews())
    }
}

export default connect(mapStoreProps, mapDispatchProps)(Reviews)
