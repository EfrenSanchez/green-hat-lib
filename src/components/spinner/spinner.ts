import { LitElement, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators';
import styles from './spinner.scss';

/**
 *
 * @customProperty --track-color - The color of the spinner's track.
 * @customProperty --indicator-color - The color of the spinner's indicator.
 * @customProperty --stroke-width - The width of the indicator.
 * @customProperty --size - The min width & height of the spinner.
 * 
 */
@customElement('gh-spinner')
export default class GhSpinner extends LitElement {
  static styles = unsafeCSS(styles);

  render() {
    return html` <span class="spinner"></span> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gh-spinner': GhSpinner;
  }
}