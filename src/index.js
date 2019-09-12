import { html, render } from 'lit-html'
import { generateMove, getState, move, rollCoin } from './state'

const action = {
  move: Updater(move),
  rollCoin: Updater(rollCoin)
}

const Player = (number, { turn, phase, players }) => {
  const player = players[number]
  const canRoll = turn === number && phase === 0
  return html`
    <section class="Player">
      <h2>Player ${number + 1}</h2>
      <p><b>Ascended:</b> ${player.pieces[1]}</p>
      <p><b>On hand:</b> ${player.pieces[0]}</p>
      <p>${player.coins}</p>
      <button ?disabled=${!canRoll} @click=${action.rollCoin}>roll</button>
    </section>
  `
}

const Cell = (name, player) => html`
  <div id=${name} class="Cell" style="grid-area: ${name};">
    ${player}
  </div>
`
const toBoard = (position, player) => {
  if (position > 3 && position < 12) return `c${position}`
  const side = player === 0 ? 'l' : 'r'
  return `${side}${position}`
}
const Board = ({ players }) => {
  const playerBoardPieces = player => (pieces, position) => ({
    ...pieces,
    [toBoard(position, player)]: player
  })
  const occupied = {
    ...players[0].board.reduce(playerBoardPieces(0), {}),
    ...players[1].board.reduce(playerBoardPieces(1), {})
  }
  return html`
    <section class="Board">
      ${[
        'l0',
        'l1',
        'l2',
        'l3',
        'r0',
        'r1',
        'r2',
        'r3',
        'l12',
        'l13',
        'r12',
        'r13',
        'c4',
        'c5',
        'c6',
        'c7',
        'c8',
        'c9',
        'c10',
        'c11'
      ].map(cell => Cell(cell, occupied[cell]))}
    </section>
  `
}

const App = state => {
  const player1 = Player(0, state)
  const player2 = Player(1, state)
  return html`
    <main class="App">
      ${player1} ${Board(state)} ${player2}
    </main>
  `
}

function Updater(stateChanger) {
  return (...args) => {
    stateChanger(...args)
    render(App(getState()), document.body)
  }
}

Updater(() => 0)()
