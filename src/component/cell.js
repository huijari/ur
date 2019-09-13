import { html } from 'lit-html'

import { move } from '../actions'

const Cell = (name, action, player, enabled) => {
  const handler = () => move(action)
  const enabledClass = enabled ? 'enabled' : ''
  return html`
    <div
      id=${name}
      @click=${handler}
      class="Cell ${enabledClass}"
      style="grid-area: ${name};"
    >
      ${player}
    </div>
  `
}

export default Cell
