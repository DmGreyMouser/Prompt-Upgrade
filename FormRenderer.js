class FormRenderer {
  constructor(config) {
    this.config = config;
    this.container = null;
  }

  async loadConfig(configPath) {
    const response = await fetch(configPath);
    return await response.json();
  }

  renderForm(containerId) {
    const container = document.getElementById(containerId);
    const formHTML = this.buildFormHTML();
    container.innerHTML = formHTML;
    this.attachEventListeners();
  }

  buildFormHTML() {
    return this.config.sections.map(section => 
      this.renderSection(section)
    ).join('');
  }

  renderSection(section) {
    return `
      <div class="form-column" data-column="${section.column}">
        <div class="field-group">
          <div class="group-title">${section.icon} ${section.title}</div>
          ${section.fields.map(field => this.renderField(field)).join('')}
        </div>
      </div>
    `;
  }
}