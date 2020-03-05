import React, { useState } from 'react';
import api from '../../services/api';

export default function Login({ history }) {
    const [email, setEmail] = useState('');

    async function handleSubmit(event) {
      event.preventDefault(); // previni o funcinamento padrao de form (enviar para outra tela)
  
      const response = await api.post('/sessions', { email }); // envia o email inserido para a api
      
      const { _id } = response.data;
  
      localStorage.setItem('user', _id); // armazena o ID de usuario no banco de dados local do navegador
    
      history.push('/dashboard'); // envia o usuaria para a tela de dashboard
    }

    return (
        <>

        <p>
          Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
        </p>

        <form onSubmit={handleSubmit}> 
          <label htmlFor="email">E-MAIL *</label>
          <input 
            type="email" 
            id="email" 
            placeholder="Seu melhor email"
            value={email}
            onChange={event => setEmail(event.target.value)} // Le info recebida e envia para a função handleSubmit()
          />

          <button className="btn" type="submit">Entrar</button>
        </form>
        
        </>
    )
}