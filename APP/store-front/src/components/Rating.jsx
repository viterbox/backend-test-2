import React from 'react'
import { FaStar } from 'react-icons/fa'

const Rating = ({star}) => {

    const total = Number(star)

    return (
        <div>
            {
             [...Array(total)].map((e, index) => {
                 return <FaStar key={index} color={total <= 5 ? '#ffc107' : '#e4e5e9'}/>
             })   
            }
        </div>
    )
}

export default Rating
