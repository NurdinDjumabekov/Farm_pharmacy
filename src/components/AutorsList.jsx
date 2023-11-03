import React from 'react'
import { useSelector } from 'react-redux'

function AutorsList({ list })
{
    return (
        <div>
            <ul>
                {list.map(a => <li key={a.id}>{a.first_name + " " + a.last_name}</li>)}
            </ul>
        </div>
    )
}

export default AutorsList