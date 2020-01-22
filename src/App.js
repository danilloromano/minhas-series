import React  from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './header/header';
import Genres from './genres/genres';
import NewGenrer from './new-genrer/new-genrer';
import EditGenrer from './edit-genrer/edit-genrer';
import Series from './series/series';
import NewSeries from './new-series/new-series';
import InfoSeries from './info-series/info-series';

const Home = () => {
  return <h1> Home </h1>
}

function App() {
  return (
    <Router>
      <div>
        <Header/>
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/generos' exact component={Genres}/>
          <Route path='/generos/new' exact component={NewGenrer}/>
          <Route path='/generos/:id' exact component={EditGenrer}/>
          <Route path='/series' exact component={Series}/>
          <Route path='/series/new' exact component={NewSeries}/>
          <Route path='/series/:id' exact component={InfoSeries}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
