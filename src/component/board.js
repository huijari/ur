import { html } from 'lit-html'

import Cell from './cell'

const toBoard = (position, player) => {
  if (position > 3 && position < 12) return `c${position}`
  const side = player === 0 ? 'l' : 'r'
  return `${side}${position}`
}
const playerBoardPieces = player => (pieces, position) => ({
  ...pieces,
  [toBoard(position, player)]: player
})

const Board = ({ players }) => {
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

export default Board
