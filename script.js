function generateDescription() {
    // Récupérer toutes les valeurs
    const propertyType = document.getElementById('property-type').value;
    const description = document.getElementById('description').value;
    const city = document.getElementById('city').value;
    const neighborhood = document.getElementById('neighborhood').value;
    const bedrooms = document.getElementById('bedrooms').value;
    const bathrooms = document.getElementById('bathrooms').value;
    const surface = document.getElementById('surface').value;
    const price = document.getElementById('price').value;
    const features = document.getElementById('features').value;
    const proximity = document.getElementById('proximity').value;
    const tone = document.querySelector('input[name="tone"]:checked').value;
    const targetAudience = document.getElementById('target-audience').value;
    const centrisUrl = document.getElementById('centris-url').value;

    // Validation des champs obligatoires
    if (!propertyType || !description || !city || !neighborhood) {
        alert('Veuillez remplir tous les champs obligatoires (*)');
        return;
    }

    // Générer le prompt
    let prompt = `**TYPE DE PROPRIÉTÉ :** ${propertyType}
**LOCALISATION :** ${neighborhood}, ${city}
**DESCRIPTION DE BASE :** ${description}
**TON :** ${tone}`;

    if (bedrooms) prompt += `\n**CHAMBRES :** ${bedrooms}`;
    if (bathrooms) prompt += `\n**SALLES DE BAIN :** ${bathrooms}`;
    if (surface) prompt += `\n**SUPERFICIE :** ${surface} pi²`;
    if (price) prompt += `\n**PRIX :** ${new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD' }).format(price)}`;
    if (features) prompt += `\n**CARACTÉRISTIQUES SPÉCIALES :** ${features}`;
    if (proximity) prompt += `\n**PROXIMITÉ :** ${proximity}`;
    if (targetAudience) prompt += `\n**PUBLIC CIBLE :** ${targetAudience}`;
    if (centrisUrl) prompt += `\n**RÉFÉRENCE CENTRIS :** ${centrisUrl}`;

    prompt += `\n\n**INSTRUCTION :**
Rédige une description immobilière ${tone} et attrayante pour cette ${propertyType}. La description doit :
- Mettre en valeur les points forts de la propriété
- Adapter le langage au ton ${tone}
- Être optimisée pour attirer ${targetAudience || 'les acheteurs potentiels'}
- Inclure des détails sur la localisation et les commodités
- Faire environ 150-200 mots
- Utiliser un style qui incite à la visite`;

    // Afficher le résultat
    document.getElementById('placeholder').style.display = 'none';
    document.getElementById('result-text').style.display = 'block';
    document.getElementById('result-text').textContent = prompt;
    document.getElementById('copy-btn').style.display = 'block';

    // Animation
    document.getElementById('result-text').classList.add('animate-up');
}

function copyDescription() {
    const resultText = document.getElementById('result-text').textContent;
    navigator.clipboard.writeText(resultText).then(() => {
        const copyBtn = document.getElementById('copy-btn');
        copyBtn.textContent = '✅ Copié !';
        copyBtn.classList.add('success');
        
        setTimeout(() => {
            copyBtn.textContent = '📋 Copier';
            copyBtn.classList.remove('success');
        }, 2000);
    });
}

// Animation d'entrée pour les éléments
document.addEventListener('DOMContentLoaded', function() {
    // Animation pour les champs de formulaire
    const fieldGroups = document.querySelectorAll('.field-group');
    fieldGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        setTimeout(() => {
            group.style.transition = 'all 0.5s ease';
            group.style.opacity = '1';
            group.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Support amélioré pour mobile
document.addEventListener('DOMContentLoaded', function() {
    // Détection tactile
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
    
    // Amélioration UX pour les champs de saisie sur mobile
    const inputs = document.querySelectorAll('.input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            // Scroll vers l'input pour éviter que le clavier le cache
            setTimeout(() => {
                this.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 300);
        });
    });
});
