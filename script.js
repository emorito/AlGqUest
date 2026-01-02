/**
 * AlGqUest - Core Engine
 * Versión: 2.0 (Completa y Mejorada)
 * Descripción: Sistema de aprendizaje de álgebra para niños de 10-12 años.
 */

const gameState = {
    level: 1,
    score: 0,
    currentAnswer: 0,
    attempts: 0
};

// Configuración de niveles por dificultad
const DIFFICULTY_SETTINGS = {
    1: { type: 'sum', range: 10, label: "Suma Básica: x + a = b" },
    2: { type: 'sub', range: 15, label: "Resta Básica: x - a = b" },
    3: { type: 'mult', range: 10, label: "Multiplicación: ax = b" },
    4: { type: 'complex', range: 10, label: "Ecuación de dos pasos: ax + b = c" }
};

/**
 * Inicia una nueva misión basada en el nivel actual
 */
function generateMission() {
    const leftPlate = document.getElementById('equation-left');
    const rightPlate = document.getElementById('equation-right');
    const optionsContainer = document.getElementById('options-container');
    const dropZone = document.getElementById('drop-answer');
    const missionText = document.getElementById('mission-text');
    
    // Reiniciar estado visual
    dropZone.innerText = "?";
    dropZone.classList.remove('correct', 'incorrect');
    gameState.attempts = 0;

    // Determinar dificultad (cada 5 niveles sube la complejidad de la estructura)
    let difficultyTier = Math.min(Math.ceil(gameState.level / 5), 4);
    let setting = DIFFICULTY_SETTINGS[difficultyTier];
    missionText.innerText = setting.label;

    let x = Math.floor(Math.random() * 12) + 1; // El valor de X (lo que el niño debe hallar)
    let a = Math.floor(Math.random() * 10) + 1;
    let b, equationHtmlLeft, equationHtmlRight;

    // Generar la lógica de la ecuación según el nivel
    switch (setting.type) {
        case 'sum': // x + a = b
            b = x + a;
            equationHtmlLeft = `x + ${a}`;
            equationHtmlRight = `${b}`;
            break;
        case 'sub': // x - a = b
            b = x;
            equationHtmlLeft = `x - ${a}`;
            equationHtmlRight = `${x - a}`;
            // Ajuste para que b sea el resultado
            gameState.currentAnswer = x; 
            break;
        case 'mult': // ax = b
            b = a * x;
            equationHtmlLeft = `${a}x`;
            equationHtmlRight = `${b}`;
            break;
        case 'complex': // ax + b = c
            let coeff = Math.floor(Math.random() * 3) + 2;
            let constant = Math.floor(Math.random() * 10) + 1;
            let result = (coeff * x) + constant;
            equationHtmlLeft = `${coeff}x + ${constant}`;
            equationHtmlRight = `${result}`;
            break;
    }

    gameState.currentAnswer = x;
    leftPlate.innerHTML = equationHtmlLeft;
    rightPlate.innerHTML = equationHtmlRight;

    // Actualizar UI de puntos
    document.getElementById('level-val').innerText = gameState.level;
    document.getElementById('score-val').innerText = gameState.score;

    // Generar opciones de respuesta (botones arrastrables)
    generateOptions(x);
}

/**
 * Crea las tarjetas de opciones (1 correcta y 3 falsas)
 */
