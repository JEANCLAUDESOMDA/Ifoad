/**
 * PATTERN STRATEGY
 * Regroupe les algorithmes de calcul de façon isolée
 */
const Arithmetique = {
    factoriel: (n) => {
        if (n < 0) return "Invalide";
        let res = 1;
        for (let i = 2; i <= n; i++) res *= i;
        return res;
    },
    puissance: (a, b) => Math.pow(a, b),
    racine: (n) => n < 0 ? "Erreur complexe" : Math.sqrt(n).toFixed(2),
    binaire: (n) => parseInt(n).toString(2),
    logarithme: (n) => n <= 0 ? "Erreur ln(x<=0)" : Math.log(n).toFixed(4),
    exponentielle: (n) => Math.exp(n).toFixed(4),
    maximum: (arr) => Math.max(...arr),
    minimum: (arr) => Math.min(...arr),
    moyenne: (arr) => (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2)
};

/**
 * PATTERN PROXY (La touche Magique)
 * Intercepte les appels pour ajouter des logs style "console de hacker"
 */
const CalculateurProxy = new Proxy(Arithmetique, {
    get(target, prop) {
        const log = document.getElementById('console-log');
        log.innerHTML += `<br>> Exécution de : ${prop}...`;
        log.scrollTop = log.scrollHeight;
        return target[prop];
    }
});

// Gestion des éléments du DOM
const select = document.getElementById('fonction');
const inputContainer = document.getElementById('input-container');
const magicForm = document.getElementById('magic-form');
const resultZone = document.getElementById('result-zone');
const output = document.getElementById('output');

// 1. Mise à jour dynamique des champs de saisie
select.addEventListener('change', () => {
    const mode = select.value;
    inputContainer.innerHTML = ''; // Nettoyage
    
    if (['maximum', 'minimum', 'moyenne'].includes(mode)) {
        inputContainer.innerHTML = `
            <div class="col-12">
                <input type="text" id="val1" class="form-control" placeholder="Entrez des nombres séparés par des virgules (ex: 12, 45, 8)">
            </div>`;
    } else if (mode === 'puissance') {
        inputContainer.innerHTML = `
            <div class="col-6"><input type="number" id="val1" class="form-control" placeholder="Base"></div>
            <div class="col-6"><input type="number" id="val2" class="form-control" placeholder="Exposant"></div>`;
    } else if (mode !== "") {
        inputContainer.innerHTML = `
            <div class="col-12"><input type="number" id="val1" class="form-control" placeholder="Entrez la valeur"></div>`;
    }
});

// 2. Calcul et Animation "Magic"
magicForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const mode = select.value;
    let finalResult;

    // Récupération des données
    if (['maximum', 'minimum', 'moyenne'].includes(mode)) {
        const str = document.getElementById('val1').value;
        const numbers = str.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
        finalResult = numbers.length > 0 ? CalculateurProxy[mode](numbers) : "Liste vide";
    } else if (mode === 'puissance') {
        const v1 = parseFloat(document.getElementById('val1').value);
        const v2 = parseFloat(document.getElementById('val2').value);
        finalResult = CalculateurProxy.puissance(v1, v2);
    } else {
        const v1 = parseFloat(document.getElementById('val1').value);
        finalResult = CalculateurProxy[mode](v1);
    }

    // Affichage avec animation
    resultZone.classList.remove('d-none');
    animateResult(finalResult);
});

// Animation numérique fluide
function animateResult(val) {
    if (isNaN(val)) {
        output.innerText = val;
        return;
    }
    
    let current = 0;
    const target = parseFloat(val);
    const step = target / 20;
    
    const interval = setInterval(() => {
        current += step;
        if ((step > 0 && current >= target) || (step < 0 && current <= target)) {
            output.innerText = val;
            clearInterval(interval);
        } else {
            output.innerText = Math.round(current * 100) / 100;
        }
    }, 30);
}