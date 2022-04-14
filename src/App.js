import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {

  const[seDioClickEnBuscar, setSeDioClickEnBuscar] = useState(false);
  const[listaPokemones, setListaPokemones] = useState([]);
  
  const buscarNombrePokemon = (event) => {
    event.preventDefault();
    setSeDioClickEnBuscar(true);
  }
  
  useEffect( () => {
    axios.get( `https://pokeapi.co/api/v2/pokemon/?limit=807`)
    .then ( respuesta => {
      setListaPokemones( (listaPrev) => respuesta.data.results)
    })
    .catch( err => {
      console.log(err);
    });
  },[buscarNombrePokemon]);

  return (
    <div className="App">
      <form onSubmit={ (event) => buscarNombrePokemon(event)}>
        <button type='submit' className='botonBuscar'>
          Fetch Pokemon
        </button>
      </form>
      <h1>
        Pokemon List
      </h1>
      <div>
        {
          seDioClickEnBuscar?
          listaPokemones.map( (pokemon, indice) => {
            return(
              <li key={indice}>{pokemon.name}</li>
            );
          })
          :"Discover all 807 pokemon"
        }
      </div>
    </div>
  );
}

export default App;