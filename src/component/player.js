import { html } from 'lit-html'

import { rollCoin } from '../actions'

const Player = (number, { turn, phase, players }) => {
  const player = players[number]
  const canRoll = turn === number && phase === 0
  return html`
    <section class="Player">
      <h2>Player ${number + 1}</h2>
      <p><b>Ascended:</b> ${player.pieces[1]}</p>
      <p><b>On hand:</b> ${player.pieces[0]}</p>
      <p>${player.coins}</p>
      <button ?disabled=${!canRoll} @click=${rollCoin}>roll</button>
    </section>
  `
}

export default Player
