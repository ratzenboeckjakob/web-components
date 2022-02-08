const URL = "../route.json"
class ParentComponent extends HTMLElement {

  static get observedElements() {
    return [];
  }

  
  async download() {
    var response = await fetch(URL);
    var result = await response.json();
    console.log(result)
    return result;
  }


  constructor() {
    super();
    console.log('HelloComponent constructor');
    this.attachShadow({ mode: 'open' });

    this.download().then(r => {
      const ul = document.createElement('ul');
      this.shadowRoot.appendChild(ul);

      for (let i = 0; i < r.length; i++) {
        const child = document.createElement('list-component');
        const li = document.createElement('li');

        child.setAttribute('text', `${r[i].name}`);
        child.addEventListener('list-item-clicked', e => {
          document.getElementById('main').innerText = `csvid: ${r[i].csvId}
                                                      id: ${r[i].id}
                                                      length: ${r[i].length}
                                                      name: ${r[i].name}`;
        });

        li.appendChild(child);
        ul.appendChild(li);
      }
    })

    
  }
}

customElements.define('parent-component', ParentComponent);
