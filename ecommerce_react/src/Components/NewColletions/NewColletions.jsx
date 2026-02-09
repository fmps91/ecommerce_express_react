import React from 'react'
import './NewColletions.css'
import Item from '../Item/Item'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
function NewColletions() {

    const [new_collection,setNew_collection] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:4000/newcollections')
        .then((e)=>{
            setNew_collection(e.data.products)
        })
    },[])

    return (
        <div className='newcolletions'>
            <h1>NEW COLLECTIONS</h1>
            <hr />
            <div className="collections">
                {new_collection.map((item, i) => {
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                })}
            </div>
        </div>
    )
}

export default NewColletions