import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { twMerge } from 'tailwind-merge'
import { LightLitElement } from '../light-lit-element'

@customElement('email-icon')
export class EmailIcon extends LightLitElement {
  @property({ type: String }) svgClass = ''
  @property({ type: Number }) strokeWidth = 2

  render() {
    return html`
      <svg
        class=${twMerge('size-6 dark:fill-gray-200', this.svgClass)}
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <!-- Icon from Remix Icon by Remix Design - https://github.com/Remix-Design/RemixIcon/blob/master/License -->
        <path
          fill="currentColor"
          d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1m9.06 8.683L5.648 6.238L4.353 7.762l7.72 6.555l7.581-6.56l-1.308-1.513z"
        />
      </svg>
    `
  }
}
