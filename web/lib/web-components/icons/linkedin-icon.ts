import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { twMerge } from 'tailwind-merge'
import { LightLitElement } from '../light-lit-element'

@customElement('linkedin-icon')
export class LinkedinIcon extends LightLitElement {
  @property({ type: String }) svgClass = ''
  @property({ type: Number }) strokeWidth = 2

  render() {
    return html`
      <svg
        class=${twMerge('size-6 fill-gray-600 dark:fill-gray-200', this.svgClass)}
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
      >
        <!-- Icon from Remix Icon by Remix Design - https://github.com/Remix-Design/RemixIcon/blob/master/License -->
        <path
          fill="currentColor"
          d="M6.94 5a2 2 0 1 1-4-.002a2 2 0 0 1 4 .002M7 8.48H3V21h4zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91z"
        />
      </svg>
    `
  }
}
