import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators";
import { classMap } from "lit-html/directives/class-map";
import { ifDefined } from "lit-html/directives/if-defined";
import { emitEvent } from "../../internal/events";
// @ts-ignore
import styles from "./dropdown.scss";

/**
 *
 * @dependency gh-button
 * 
 * @event gh-change - Emitted when the dropdown value change.
 * @event gh-show - Emitted when the dropdown's list is show.
 * @event gh-hide - Emitted when the dropdown's list is hide.
 * 
 * @customProperty --trigger-min-width - The min width of the trigger.
 * 
 */
@customElement("gh-dropdown")
export default class GhDropdown extends LitElement {
  static styles = unsafeCSS(styles);

  /** Indicates whether or not the dropdown is open. You can use show/hide methods to set it. */
  @property({ type: Boolean, reflect: true }) open = false;

  /** Draws the selector in a loading state. */
  @property({ type: Boolean, reflect: true }) loading = false;

  /** List of options  */
  @property({ type: Array }) options: Array<string> = [];

  /** The value selected in the dropdown */
  @property() value: string | undefined;

  connectedCallback() {
    super.connectedCallback();
    this.value = this.options[0];
  }

  handleOptionClick(event: MouseEvent) {
    const option = event.target! as HTMLElement;
    
    if(!this.loading && option.hasAttribute('value')) {
      this.value = option.getAttribute('value') as string;
      
      emitEvent(this, "gh-change", { detail: this.value });
    } 
  }

  handleToggle() {
    this.open ? this.hide() : this.show();
  }

  hide() {
    if (!this.open) return;

    this.open = false;
    this.removeEventListener('mouseout', this.handleToggle);

    emitEvent(this, "gh-hide", { detail: this.open });
  }

  show() {
    if (this.open) return;

    this.open = true;
    this.addEventListener('mouseout', this.handleToggle);

    emitEvent(this, "gh-show", { detail: this.open });
  }

  render() {

    const options = this.options.map(
      (option) => html`
        <li
          class="dropdown__item"
          value=${option}
          @click=${this.handleOptionClick}
          ?selected=${option == this.value}
        >
          ${option}
        </li>
      `
    );

    return html`
      <div
        class=${classMap({
          dropdown: true,
          "dropdown--open": this.open,
          "dropdown--loading": this.loading,
        })}
      >
        <gh-button
          class="dropdown__trigger"
          arrow
          type="secundary"
          ?loading=${this.loading}
          value=${ifDefined(this.value)}
          @click=${this.handleToggle}
        >
          ${this.value}
        </gh-button>
        
        <div 
          class="dropdown__panel"
          aria-hidden=${this.open ? "false" : "true"}
          ?hidden=${!this.open}
        >
          <ul class="dropdown__list">${options}</ul>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "gh-dropdown": GhDropdown;
  }
}
