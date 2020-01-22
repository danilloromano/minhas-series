import React, {useState, useEffect}from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

const EditGenrer = ({ match }) => {
    const [name, setName] = useState('');
    const [putSuccess, setPutSuccess] = useState(false);

    const onChange = (event) => {
        setName(event.target.value)
    }

    useEffect(() => {
        axios.get(`/api/genres/${match.params.id}`)
            .then(res => {
                setName(res.data.name)
            });
    }, [match.params.id])

    const save = () => {
        axios.put(`/api/genres/${match.params.id}`, {name})
        .then(res => {setPutSuccess(true)})
        .catch(error => console.log(error))
    }

    return (
        <div className='container'>
            <h1> Editar Genero {name}</h1>
            <Link to='/generos' ><p> Lista de Generos </p></Link>
            <form>
                <div className='form-group'>
                    <label htmlFor='name'>Nome</label>
                    <input type='text' onChange={onChange} className='form-control' id='name' placeholder='Nome' value={name}/>
                </div>
                <div>
                    {putSuccess ? <p>Genero salvo com sucesso!</p> : <p></p>}
                </div>
                <button onClick={save} type='button' className='btn btn-primary'>Salvar</button>
            </form>
        </div>
    )
}

export default EditGenrer;