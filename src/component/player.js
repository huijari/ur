import { html } from 'lit-html'
import { classMap } from 'lit-html/directives/class-map'

import { rollCoin } from '../actions'

const Coin = value => {
  const src = value === 0 ? 'tails' : 'heads'
  return html`
    <img src="./assets/coin_${src}.svg" />
  `
}

const Player = (number, { turn, phase, players }) => {
  const player = players[number]
  const canRoll = turn === number && phase === 0
  const side = number === 0 ? 'left' : 'right'
  const classes = {
    Player: true,
    'Player--enabled': number === turn
  }
  return html`
    <section class=${classMap(classes)}>
      <img src="./assets/player_${side}.svg" />
      <div class="Player__stats">
        <b>ascended: ${player.pieces[1]}</b>
        <b>on hand: ${player.pieces[0]}</b>
      </div>
      <div class="Player__coins">
        ${player.coins.map(Coin)}
      </div>
      <button ?disabled=${!canRoll} @click=${rollCoin} class="Player__roll">
        roll
      </button>
    </section>
  `
}

export default Player
