import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const TravelBook = () => {
    const [travelBook, setTravelBook] = useState([])
    const [id, setId] = useState('')
    const fetchData = async () => {
        const {data} = await axios.get(`http://localhost:5000/api/travels`)
        setTravelBook(data.travels)
    }

    const deleteHandler = async (e)=>{
        e.preventDefault();
        await axios.delete(`http://localhost:5000/api/travels/${id}`)
        fetchData()
    }
    useEffect(()=>{
        fetchData()
    }, [])
    return (
        <div>
            {travelBook.map(tb => (
                <div key={tb.id} className="card mb-3 mt-3">
                    <img src={tb.image} className="card-img-top" alt={tb.title}/>
                    <div className="card-body">
                        <h5 className="card-title">{tb.title}</h5>
                        <p className="card-text">{tb.description}</p>
                        <div className='d-flex justify-content-start'>
                            <Link className='btn btn-primary' to={`/update/${tb.id}`}>Update</Link>
                            <form onSubmit={deleteHandler}>
                                <button onClick={()=>setId(tb.id)} type='submit' className='btn btn-danger mx-2'>Delete</button>
                            </form>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    ) 
}

export default TravelBook