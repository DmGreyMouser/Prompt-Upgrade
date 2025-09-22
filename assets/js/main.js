import { FormRenderer } from './modules/FormRenderer.js';
import { PromptGenerator } from './modules/PromptGenerator.js';

class RealtorToolsApp {
    constructor() {
        this.formRenderer = new FormRenderer();
        this.promptGenerator = new PromptGenerator();
        this.init();
    }

    async init() {
        await this.loadComponents();
        this.setupEventListeners();
    }

    async loadComponents() {
        const header = await fetch('components/header.html').then(r => r.text());
        document.getElementById('app-header').innerHTML = header;
        
        // Charger les autres composants...
    }
}

new RealtorToolsApp();
