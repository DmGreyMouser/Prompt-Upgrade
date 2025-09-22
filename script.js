let currentFramework = '';

function selectFramework(framework) {
    // Réinitialise tous les cards
    document.querySelectorAll('.framework-card').forEach(card => {
        card.classList.remove('active');
    });
    
    // Cache tous les exemples
    document.querySelectorAll('.example-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Active le card sélectionné
    document.getElementById(framework + '-card').classList.add('active');
    
    // Montre l'exemple correspondant
    document.getElementById(framework + '-example').classList.add('active');
    
    currentFramework = framework;
    
    // Met à jour le sélecteur
    document.getElementById('framework-select').value = framework;
    
    // Scroll vers l'exemple
    document.getElementById(framework + '-example').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
}

function generatePrompt() {
    const framework = document.getElementById('framework-select').value;
    const topic = document.getElementById('topic-input').value;
    const goal = document.getElementById('goal-input').value;
    const context = document.getElementById('context-input').value;
    
    if (!framework || !topic) {
        document.getElementById('generated-prompt').innerHTML = 
            'Sélectionne un framework et indique le sujet pour générer ton prompt.';
        document.getElementById('copy-btn').style.display = 'none';
        return;
    }
    
    let prompt = '';
    
    switch(framework) {
        case 'context':
            prompt = `**CONTEXTE :** ${context || 'Précise ton contexte'}
**OBJECTIF :** ${goal || 'Définis ton objectif'}
**NIVEAU :** Détaillé avec exemples concrets
**TONE :** Professionnel et accessible
**EXEMPLES :** Inclure des exemples pratiques
**EXTRA :** [Ajoute tes contraintes spécifiques]
**TÂCHE :** ${topic}`;
            break;
            
        case 'star':
            prompt = `**SITUATION :** ${context || 'Décris la situation actuelle'}
**TÂCHE :** ${topic}
**ACTION :** ${goal || 'Définis l\'action souhaitée'}
**RÉSULTAT :** Format et livrables attendus`;
            break;
            
        case 'clear':
            prompt = `**CLARIFIER :** ${topic}
**LIMITER :** [Définis les contraintes]
**EXEMPLES :** Fournis des exemples concrets
**ACTION :** ${goal || 'Action demandée'}
**RÉSULTAT :** Format de sortie souhaité`;
            break;
            
        case 'creative':
            prompt = `**CRÉATIVITÉ :** Niveau élevé, innovations bienvenues
**RESTRICTIONS :** [Tes limites ou guidelines]
**EXPLORATION :** ${topic}
**AUDIENCE :** [Définis ton public cible]
**TYPE :** ${goal || 'Type de contenu souhaité'}
**ÉVALUATION :** Critères de réussite`;
            break;
            
        case 'problem':
            prompt = `**SITUATION :** ${context || 'Problème actuel'}
**OBSTACLES :** [Difficultés rencontrées]
**LOGIQUE :** Approche méthodique et progressive
**VARIABLES :** Facteurs à considérer
**EXÉCUTION :** ${goal || 'Plan d\'action pour : ' + topic}`;
            break;
            
        case 'learn':
            prompt = `**LEVEL :** [Ton niveau actuel]
**EXPLAIN :** ${topic}
**APPROACH :** ${goal || 'Méthode d\'apprentissage pratique'}
**RELEVANCE :** ${context || 'Application pratique'}
**NEXT :** Étapes suivantes recommandées`;
            break;
    }
    
    document.getElementById('generated-prompt').innerHTML = prompt;
    document.getElementById('copy-btn').style.display = 'inline-block';
}

function copyPrompt() {
    const promptText = document.getElementById('generated-prompt').textContent;
    
    // Créer un élément temporaire pour copier le texte
    const tempElement = document.createElement('textarea');
    tempElement.value = promptText;
    document.body.appendChild(tempElement);
    tempElement.select();
    document.execCommand('copy');
    document.body.removeChild(tempElement);
    
    // Feedback visuel
    const copyBtn = document.getElementById('copy-btn');
    const originalText = copyBtn.textContent;
    copyBtn.textContent = '✅ Copié !';
    copyBtn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
    
    setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.style.background = 'linear-gradient(135deg, var(--accent-color), var(--accent-hover))';
    }, 2000);
}

// Mise à jour du générateur quand on change le framework
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('framework-select').addEventListener('change', function() {
        if (this.value) {
            selectFramework(this.value);
        }
    });
    
    // Animation d'entrée pour les cards
    const cards = document.querySelectorAll('.framework-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Support pour mobile - améliore l'UX tactile
document.addEventListener('DOMContentLoaded', function() {
    // Ajoute une classe pour les appareils tactiles
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
    
    // Améliore le scroll sur mobile
    const examples = document.querySelectorAll('.example-section');
    examples.forEach(example => {
        example.addEventListener('touchstart', function() {
            // Améliore la réactivité tactile
        });
    });
});

// Fonction pour changer de thème (bonus pour plus tard)
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}

// Charge le thème sauvegardé (bonus pour plus tard)
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
});
