import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Badge } from 'reactstrap';

const InfoSeries = ({ match }) => {
    const [form, setForm] = useState({name:''});
    const [data, setData] = useState({});
    const [putSuccess, setPutSuccess] = useState(false);
    const [mode, setMode] = useState('INFO');
    const [genreId, setGenreId] = useState();
    const [genreOption, setGenreOption] = useState([]);

    const onChange = field => event => {
        setForm({ ...form, [field]: event.target.value });
    }

    const onChangeGenre = event => {
        setGenreId(event.target.value);
    }

    const selectStatus = value => () => {
        setForm({ ...form, status: value });
    }

    useEffect(() => {
        axios.get(`/api/series/${match.params.id}`)
            .then(res => {
                setData(res.data);
                setForm(res.data);
            });
    }, [match.params.id]);

    useEffect(() => {
        axios.get('/api/genres')
            .then(res => { setGenreOption(res.data.data) });
    }, [data]);

    const customHeader = {
        'height': '50vh',
        'minHeight': '500px',
        'backgroundImage': `url('${form.background}')`,
        'backgroundSize': 'cover',
        'backgroundPosition': 'center',
        'backgroundRepeat': 'no-repeat',
    }

    const save = () => {
        setPutSuccess(false);
        axios.put(`/api/series/${match.params.id}`, { ...form, genre_id: genreId })
             .then(res => { 
                 setPutSuccess(true) 
            })
             .catch(error => console.log(error))
    }

    const HeaderImage = () => {
        const {name, poster, genre, status} = form;
        return (
            <header style={customHeader}>
                <div className='h-100' style={{ 'background': 'rgba(0,0,0,0.7)' }}>
                    <div className='h-100 container'>
                        <div className='row h-100 align-items-center'>
                            <div className='col-3'>
                                <img alt={name} className='img-fluid img-thumbnail' src={poster} />
                            </div>
                            <div className='col-8'>
                                <h1 className='font-whight-light text-white'>{name}</h1>
                                <div className='lead text-white'>
                                   { status === 'WATCHED' && <Badge color='success'>Assitido</Badge> }
                                   { status === 'FOR_WATCH' && <Badge color='warning'>Para Assitir</Badge> }
                                   <span className='ml-3'>Genero: {genre}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
    
    return (
        <div>
            <HeaderImage />
            <div className='container'>
                <button className='btn btn-primary mt-3 mb-3' onClick={() => setMode('EDIT')}>Editar</button>
            </div>
            {
                mode === 'EDIT' &&
                <div className='container'>
                    <h1> Info Serie </h1>
                    <Link to='/series' ><p> Lista de Series </p></Link>
                    <div className='mb-3'>
                        <button className='btn btn-danger' onClick={() => setMode('INFO')}>Cancelar</button>
                    </div>
                    <form>
                        <div className='form-group'>
                            <label htmlFor='name'>Nome</label>
                            <input type='text' onChange={onChange('name')} className='form-control' id='name' placeholder='Nome' value={form.name} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='comments'>Comentarios</label>
                            <input type='text' onChange={onChange('comments')} className='form-control' id='comments' placeholder='comments' value={form.comments} />
                        </div>
                        <div className='form-group'>
                            <label>Genero</label>
                            <select className='form-control' onChange={onChangeGenre} value={genreId}>
                                { genreOption.map(genre => <option key={genre.id} value={genre.id}> {genre.name} </option>)}
                            </select>
                        </div>
                        <div className='form-check'>
                            <input className='form-check-input' type='radio' onChange={selectStatus('WATCHED')} checked={form.status === 'WATCHED'}  name='status' id='watched' value='ASSISTIDO' />
                            <label className='form-check-label' htmlFor='watched'> Assistido </label>
                        </div>
                        <div className='form-check'>
                            <input className='form-check-input' type='radio' onChange={selectStatus('FOR_WATCH')} checked={form.status === 'FOR_WATCH'}  name='status' id='forWhatch' value='PARA_ASSISTIR' />
                            <label className='form-check-label' htmlFor='forWhatch'> Para Assitir </label>
                        </div>
                        <div>
                            { putSuccess && <p>Serie salva com sucesso!</p> }
                        </div>
                        <button onClick={save} type='button' className='btn btn-primary mb-3 mt-3'>Salvar</button>
                    </form>
                </div>
            }
        </div>
    )
}

export default InfoSeries;