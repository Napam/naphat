import { html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { LightLitElement } from '@web-components/light-lit-element'
import { twMerge } from 'tailwind-merge'
import { OptionalString } from '@web-components/common'

// SVG viewBox dimensions — used to derive the missing axis from its sibling
// so we never emit "100%" as a default. Percentage SVG dimensions are a
// quirks-mode footgun in Safari (the page is in quirks mode because base.templ
// intentionally omits <!DOCTYPE html> for MapLibre): "100%" resolves against
// an indefinite containing block instead of falling back to viewBox aspect
// ratio, which causes the SVG to balloon to fill flex space.
const VIEW_BOX_WIDTH = 400
const VIEW_BOX_HEIGHT = 150

function parsePixelDimension(value: string | undefined): number | undefined {
  if (value === undefined) return undefined
  const n = parseFloat(value)
  return Number.isFinite(n) ? n : undefined
}

@customElement('apato-logo-wide')
export class ApatoLogoWide extends LightLitElement {
  @property({ type: String }) svgClass = ''
  @property({ type: String }) textClass = ''
  @property({ type: OptionalString }) height: string | undefined
  @property({ type: OptionalString }) width: string | undefined

  render() {
    // Resolve dimensions:
    // - Both provided: use as-is.
    // - Only one provided (and parseable as pixels): derive the other from viewBox aspect ratio.
    //   Keeps the API ergonomic (callers can specify just height OR width) without ever
    //   emitting "100%" defaults that misbehave in quirks-mode Safari.
    // - Neither provided: omit both attributes; the SVG sizes itself from its viewBox
    //   intrinsic dimensions (browsers default to 300x150-ish, but viewBox + preserveAspectRatio
    //   gives a sane intrinsic 400x150).
    let { width, height } = this
    const widthPx = parsePixelDimension(width)
    const heightPx = parsePixelDimension(height)

    if (width === undefined && heightPx !== undefined) {
      width = String((heightPx * VIEW_BOX_WIDTH) / VIEW_BOX_HEIGHT)
    } else if (height === undefined && widthPx !== undefined) {
      height = String((widthPx * VIEW_BOX_HEIGHT) / VIEW_BOX_WIDTH)
    }

    return html`
      <svg
        height=${ifDefined(height)}
        width=${ifDefined(width)}
        class=${twMerge('w-min', this.svgClass)}
        viewBox="0 0 ${VIEW_BOX_WIDTH} ${VIEW_BOX_HEIGHT}"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_1104_144)">
          <path
            d="M300 4H396C398.209 4 400 5.79086 400 8V150C400 152.209 398.209 154 396 154H300V4Z"
            class="fill-emerald-200 dark:fill-emerald-500"
          ></path>
        </g>
        <g filter="url(#filter1_d_1104_144)">
          <rect x="200" y="4" width="100" height="150" class="fill-emerald-300 dark:fill-emerald-600"></rect>
        </g>
        <g filter="url(#filter2_d_1104_144)">
          <rect x="100" y="4" width="100" height="150" class="fill-emerald-400 dark:fill-emerald-700"></rect>
        </g>
        <g filter="url(#filter3_d_1104_144)">
          <path
            d="M0 8C0 5.79086 1.79086 4 4 4H100V154H4C1.79086 154 0 152.209 0 150V8Z"
            class="fill-emerald-500 dark:fill-emerald-800"
          ></path>
        </g>
        <g filter="url(#filter4_d_1104_144)">
          <path
            d="M117.428 69.793C112.577 67.4492 108.232 65.6751 104.391 64.4707C96.0898 74.4967 91.1908 84.2135 89.6934 93.6211C89.4655 95.151 89.3516 96.6973 89.3516 98.2598C89.3516 99.7897 89.498 101.336 89.791 102.898C86.5358 105.307 83.1829 107.098 79.7324 108.27C78.528 108.693 77.5514 108.904 76.8027 108.904C76.054 108.904 75.2728 108.709 74.459 108.318C73.6777 107.928 72.9616 107.326 72.3105 106.512C70.748 104.689 69.9668 102.264 69.9668 99.2363C69.9668 96.209 70.5039 93.1491 71.5781 90.0566C72.6849 86.9642 74.1986 83.8392 76.1191 80.6816C79.7324 74.7246 84.9408 68.5234 91.7441 62.0781C89.0749 61.9154 86.4219 61.834 83.7852 61.834C81.1484 61.834 78.3978 62.1758 75.5332 62.8594C69.4785 64.2917 65.8652 67.026 64.6934 71.0625C64.4655 71.7786 64.3516 72.7227 64.3516 73.8945C64.3516 75.0339 64.7422 76.515 65.5234 78.3379C64.8724 79.5423 63.3587 80.0306 60.9824 79.8027C58.5085 79.5749 56.5716 78.9076 55.1719 77.8008C52.5352 75.7174 51.2168 73.4225 51.2168 70.916C51.2168 66.0332 54.6348 62.1107 61.4707 59.1484C67.8184 56.3815 75.5495 54.998 84.6641 54.998C88.7331 54.998 93.1927 55.5189 98.043 56.5605C110.25 46.4043 122.766 38.9661 135.592 34.2461C141.777 31.9674 147.245 30.8281 151.998 30.8281C154.212 30.8281 155.855 31.3327 156.93 32.3418C158.036 33.3184 158.59 34.5716 158.59 36.1016C158.59 37.599 158.183 39.4707 157.369 41.7168C156.588 43.9629 155.595 46.4694 154.391 49.2363C153.186 51.9707 151.884 54.9167 150.484 58.0742C149.117 61.2318 147.831 64.4544 146.627 67.7422C143.827 75.3919 142.428 81.8698 142.428 87.1758C142.428 91.0495 144.137 92.9863 147.555 92.9863C148.531 92.9863 149.605 92.7422 150.777 92.2539C151.396 92.6771 151.9 93.2467 152.291 93.9629C152.682 94.6465 152.877 95.2487 152.877 95.7695C152.877 96.2904 152.665 97.0391 152.242 98.0156C151.852 98.9922 151.282 99.985 150.533 100.994C149.785 101.971 148.873 102.915 147.799 103.826C146.757 104.738 145.602 105.551 144.332 106.268C139.579 108.969 134.436 109.376 128.902 107.488C124.312 105.958 121.041 102.801 119.088 98.0156C118.111 95.5417 117.623 92.7259 117.623 89.5684C117.623 86.4108 118.111 83.4486 119.088 80.6816C120.064 77.8822 121.334 75.1478 122.896 72.4785C124.492 69.7767 126.298 67.1725 128.316 64.666C130.367 62.1595 132.451 59.7669 134.566 57.4883C136.715 55.1771 138.798 53.0124 140.816 50.9941C142.867 48.9759 144.674 47.1042 146.236 45.3789C149.785 41.5703 151.559 38.9499 151.559 37.5176C151.559 36.7689 150.875 36.3945 149.508 36.3945C143.583 36.3945 136.829 38.6081 129.244 43.0352C121.92 47.332 115.051 52.8822 108.639 59.6855C113.814 61.541 116.956 63.2174 118.062 64.7148C119.332 66.4076 119.12 68.1003 117.428 69.793ZM159.957 129.412C159.957 130.714 158.867 131.365 156.686 131.365C151.64 131.365 148.238 129.282 146.48 125.115C145.829 123.585 145.504 121.876 145.504 119.988C145.504 118.133 145.813 116.082 146.432 113.836C147.018 111.622 147.848 109.197 148.922 106.561C149.964 103.891 151.201 101.092 152.633 98.1621C154.065 95.1999 155.595 92.2539 157.223 89.3242C158.85 86.3945 160.543 83.5625 162.301 80.8281C164.091 78.0938 165.865 75.5872 167.623 73.3086C172.311 67.2214 176.021 63.9987 178.756 63.6406C179.146 63.5755 179.488 63.543 179.781 63.543C180.074 63.543 180.432 63.5592 180.855 63.5918C181.93 63.6895 182.727 64.0964 183.248 64.8125C182.695 66.0169 182.027 67.4329 181.246 69.0605C180.497 70.6556 179.7 72.4297 178.854 74.3828C185.234 69.5 192.005 66.2122 199.166 64.5195C201.51 63.9336 203.74 63.6406 205.855 63.6406C210.087 63.6406 211.178 65.5938 209.127 69.5C208.15 71.388 206.816 73.4876 205.123 75.7988C203.43 78.0775 202.161 79.8516 201.314 81.1211C199.296 84.1159 198.287 86.362 198.287 87.8594C198.287 90.5286 199.736 91.8633 202.633 91.8633C205.172 91.8633 208.036 90.724 211.227 88.4453C214.124 86.362 216.565 83.8229 218.551 80.8281C219.397 80.763 219.967 80.9258 220.26 81.3164C220.585 81.707 220.748 82.1465 220.748 82.6348C220.748 83.0905 220.536 83.8229 220.113 84.832C219.69 85.8411 219.007 87.1432 218.062 88.7383C217.151 90.3333 216.028 91.9772 214.693 93.6699C213.391 95.3626 211.894 97.0391 210.201 98.6992C208.508 100.327 206.653 101.792 204.635 103.094C200.175 105.926 195.52 107.342 190.67 107.342C185.494 107.342 182.011 105.47 180.221 101.727C179.635 100.522 179.342 99.041 179.342 97.2832C179.342 95.5254 179.83 93.6536 180.807 91.668C181.816 89.6823 183.02 87.778 184.42 85.9551C185.82 84.0996 187.285 82.3743 188.814 80.7793C190.344 79.1842 191.63 77.8008 192.672 76.6289C193.746 75.457 194.43 74.5293 194.723 73.8457C195.016 73.1621 194.625 72.8203 193.551 72.8203C192.477 72.8203 191.093 73.1784 189.4 73.8945C187.74 74.5781 185.999 75.4896 184.176 76.6289C180.074 79.168 176.721 82.0163 174.117 85.1738C164.775 107.049 160.055 121.795 159.957 129.412ZM241.158 99.1875C236.699 104.396 231.262 107 224.85 107C220.781 107 217.525 105.779 215.084 103.338C212.675 100.929 211.471 97.7552 211.471 93.8164C211.471 88.8359 213.424 84.002 217.33 79.3145C221.106 74.7572 226.054 71.0462 232.174 68.1816C238.521 65.2194 245.081 63.7383 251.852 63.7383C254.423 63.7383 256.262 64.1452 257.369 64.959C258.248 63.9173 259.029 63.3151 259.713 63.1523C260.429 62.957 260.982 62.8594 261.373 62.8594C262.61 62.8594 263.928 63.0384 265.328 63.3965C265.198 63.8197 264.921 64.5521 264.498 65.5938C264.075 66.6029 263.603 67.8073 263.082 69.207C262.561 70.6068 262.008 72.1367 261.422 73.7969C259.306 79.7214 258.248 84.1647 258.248 87.127C258.248 90.0566 259.176 91.5215 261.031 91.5215C263.44 91.5215 266.126 90.431 269.088 88.25C271.725 86.2643 274.036 83.7904 276.021 80.8281C277.486 80.7305 278.219 81.3327 278.219 82.6348C278.219 83.7415 277.535 85.4342 276.168 87.7129C274.833 89.9915 273.531 91.9609 272.262 93.6211C270.992 95.2812 269.576 96.9089 268.014 98.5039C266.451 100.099 264.791 101.531 263.033 102.801C259.094 105.6 255.253 107 251.51 107C246.757 107 243.567 105.568 241.939 102.703C241.419 101.824 241.158 101.059 241.158 100.408C241.158 99.7246 241.158 99.3177 241.158 99.1875ZM227.193 85.8574C227.193 89.6335 228.772 91.5215 231.93 91.5215C235.413 91.5215 239.514 88.7057 244.234 83.0742C246.741 80.0794 248.922 77.2148 250.777 74.4805C252.665 71.7461 254.098 69.6628 255.074 68.2305C246.936 68.2956 240.182 70.151 234.811 73.7969C229.732 77.2474 227.193 81.2676 227.193 85.8574ZM286.471 107.049C276.087 107.049 270.895 102.638 270.895 93.8164C270.895 87.6641 274.98 79.1354 283.15 68.2305C282.337 67.9701 281.588 67.7422 280.904 67.5469C280.221 67.3516 279.667 67.1888 279.244 67.0586C278.821 66.8958 278.561 66.6517 278.463 66.3262C278.365 66.0007 278.333 65.6263 278.365 65.2031C278.495 64.2266 278.723 63.4453 279.049 62.8594L286.422 64.0801C292.184 57.0814 297.148 52.2799 301.314 49.6758C302.584 48.8945 303.479 48.5039 304 48.5039C304.521 48.5039 304.977 48.5853 305.367 48.748C305.79 48.8783 306.214 49.0573 306.637 49.2852C307.548 49.7734 308.264 50.3431 308.785 50.9941C304.391 55.291 300.273 60.2227 296.432 65.7891C303.886 67.0911 308.443 67.791 310.104 67.8887C309.225 71.3717 308.215 73.1133 307.076 73.1133C304.277 73.1133 299.671 72.3483 293.258 70.8184C290.035 76.1895 288.424 80.6491 288.424 84.1973C288.424 89.0801 291.712 91.5215 298.287 91.5215C305.644 91.5215 311.699 87.957 316.451 80.8281C317.916 80.7305 318.648 81.3327 318.648 82.6348C318.648 83.7741 317.965 85.4831 316.598 87.7617C315.23 90.0078 313.863 91.9609 312.496 93.6211C311.129 95.2812 309.55 96.9251 307.76 98.5527C305.969 100.148 303.984 101.58 301.803 102.85C297.05 105.649 291.939 107.049 286.471 107.049ZM325.973 107.244L324.996 107.293C319.853 107.293 315.93 106.023 313.229 103.484C310.689 101.108 309.42 97.8854 309.42 93.8164C309.42 88.2174 311.65 82.8626 316.109 77.752C320.439 72.804 325.696 69.3372 331.881 67.3516C331.686 65.8867 332.223 64.6823 333.492 63.7383C334.404 63.0547 335.901 62.7129 337.984 62.7129C340.1 62.7129 342.135 62.9082 344.088 63.2988C346.041 63.6895 348.01 64.5521 349.996 65.8867C354.293 68.7188 356.441 72.5273 356.441 77.3125C356.441 82.4883 355.156 87.4036 352.584 92.0586C358.183 90.8542 363.082 87.1107 367.281 80.8281C368.746 80.7305 369.479 81.3327 369.479 82.6348C369.479 83.1556 369.316 83.7904 368.99 84.5391C364.563 95.0534 355.709 102.02 342.428 105.438C337.675 106.674 332.271 107.293 326.217 107.293L325.973 107.244ZM325.143 85.8574C325.143 89.6335 326.721 91.5215 329.879 91.5215C332.548 91.5215 335.234 89.9102 337.936 86.6875C340.768 83.3346 342.184 79.9329 342.184 76.4824C342.184 72.9668 340.491 70.6393 337.105 69.5C331.279 71.1276 327.551 74.7734 325.924 80.4375C325.403 82.1628 325.143 83.9694 325.143 85.8574Z"
            class=${twMerge('fill-white dark:fill-neutral-200', this.textClass)}
          ></path>
        </g>
        <defs>
          <filter
            id="filter0_d_1104_144"
            x="298"
            y="0"
            width="108"
            height="158"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            ></feColorMatrix>
            <feOffset dx="2"></feOffset>
            <feGaussianBlur stdDeviation="2"></feGaussianBlur>
            <feComposite in2="hardAlpha" operator="out"></feComposite>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1104_144"></feBlend>
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_1104_144"
              result="shape"
            ></feBlend>
          </filter>
          <filter
            id="filter1_d_1104_144"
            x="200"
            y="0"
            width="108"
            height="158"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            ></feColorMatrix>
            <feOffset dx="4"></feOffset>
            <feGaussianBlur stdDeviation="2"></feGaussianBlur>
            <feComposite in2="hardAlpha" operator="out"></feComposite>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1104_144"></feBlend>
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_1104_144"
              result="shape"
            ></feBlend>
          </filter>
          <filter
            id="filter2_d_1104_144"
            x="100"
            y="0"
            width="112"
            height="158"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            ></feColorMatrix>
            <feOffset dx="8"></feOffset>
            <feGaussianBlur stdDeviation="2"></feGaussianBlur>
            <feComposite in2="hardAlpha" operator="out"></feComposite>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1104_144"></feBlend>
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_1104_144"
              result="shape"
            ></feBlend>
          </filter>
          <filter
            id="filter3_d_1104_144"
            x="0"
            y="0"
            width="120"
            height="158"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            ></feColorMatrix>
            <feOffset dx="16"></feOffset>
            <feGaussianBlur stdDeviation="2"></feGaussianBlur>
            <feComposite in2="hardAlpha" operator="out"></feComposite>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1104_144"></feBlend>
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_1104_144"
              result="shape"
            ></feBlend>
          </filter>
          <filter
            id="filter4_d_1104_144"
            x="47.2168"
            y="30.8281"
            width="326.262"
            height="108.537"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            ></feColorMatrix>
            <feOffset dy="4"></feOffset>
            <feGaussianBlur stdDeviation="2"></feGaussianBlur>
            <feComposite in2="hardAlpha" operator="out"></feComposite>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1104_144"></feBlend>
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_1104_144"
              result="shape"
            ></feBlend>
          </filter>
        </defs>
      </svg>
    `
  }
}
