import React from 'react'
import "../css/Card.css";

export const Card = (props) => {

  const { pokemon } = props

  return (
    <div>
      <div className="Card">
        <div className="Card__Img">
          <img src={pokemon.sprites.front_default} alt="" />
        </div>

        <h3 className='Card__Name'>{pokemon.name}</h3>
        <div className="Card__Types">
          <div>タイプ</div>
          {pokemon.types.map((type) => {
            return (
              <div key={type.type.name}>
                <span className="typeName">{type.type.name}</span>
              </div>
            )
          })}
        </div>
        <div className='Card__Info'>
          <div className="Card__Data">
            <p>{`重量：${pokemon.weight}kg`}</p>
          </div>
          <div className="Card__Data">
            <p>{`高さ：${pokemon.height}cm`}</p>
          </div>
          <div className="Card__Data">
            <p>{`能力：${pokemon.abilities[0].ability.name}`}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
