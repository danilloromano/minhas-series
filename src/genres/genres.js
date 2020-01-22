import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';

const Genres = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      axios
        .get('/api/genres')
        .then(res => setData(res.data.data));
    },[]);

    const deleteData = (id) => {
        axios
            .delete(`/api/genres/${id}`)
            .then(res => {
                const filteredData = data.filter(item => item.id !== id);
                setData(filteredData);
            })
    }

    const renderRow = (item) => {
        return (
            <tr key={item.id}>
                <th scope='row'>{item.id}</th>
                <td>{item.name}</td>
                <td><button className='btn btn-danger' onClick={() => deleteData(item.id)}> Remover </button></td>
                <td><Link className='btn btn-secondary' to={`/generos/${item.id}`}> Editar </Link></td>
            </tr>
        );
    }

    const AlertData = () => {
        return (
            <div className='alert alert-warnig' role='alert'>
                Not have data inputed!
            </div>
        );
    }

    return (
        <div className='container'>
            <h1> Genres </h1>
            <Link to='/generos/new' ><p> Novo Generos </p></Link>
            { !data.length ? <AlertData /> : 
                <Table className='table table-dark'>
                    <thead>
                        <tr>
                        <th scope='col'>ID</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(renderRow)}
                    </tbody>
                </Table>
            }
        </div>
    )
}

export default Genres;