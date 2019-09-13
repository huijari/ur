import { html } from 'lit-html'

import { pass } from '../actions'
import { generateMove } from '../state'
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

const Board = ({ turn, phase, players }) => {
  const occupied = {
    ...players[0].board.reduce(playerBoardPieces(0), {}),
    ...players[1].board.reduce(playerBoardPieces(1), {})
  }
  let anyValid = false
  const cells = [
    ...Array(14)
      .fill(0)
      .map((_, i) => [i, 0]),
    ...Array(4)
      .fill(0)
      .map((_, i) => [i, 1]),
    ...Array(2)
      .fill(0)
      .map((_, i) => [i + 12, 1])
  ].map(cell => {
    const name = toBoard(...cell)
    const action = generateMove(cell[0])
    const valid = action.invalid === undefined
    if (valid) anyValid = true
    const enabled = valid && phase === 1 && turn === cell[1]
    return Cell(name, action, occupied[name], enabled)
  })
  if (!anyValid) pass()
  return html`
    <section class="Board">${cells}</section>
  `
}

export default Board
