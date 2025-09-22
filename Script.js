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
**LOGIQUE :**
