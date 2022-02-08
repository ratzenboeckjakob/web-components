class ListComponent extends HTMLElement {

  #text

  static get observedAttributes() {
    return [ 'text' ];
  }

  constructor() {
    super();
    //console.log('ListComponent constructor');
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    //console.log('connected');

    const span = document.createElement('span');
    span.innerText = this.#text;
    this.shadowRoot.appendChild(span);

    this.shadowRoot.addEventListener('click', () => {
      console.log('i was clicked', this);
      const event = new CustomEvent('list-item-clicked', { detail: { text: this.#text } });
      this.dispatchEvent(event);
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    //console.log(`attribute ${name} changed to ${newValue}`);

    switch (name) {
      case 'text':
        this.#text = newValue;
        break;
    }
  }

}

customElements.define('list-component', ListComponent);
