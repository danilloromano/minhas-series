import React, {useState}from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

const NewGenrer = () => {

    const [name, setName] = useState('');
    const [postSuccess, setPostSuccess] = useState(false);

    const onChange = (event) => {
        setName(event.target.value)
    }

    const save = () => {
        axios.post('/api/genres', {name})
        .then(res => {setPostSuccess(true)})
        .catch(error => console.log(error))
    }

    return (
        <div className='container'>
            <h1> Novo Genero {name}</h1>
            <Link to='/generos' ><p> Lista de Generos </p></Link>
            <form>
                <div className='form-group'>
                    <label htmlFor='name'>Nome</label>
                    <input type='text' onChange={onChange} className='form-control' id='name' placeholder='Nome'/>
                </div>
                <div>
                    {postSuccess ? <p>Genero salvo com sucesso!</p> : <p></p>}
                </div>
                <button onClick={save} type='button' className='btn btn-primary'>Salvar</button>
            </form>
        </div>
    )
}

export default NewGenrer;