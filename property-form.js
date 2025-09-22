class PropertyForm extends HTMLElement {
  async connectedCallback() {
    const config = await this.loadConfig();
    this.innerHTML = await this.render(config);
    this.setupEventListeners();
  }

  async loadConfig() {
    return fetch('./data/form-fields.json').then(r => r.json());
  }
}

customElements.define('property-form', PropertyForm);