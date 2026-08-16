import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { LightLitElement } from '@web-components/light-lit-element'
import { twMerge } from 'tailwind-merge'
import { OptionalString } from '@web-components/common'

@customElement('apato-logo-square')
export class ApatoLogoSquare extends LightLitElement {
  @property({ type: String }) svgClass = ''
  @property({ type: String }) textClass = ''
  @property({ type: OptionalString }) height: string | undefined
  @property({ type: OptionalString }) width: string | undefined

  render() {
    const height = this.height || '100%'
    const width = this.width || '100%'

    return html`
      <svg
        width=${width}
        height=${height}
        viewBox="0 0 158 155"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_1104_23)">
          <path
            d="M154 112.5L154 146C154 148.209 152.209 150 150 150L8 150C5.79086 150 4 148.209 4 146L4 112.5L154 112.5Z"
            class="fill-primary-200 dark:fill-primary-500"
          />
        </g>
        <g filter="url(#filter1_d_1104_23)">
          <rect
            x="154"
            y="75"
            width="37.5"
            height="150"
            transform="rotate(90 154 75)"
            class="fill-primary-300 dark:fill-primary-600"
          />
        </g>
        <g filter="url(#filter2_d_1104_23)">
          <rect
            x="154"
            y="37.5"
            width="37.5"
            height="150"
            transform="rotate(90 154 37.5)"
            class="fill-primary-400 dark:fill-primary-700"
          />
        </g>
        <g filter="url(#filter3_d_1104_23)">
          <path
            d="M150 7.45455e-06C152.209 7.55111e-06 154 1.79087 154 4.00001L154 37.5L4 37.5L4 4C4 1.79086 5.79086 1.15097e-06 8 1.24753e-06L150 7.45455e-06Z"
            class="fill-primary-500 dark:fill-primary-800"
          />
        </g>
        <g filter="url(#filter4_d_1104_23)">
          <path
            d="M87.5273 77.793C82.6771 75.4492 78.3314 73.6751 74.4902 72.4707C66.1895 82.4968 61.2904 92.2135 59.793 101.621C59.5651 103.151 59.4512 104.697 59.4512 106.26C59.4512 107.79 59.5977 109.336 59.8906 110.898C56.6354 113.307 53.2826 115.098 49.832 116.27C48.6276 116.693 47.651 116.904 46.9023 116.904C46.1536 116.904 45.3724 116.709 44.5586 116.318C43.7773 115.928 43.0612 115.326 42.4102 114.512C40.8477 112.689 40.0664 110.264 40.0664 107.236C40.0664 104.209 40.6035 101.149 41.6777 98.0566C42.7845 94.9642 44.2982 91.8392 46.2188 88.6816C49.832 82.7246 55.0404 76.5234 61.8438 70.0781C59.1745 69.9154 56.5215 69.834 53.8848 69.834C51.248 69.834 48.4974 70.1758 45.6328 70.8594C39.5781 72.2917 35.9648 75.026 34.793 79.0625C34.5651 79.7787 34.4512 80.7227 34.4512 81.8945C34.4512 83.0339 34.8418 84.515 35.623 86.3379C34.972 87.5423 33.4583 88.0306 31.082 87.8027C28.6081 87.5749 26.6712 86.9076 25.2715 85.8008C22.6348 83.7175 21.3164 81.4225 21.3164 78.916C21.3164 74.0332 24.7344 70.1107 31.5703 67.1484C37.918 64.3815 45.6491 62.9981 54.7637 62.9981C58.8327 62.9981 63.2923 63.5189 68.1426 64.5606C80.3496 54.4043 92.8659 46.9662 105.691 42.2461C111.876 39.9675 117.345 38.8281 122.098 38.8281C124.311 38.8281 125.955 39.3327 127.029 40.3418C128.136 41.3184 128.689 42.5716 128.689 44.1016C128.689 45.599 128.283 47.4707 127.469 49.7168C126.688 51.9629 125.695 54.4694 124.49 57.2363C123.286 59.9707 121.984 62.9167 120.584 66.0742C119.217 69.2318 117.931 72.4544 116.727 75.7422C113.927 83.3919 112.527 89.8698 112.527 95.1758C112.527 99.0495 114.236 100.986 117.654 100.986C118.631 100.986 119.705 100.742 120.877 100.254C121.495 100.677 122 101.247 122.391 101.963C122.781 102.646 122.977 103.249 122.977 103.77C122.977 104.29 122.765 105.039 122.342 106.016C121.951 106.992 121.382 107.985 120.633 108.994C119.884 109.971 118.973 110.915 117.898 111.826C116.857 112.738 115.701 113.551 114.432 114.268C109.679 116.969 104.536 117.376 99.002 115.488C94.4121 113.958 91.1406 110.801 89.1875 106.016C88.2109 103.542 87.7227 100.726 87.7227 97.5684C87.7227 94.4108 88.2109 91.4486 89.1875 88.6816C90.1641 85.8822 91.4336 83.1478 92.9961 80.4785C94.5911 77.7767 96.3978 75.1725 98.416 72.666C100.467 70.1595 102.55 67.7669 104.666 65.4883C106.814 63.1771 108.898 61.0124 110.916 58.9941C112.967 56.9759 114.773 55.1042 116.336 53.3789C119.884 49.5703 121.658 46.9499 121.658 45.5176C121.658 44.7689 120.975 44.3945 119.607 44.3945C113.683 44.3945 106.928 46.6081 99.3438 51.0352C92.0195 55.332 85.151 60.8822 78.7383 67.6856C83.9141 69.541 87.0553 71.2175 88.1621 72.7149C89.4316 74.4076 89.2201 76.1003 87.5273 77.793Z"
            class=${twMerge('fill-white dark:fill-neutral-200', this.textClass)}
          />
        </g>
        <defs>
          <filter
            id="filter0_d_1104_23"
            x="0"
            y="109.5"
            width="158"
            height="45.5"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1104_23" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1104_23" result="shape" />
          </filter>
          <filter
            id="filter1_d_1104_23"
            x="0"
            y="73"
            width="158"
            height="45.5"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="2" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1104_23" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1104_23" result="shape" />
          </filter>
          <filter
            id="filter2_d_1104_23"
            x="0"
            y="37.5"
            width="158"
            height="45.5"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1104_23" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1104_23" result="shape" />
          </filter>
          <filter
            id="filter3_d_1104_23"
            x="0"
            y="0"
            width="158"
            height="49.5"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="8" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1104_23" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1104_23" result="shape" />
          </filter>
          <filter
            id="filter4_d_1104_23"
            x="17.3164"
            y="38.8281"
            width="115.373"
            height="87.4922"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1104_23" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1104_23" result="shape" />
          </filter>
        </defs>
      </svg>
    `
  }
}
