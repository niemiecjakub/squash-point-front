import React from 'react'
import { GameProfile } from '../../squashpoint'
import GameItem from '../GameItem/GameItem'

type Props = {
    games: GameProfile[]
}

const GameListTest = ({games}: Props) => {
  return (
    <>
    {games.map(game => <GameItem game={game}/>)}
    </>
  )
}

export default GameListTest