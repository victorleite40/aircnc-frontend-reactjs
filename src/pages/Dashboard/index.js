import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api'

import './styles.css';

export default function Dashboard() {
    const [spots, setSpots] = useState([]);

    useEffect(() => { // toda vez que o array [] for alterado, a função useEffect() será executada novamente
        async function loadSpots() {
            const user_id = localStorage.getItem('user') // retorna o id salvo no local
            const response = await api.get('/dashboard', { // puxa os spots criados de acordo com o ID de usuario
                headers: { user_id }
            });

            setSpots(response.data)
        }

        loadSpots();
    }, []);

    return (
    <>

    <ul className="spot-list">
        {spots.map(spot => (
            <li key={spot._id}>
                <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
                <strong>{spot.company}</strong>
                <span>{spot.price ? `R$${spot.price}/dia` : `FREE`}</span>
            </li>
        ))}
    </ul>

    <Link to="/new">
        <button className="btn" >Cadastrar novo Spot</button>
    </Link>

    </>
    )
}