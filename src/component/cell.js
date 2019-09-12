import { html } from 'lit-html'

const Cell = (name, player) => html`
  <div id=${name} class="Cell" style="grid-area: ${name};">
    ${player}
  </div>
`

export default Cell
