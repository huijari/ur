import { html, render } from 'lit-html'
import { move, generateMove, getState } from './state'

const Player = (number, pieces) => html`
  <section class="Player">
    <h2>Player ${number}</h2>
    <p><b>Ascended:</b> ${pieces[1]}</p>
		<p><b>On hand:</b> ${pieces[0]}</p>
		<p>0 1 1 0</p>
		<button>roll</button>
  </section>
`

const Cell = name => html`
  <div id=${name} class="Cell" style="grid-area: ${name};"></div>
`
const Board = ({ players }) => html`
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
    ].map(Cell)}
  </section>
`

const App = state => {
  const player1 = Player(1, state.players[0].pieces)
  const player2 = Player(2, state.players[1].pieces)
  return html`
    <main class="App">
      ${player1} ${Board(state)} ${player2}
    </main>
  `
}

render(App(getState()), document.body)
