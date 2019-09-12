import { render } from 'lit-html'

import * as State from './state'
import App from './component/app'

function Updater(stateChanger) {
  return (...args) => {
    stateChanger(...args)
    render(App(State.getState()), document.body)
  }
}

export const move = Updater(State.move)

export const rollCoin = Updater(State.rollCoin)

export const firstRender = Updater(() => 0)
