import React, {useState} from 'react'
import { Button, Modal } from 'react-bootstrap'
import {connect} from 'react-redux'
import {obtenerReviews, saveReview, eliminateReview, updateReview, controlModal, obtenerMyReviews} from '../redux/revDuck'
import { FaStar } from 'react-icons/fa'

const CrudReviews = ({reviews, modal, reload, saveReview, controlModal, updateReview, obtenerReviews, eliminateReview, user, obtenerMyReviews, user_rev}) => {

    const [rev, setRev] = useState({id: null, usuario: '', texto: '', calificacion: ''})

    React.useEffect(() => {
        obtenerMyReviews(rev)
    }, [obtenerMyReviews, rev])

    const rate = Number(rev.calificacion)
    var rating = ""
    if(rate === 5){
        rating = 'Excelente!'
    }else if(rate === 4){
        rating = 'Bueno'
    }else if(rate === 3){
        rating = 'Regular'
    }else if(rate === 2){
        rating = 'Malo'
    }else if(rate === 1){
        rating = 'Muy Malo!'
    }

    const guardarReview = () => {
        if(rev.id) {
            updateReview(rev.id, rev)
        }else{
            saveReview(rev)
        }        
    }

    const botonEditar = (obj) => {
        controlModal(true)
        setRev({...obj, id: obj._id})
    }

    React.useEffect(() => {
        if(!modal){
            setRev({id: null, usuario: user.nombre, texto: '', calificacion: ''})
        }
    },[modal, setRev])

    React.useEffect(() => {
        if(reload){
            obtenerMyReviews(rev)
        }
    },[reload, obtenerMyReviews, rev])
    
    return (
        <div className="container mt-5">
            <h1 className="text-center">Mis Ordenes</h1>
            <hr/>
            <div className="row">
                <div className="col-md-12">
                    <ul className="list-group">
                        {
                            user_rev.map(item => (
                                <li className="list-group-item" key={item._id}>
                                    <span className="lead">{item.texto}</span>
                                    <button 
                                        className="btn btn-sm btn-danger float-right mx-2" onClick={() => eliminateReview(item._id)}>Eliminar</button>
                                        <button 
                                        className="btn btn-sm btn-warning float-right" onClick={() => botonEditar(item)}>Editar
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                    <br/>
                    <button className="btn btn-primary float-right" onClick={() => controlModal(true)}>Agregar</button>
                </div>
            </div>

            <Modal show={modal} onHide={() => controlModal(false)} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{ rev.id ? 'Nueva' : 'Editar'} Reseña</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                     <div className="card">
                            <div className="card-body">
                                <textarea 
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder="Ingrese reseña"
                                    onChange={(e) => setRev({...rev, texto: e.target.value})}
                                    value={rev.texto}
                                />
                                <p className="card-text">Calificación: {rating}</p>
                                {
                                    [...Array(5)].map((e, index) => {
                                        
                                        const valorRate = index+1

                                        return (
                                            <label key={index}>
                                                <input 
                                                type="radio" 
                                                name="rating" value={valorRate} onClick={(e) => setRev({...rev, calificacion: valorRate})}/>
                                                <FaStar 
                                                className="star" 
                                                key={index}
                                                color={valorRate <= rev.calificacion ? '#ffc107' : '#e4e5e9'}
                                                />
                                            </label>
                                        
                                        )
                                    })   
                                }
                            </div>
                        </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => controlModal(false)}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={() => guardarReview()}>
                       Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

const mapStoreProps = (store) => {
    return {
        reviews: store.review.results,
        user_rev: store.review.user_rev,
        modal: store.review.modal,
        reload: store.review.reload,
        user: store.user.usuario
    }
}

const mapDispatchProps = (dispatch) => {
    return {
        obtenerReviews: () => dispatch(obtenerReviews()),
        saveReview: (review) => dispatch(saveReview(review)),
        eliminateReview: (id) => dispatch(eliminateReview(id)),
        updateReview: (id, review) => dispatch(updateReview(id, review)),
        controlModal: (bool = false) => dispatch(controlModal(bool)),
        obtenerMyReviews: (review) => dispatch(obtenerMyReviews(review))
    }
}

export default connect(mapStoreProps,mapDispatchProps)(CrudReviews)