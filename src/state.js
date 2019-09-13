const state = {
  winner: null,
  turn: 0,
  phase: 0,
  coin: 1,
  players: [
    {
      board: [],
      pieces: [7, 0],
      coins: [0, 0, 0, 0]
    },
    {
      board: [],
      pieces: [7, 0],
      coins: [0, 0, 0, 0]
    }
  ]
}

function rollCoin() {
  const coins = [0, 0, 0, 0].map(() => +(Math.random() >= 0.5))
  state.players[state.turn].coins = coins
  state.coin = coins.reduce((acc, x) => acc + x, 0)
  if (state.coin === 0) state.turn = +!state.turn
  else state.phase = 1
}

function pass() {
  state.phase = 0
  state.turn = +!state.turn
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

  const next = position + state.coin
  const nextIsSafe = safes.includes(next)
  if (piece.empty) {
    if (
      state.players[state.turn].pieces[0] === 0 ||
      position !== state.coin - 1
    )
      return { invalid: true }
    return { place: [position, nextIsSafe] }
  }

  if (next === 14) return { ascend: piece.self }
  if (next > 14) return { invalid: true }
  const pieceAtNext = hasPiece(next)
  if (pieceAtNext.self !== undefined) return { invalid: true }
  if (pieceAtNext.empty) return { move: [piece.self, next, nextIsSafe] }

  if (nextIsSafe) return { invalid: true }
  return { catch: [piece.self, next, pieceAtNext.enemy] }
}

function move(action) {
  if (action.invalid) return
  const player = state.players[state.turn]
  if (action.place !== undefined) {
    player.board.push(action.place[0])
    player.pieces[0]--
    if (action.place[1]) state.turn = +!state.turn
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
  pass()
}

function getState() {
  return state
}

export { rollCoin, pass, generateMove, move, getState }
