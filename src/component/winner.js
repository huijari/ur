import { html } from 'lit-html'

const Winner = player => {
  const side = player === 0 ? 'left' : 'right'
  return html`
    <div class="Winner">
      <h2>Winner</h2>
      <img class="Winner__token" src="./assets/player_${side}.svg" />
    </div>
  `
}

export default Winner
