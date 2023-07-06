import { useEffect, useState } from 'react';
import './App.css';

import "./components/css/Card.css";
import { getAllPokemon,getPokemon } from './utils/pokemon';
import { Card } from './components/Card/Card';
import { Navbar } from './components/Navbar/Navbar';

function App() {
  const initialAPI = "https://pokeapi.co/api/v2/pokemon";

  // loading中を管理するstate
  const [loading, setLoading] = useState(true) //最初はloadingしているのでtrue
  const [pokemonData, setPokemonData] = useState([])
  const [nextURL,setNextURL] = useState("")
  const [prevURL,setPrevURL] = useState("")

  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンデータを取得
      let res = await getAllPokemon(initialAPI)
      // 各ポケモンのデータを取得
      loadPokemon(res.results);

      console.log(res.next);
      console.log(res.prev);

      setNextURL(res.next)
      setPrevURL(res.previous)// 最初はnullになる

      // loadingが終わったらfalseに変える
      setLoading(false)
    }
    fetchPokemonData();
  }, [])

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url)
        return pokemonRecord
      })
    )
    setPokemonData(_pokemonData)
  }

  // console.log(pokemonData);

  const onClickPrev = async () => {
    if (!prevURL) return; // prevURLに何も格納されない（null or undefined）時はreturn
    setLoading(true)
    let data = await getAllPokemon(prevURL)
    console.log(data);
    await loadPokemon(data.results)
    setNextURL(data.next)
    setPrevURL(data.previous)
    setLoading(false)
  }

  const onClickNext = async() => {
    setLoading(true)
    let data = await getAllPokemon(nextURL);
    console.log(data);
    await loadPokemon(data.results)
    setNextURL(data.next)
    setPrevURL(data.previous) //次へがクリックされた時に初めてprevにurlが格納される
    setLoading(false)
  }



  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h1>ロード中です・・・</h1>
          ) : (
          <>
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon,index) => {
                return (
                  <Card key={index} pokemon={pokemon} />
                  // 以下でid:pokemonの名前が出力される
                  // <h1>{`${index}:${pokemon.name}`}</h1>
                  )
                })}
              </div>
              <div className='btn'>
                <button onClick={onClickPrev}>前へ</button>
                <button onClick={onClickNext}>次へ</button>
              </div>
          </>
        )}
      </div>
    </>
  );
}
export default App;
