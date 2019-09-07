const state = {
  winner: null,
  turn: 0,
  phase: 0,
  coin: 0,
  players: [
    {
      board: [],
      pieces: [7, 0]
    },
    {
      board: [],
      pieces: [7, 0]
    }
  ]
}

function rollCoin() {
  const value = [0, 0, 0, 0].map(() => Math.random() >= 5)
  state.phase = 1
  state.coin = value
}

function hasPiece(position) {
  let index = state.players[state.turn].board.indexOf(position)
  if (index >= 0) return { self: index }
  if (position < 4 || position > 11) {
    return { empty: true }
  }
  index = state.players[+!state.turn].board.indexOf(position)
  if (index >= 0) return { enemy: index }
  return { empty: true }
}

const safes = [3, 7, 13]
function generateMove(position) {
  const piece = hasPiece(position)
  if (piece.enemy !== undefined) return { invalid: true }
  if (piece.empty) {
    if (state.players[state.turn].pieces[0] === 0 || position !== state.coin)
      return { invalid: true }
    return { place: position }
  }

  const next = position + state.coin
  if (next === 14) return { ascend: piece.self }
  if (next > 14) return { invalid: true }
  const pieceAtNext = hasPiece(next)
  if (pieceAtNext.self !== undefined) return { invalid: true }
  const nextIsSafe = safes.includes(next)
  if (pieceAtNext.empty) return { move: [piece.self, position, nextIsSafe] }

  if (nextIsSafe) return { invalid: true }
  return { catch: [piece.self, position, pieceAtNext.enemy] }
}

function move(action) {
  if (action.invalid) return
  const player = state.players[state.turn]
  if (action.place !== undefined) {
    player.board.push(action.place)
    player.pieces[0]--
  } else if (action.ascend !== undefined) {
    player.board.splice(action.ascend, 1)
    player.pieces[1]++
    if (player.pieces[1] === 7) state.winner = state.turn
  } else if (action.move !== undefined) {
    player.board.splice(action.move[0], 1)
    player.board.push(action.move[1])
    if (action.move[2]) state.turn = +!state.turn
  } else {
    player.board.splice(action.catch[0], 1)
    player.board.push(action.catch[1])
    const enemy = state.players[+!state.turn]
    enemy.board.splice(action.catch[2], 1)
    enemy.pieces[0]++
  }
  state.phase = 0
  state.turn = +!state.turn
}