function generateOptions(correctAnswer) {
    const container = document.getElementById('options-container');
    container.innerHTML = "";
    
    let options = [correctAnswer];
    while(options.length < 4) {
        let fake = Math.floor(Math.random() * (correctAnswer + 15)) + 1;
        if(!options.includes(fake)) options.push(fake);
    }

    // Barajar opciones
    options.sort(() => Math.random() - 0.5);

    options.forEach(val => {
        const card = document.createElement('div');
        card.className = 'option-card';
        card.innerText = val;
        card.draggable = true;
        
        // Eventos de Arrastre (Mouse)
        card.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', val);
            card.classList.add('dragging');
        });

        card.addEventListener('dragend', () => {
            card.classList.remove('dragging');
        });

        // Arrastre táctil (tablets/phones)
        card.addEventListener('pointerdown', (e) => {
            if (e.pointerType !== 'touch' && e.pointerType !== 'pen') {
                return;
            }

            e.preventDefault();
            const dropZone = document.getElementById('drop-answer');
            const originalStyles = {
                position: card.style.position,
                left: card.style.left,
                top: card.style.top,
                zIndex: card.style.zIndex,
                transform: card.style.transform
            };
            const rect = card.getBoundingClientRect();

            card.classList.add('dragging');
            card.style.position = 'fixed';
            card.style.left = `${rect.left}px`;
            card.style.top = `${rect.top}px`;
            card.style.zIndex = '1000';

            const offsetX = e.clientX - rect.left;
            const offsetY = e.clientY - rect.top;

            const moveCard = (moveEvent) => {
                card.style.left = `${moveEvent.clientX - offsetX}px`;
                card.style.top = `${moveEvent.clientY - offsetY}px`;
            };

            const endDrag = (endEvent) => {
                card.classList.remove('dragging');
                card.style.position = originalStyles.position;
                card.style.left = originalStyles.left;
                card.style.top = originalStyles.top;
                card.style.zIndex = originalStyles.zIndex;
                card.style.transform = originalStyles.transform;
                card.releasePointerCapture(endEvent.pointerId);

                const dropRect = dropZone.getBoundingClientRect();
                const isInside =
                    endEvent.clientX >= dropRect.left &&
                    endEvent.clientX <= dropRect.right &&
                    endEvent.clientY >= dropRect.top &&
                    endEvent.clientY <= dropRect.bottom;

                if (isInside) {
                    dropZone.innerText = val;
                    checkAnswer(val);
                }

                card.removeEventListener('pointermove', moveCard);
                card.removeEventListener('pointerup', endDrag);
                card.removeEventListener('pointercancel', endDrag);
            };

            card.setPointerCapture(e.pointerId);
            card.addEventListener('pointermove', moveCard);
            card.addEventListener('pointerup', endDrag);
            card.addEventListener('pointercancel', endDrag);
        });

        container.appendChild(card);
    });
}

/**
 * Configura los receptores del Drag & Drop
 */
function setupDragAndDrop() {
    const dropZone = document.getElementById('drop-answer');

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault(); // Permite que se pueda soltar
        dropZone.style.background = "rgba(255,255,255,0.2)";
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.style.background = "transparent";
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.background = "transparent";
        const val = parseInt(e.dataTransfer.getData('text/plain'));
        
        if (!isNaN(val)) {
            dropZone.innerText = val;
            checkAnswer(val);
        }
    });
}

/**
 * Valida si la respuesta es correcta
 */
function checkAnswer(userValue) {
    const feedback = document.getElementById('feedback');
    const leftPlate = document.getElementById('left-plate');
    const rightPlate = document.getElementById('right-plate');

    if (userValue === gameState.currentAnswer) {
        // ACIERTO
        feedback.innerText = "¡Increíble! Has equilibrado la ecuación. 🏆";
        feedback.style.color = "#2ecc71";
        
        // Animación de equilibrio
        leftPlate.style.transform = "translateY(0)";
        rightPlate.style.transform = "translateY(0)";

        gameState.score += 10;
        gameState.level++;

        setTimeout(() => {
            feedback.innerText = "";
            generateMission();
        }, 1800);

    } else {
        // ERROR
        gameState.attempts++;
        feedback.innerText = "La balanza se inclina... ¡Inténtalo de nuevo! ⚠️";
        feedback.style.color = "#e74c3c";

        // Animación de desequilibrio
        leftPlate.style.transform = "translateY(-20px)";
        rightPlate.style.transform = "translateY(20px)";

        // Ayuda pedagógica si falla mucho
        if(gameState.attempts >= 2) {
            feedback.innerText = `Pista: Intenta aislar la X operando en ambos lados.`;
        }

        setTimeout(() => {
            feedback.innerText = "";
            leftPlate.style.transform = "translateY(0)";
            rightPlate.style.transform = "translateY(0)";
            document.getElementById('drop-answer').innerText = "?";
        }, 1500);
    }
}

// Iniciar la aplicación al cargar la página
window.onload = () => {
    generateMission();
    setupDragAndDrop();
};
