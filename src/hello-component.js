class HelloComponent extends HTMLElement {

  #text

  static get observedAttributes() {
    return [ 'text' ];
  }

  constructor() {
    super();
    console.log('HelloComponent constructor');
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    console.log('connected');

    const button = document.createElement('button');
    button.innerText = this.#text;
    button.setAttribute('id', 'button')
    this.shadowRoot.appendChild(button);

    button.addEventListener('click', () => {
      console.log('i was clicked');
      const event = new CustomEvent('button-clicked', { detail: { text: this.#text } });
      this.dispatchEvent(event);
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`attribute ${name} changed to ${newValue}`);

    switch (name) {
      case 'text':
        this.#text = newValue;
        break;
    }
  }

}

customElements.define('hello-component', HelloComponent);
