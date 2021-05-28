import { LitElement, html, PropertyValues, unsafeCSS } from "lit";
import { customElement, property, query, state } from "lit/decorators";
import { classMap } from "lit-html/directives/class-map";
import { isObject, isEmptyObject} from "../../utilities/objectHandling";
import ResizeObserver from 'resize-observer-polyfill';
import styles from "./datatable.scss";

export interface Conf {
  header: string;
  property: string;
}

let resizeObserver: ResizeObserver;

@customElement("gh-datatable")
export default class GhDatatable extends LitElement {
  static styles = unsafeCSS(styles);

  @query('.table') table! : HTMLTableElement;

  @state() private hasWidth = false;

  /** Data to be mounted in the body of the table. */
  @property({ type: Array }) data: Array<unknown> = [];

  /** Configuration of the table's header. */
  @property({ type: Array }) conf: Array<Conf> = [];

  /** Numbers of items in conf list */
  @property({ type: Number }) confSize = 0;

  /** Numbers of items in data list */
  @property({ type: Number }) dataSize = 0;

  /** Breakpoint in pixels for the table display change */
  @property({ type: Number, attribute: 'width-to-collapse', reflect: true }) widthToCollapse = 500;

  firstUpdated() {
    resizeObserver = new ResizeObserver((entries: Array<ResizeObserverEntry>)  => {
      entries.forEach(({ contentRect } ) => this.hasWidth = contentRect.width >  this.widthToCollapse);
    });

    resizeObserver.observe(this.table);
  }

  update(changedProperties: PropertyValues<this>) {
    super.update(changedProperties);

    if (changedProperties.has('data')) {
      this.dataSize = this.data.length;
    }

    if (changedProperties.has('conf')) {
      this.confSize = this.conf.length;
    }
  }

  generateTableDataCell(data: Object) {
    const titles = Object.keys(data);
    const values = Object.values(data);

    return titles.map(
      (title, titleIndex) => html`<td class="table__cell table__cell--data" title=${title}>${values[titleIndex]}</td>`
    );
  }

  render() {
    const tableHeader = html`
      <thead 
        class="table__header"
        aria-hidden=${this.hasWidth ? "false" : "true"}
        ?hidden=${!this.hasWidth}
      >
        <tr class="table__row">
          ${this.conf.map((item) =>
            html`<th class="table__cell table__cell--header" title=${item.property}>${item.header}</th>`
          )}
        </tr>
      </thead>
    `; 

    const tableBody = html`
      <tbody class="table__body">
          ${this.data.map((item, lineIndex) => {
            const dataRow: Object = isObject(item) ? (item as Object) : {};
            
            return !isEmptyObject(dataRow) 
              ? html`
                <tr class="table__row" key=${lineIndex} class="table__row">
                  ${this.generateTableDataCell(dataRow)}
                </tr>
              `
              : '';
          })}
      </tbody>
    `;

    const table = html`
      <table 
        class=${classMap({
          table: true,
          "table--collapsed": !this.hasWidth
        })}
      >
        ${this.confSize >= 1 ? tableHeader : ''}
        ${this.dataSize >= 1 ? tableBody : ''}
      </table>
    `
    return table;
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    resizeObserver.observe(this.table);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "gh-datatable": GhDatatable;
  }
}
