import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Badge } from 'reactstrap'


const InfoSeries = ({ match }) => {
    const [form, setForm] = useState({});
    const [data, setData] = useState({});
    const [putSuccess, setPutSuccess] = useState(false);
    const [mode, setMode] = useState('INFO');
    const [genreOption, setGenreOption] = useState([]);

    const onChange = field => event => {
        setForm({
            ...form,
            [field]: event.target.value
        });
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
            .then(res => {
                setGenreOption(res.data.data);
                const genres = res.data.data;
                const finded = genres.find(value => data.genre === value.name);
                if (finded && form) setForm(({
                    ...form, genre_id: finded.id
                }));
            });
    }, [data, form]);

    const customHeader = {
        'height': '50vh',
        'minHeight': '500px',
        'backgroundImage': `url('${form.background}')`,
        'backgroundSize': 'cover',
        'backgroundPosition': 'center',
        'backgroundRepeat': 'no-repeat',
    }

    const HeaderImage = () => {
        const {name, poster, genre} = form;
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
                                    <Badge color='success'>Assitido</Badge>
                                    <Badge color='warning'>Para assistir</Badge>
                                    <span>Genero: {genre}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
 
    const save = () => {
        axios.put(`/api/series/${match.params.id}`, { form })
            .then(res => { setPutSuccess(true) })
            .catch(error => console.log(error))
    }
    
    return (
        <div>
            <HeaderImage />
            <div>
                <button className='btn btn-primary' onClick={() => setMode('EDIT')}>Editar</button>
            </div>
            {
                mode === 'EDIT' &&
                <div className='container'>
                    <h1> Info Serie </h1>
                    <Link to='/series' ><p> Lista de Series </p></Link>
                    <div>
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
                            <label htmlFor='genre'>Genero</label>
                            <select className='form-control' name='genre' onChange={onChange('genre_id')} value={genreOption}>
                                { genreOption.map(genre => <option key={genre.id} value={genre.id}> {genre.name} </option>)}
                            </select>
                        </div>
                        <div className='form-check'>
                            <input className='form-check-input' type='radio' name='status' id='watched' value='ASSSISTIDO' />
                            <label className='form-check-label' htmlFor='watched'> Assistido </label>
                        </div>
                        <div className='form-check'>
                            <input className='form-check-input' type='radio' name='status' id='forWhatch' value='PARA_Assistir' />
                            <label className='form-check-label' htmlFor='forWhatch'> Para Assitir</label>
                        </div>
                        <div>
                            {putSuccess && <p>Serie salva com sucesso!</p>}
                        </div>
                        <button onClick={save} type='button' className='btn btn-primary'>Salvar</button>
                    </form>
                </div>
            }
        </div>
    )
}

export default InfoSeries;