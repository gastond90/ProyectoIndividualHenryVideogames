import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import {Detail} from './components/Detail';
import {CreateGame} from './components/CreateGame';
import PageNotFound from './components/PageNotFound';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
      <Route path = '/' element = {<LandingPage/>} />
      <Route  path = '/home' element = {<Home/>}/>
      <Route  path='/home/:idVideogame' element = {<Detail/>}/>
      <Route  path='/videogame' element={<CreateGame/>}/>
      <Route path='*' element={<PageNotFound/>}/>
      
      
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
