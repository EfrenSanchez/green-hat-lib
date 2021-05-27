import { LitElement, html, unsafeCSS, css } from "lit";
import { customElement, property, query, state } from "lit/decorators";
import { classMap } from "lit-html/directives/class-map";
import { ifDefined } from "lit-html/directives/if-defined";
import { emitEvent } from "../../internal/events";
import { hasSlot } from "../../utilities/slot";
import styles from "./button.scss";

/**
 *
 * @dependency gh-spinner
 *
 * @slot - The button's label.
 *
 * @event gh-blur - Emitted when the button loses focus.
 * @event gh-focus - Emitted when the button gains focus.
 */
@customElement("gh-button")
export default class GhButton extends LitElement {
  static styles = unsafeCSS(styles);

  @query(".button") button: HTMLButtonElement | HTMLLinkElement | undefined;

  @state() private hasFocus = false;
  @state() private hasLabel = false;

  /** The button's type. */
  @property({ reflect: true }) type: "primary" | "secundary" = "primary";

  /** The button's size. */
  @property({ reflect: true }) size: "small" | "medium" | "large" = "medium";

  /** Draws the button with a arrow for use with dropdowns */
  @property({ type: Boolean, reflect: true }) arrow = false;

  /** Disables the button. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Draws the button in a loading state. */
  @property({ type: Boolean, reflect: true }) loading = false;

  /** An optional value for the button. Ignored when `href` is set. */
  @property() value: string | undefined;

  /** When set, the underlying button will be rendered as an `<a>` with this `href` instead of a `<button>`. */
  @property() href: string | undefined;

  /** Tells the browser where to open the link. Only used when `href` is set. */
  @property() target: "_blank" | "_parent" | "_self" | "_top" = "_blank";

  connectedCallback() {
    super.connectedCallback();
    this.handleSlotChange();
  }

  /** Simulates a click on the button. */
  click() {
    this.button?.click();
  }

  /** Sets focus on the button. */
  focus(options?: FocusOptions) {
    this.button?.focus(options);
  }

  /** Removes focus from the button. */
  blur() {
    this.button?.blur();
  }

  handleSlotChange() {
    this.hasLabel = hasSlot(this);
  }

  handleBlur() {
    this.hasFocus = false;
    emitEvent(this, "gh-blur");
  }

  handleFocus() {
    this.hasFocus = true;
    emitEvent(this, "gh-focus");
  }

  handleClick(event: MouseEvent) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  render() {
    const isLink = this.href ? true : false;

    const interior = html`
      <span part="label" class="button__label">
        <slot @slotchange=${this.handleSlotChange}></slot>
      </span>
      ${this.arrow
        ? html`
            <span part="arrow" class="button__arrow">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          `
        : ""}
      ${this.loading ? html`<gh-spinner></gh-spinner>` : ""}
    `;

    const button = html`
      <button
        part="base"
        class=${classMap({
          button: true,
          "button--primary": this.type === "primary",
          "button--secundary": this.type === "secundary",
          "button--small": this.size === "small",
          "button--medium": this.size === "medium",
          "button--large": this.size === "large",
          "button--arrow": this.arrow,
          "button--disabled": this.disabled,
          "button--focused": this.hasFocus,
          "button--loading": this.loading,
          "button--has-label": this.hasLabel,
        })}
        ?disabled=${this.disabled}
        value=${ifDefined(this.value)}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        ${interior}
      </button>
    `;

const link = html`
      <a
        part="base"
        class=${classMap({
          button: true,
          "button--primary": this.type === "primary",
          "button--secundary": this.type === "secundary",
          "button--small": this.size === "small",
          "button--medium": this.size === "medium",
          "button--large": this.size === "large",
          "button--arrow": this.arrow,
          "button--disabled": this.disabled,
          "button--focused": this.hasFocus,
          "button--loading": this.loading,
          "button--has-label": this.hasLabel,
        })}
        href=${ifDefined(this.href)}
        target=${this.target}
        rel=${ifDefined(this.target ? "noreferrer noopener" : undefined)}
        aria-disabled=${this.disabled ? "true" : "false"}
        ?disabled=${this.disabled}
        tabindex=${this.disabled ? "-1" : "0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        ${interior}
      </a>
    `;

    return isLink ? link : button;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "gh-button": GhButton;
  }
}
