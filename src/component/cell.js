import { html } from 'lit-html'
import { classMap } from 'lit-html/directives/class-map'

import { move } from '../actions'

const Cell = (name, action, player, enabled) => {
  const handler = () => move(action)
  const classes = {
    Cell: true,
    'Cell--enabled': enabled,
    'Cell--bonus': ['l3', 'r3', 'c7', 'l13', 'r13'].includes(name),
    'Cell--left': player === 0,
    'Cell--right': player === 1
  }
  return html`
    <div
      id=${name}
      @click=${handler}
      class="${classMap(classes)}"
      style="grid-area: ${name};"
    ></div>
  `
}

export default Cell
