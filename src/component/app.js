import { html } from 'lit-html'

import Board from './board'
import Player from './player'
import Winner from './winner'

const App = state => {
  if (state.winner !== null)
    return Winner(state.winner)

  const player1 = Player(0, state)
  const player2 = Player(1, state)
  return html`
    <main class="App">
      ${player1} ${Board(state)} ${player2}
    </main>
  `
}

export default App
