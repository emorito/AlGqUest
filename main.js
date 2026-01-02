// AlgebraQuest - Lógica Principal del Juego
// Versión 2.0 - Corregida y Mejorada

// Estado del Juego
let gameState = {
    playerName: 'Aventurero',
    coins: 0,
    level: 1,
    currentWorld: 'monomio',
    unlockedWorlds: ['monomio'],
    achievements: [],
    avatar: 'robot',
    totalCorrect: 0,
    totalAttempts: 0
};

// Variables del Juego
let currentChallenge = null;
let timer = null;
let timeLeft = 15;
let particleSystem = null;
let audioContext = null;
let p5Instance = null;

// Inicialización segura
document.addEventListener('DOMContentLoaded', function() {
    console.log('AlgebraQuest iniciando...');
    
    try {
        loadGameState();
        initializeAudio();
        initializeParticles();
        updateUI();
        console.log('Juego inicializado correctamente');
    } catch (error) {
        console.error('Error en inicialización:', error);
        // Inicializar con valores por defecto si hay error
        updateUI();
    }
});

// Sistema de Audio mejorado
function initializeAudio() {
    try {
        if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            console.log('AudioContext iniciado');
        } else {
            console.log('Web Audio API no soportada');
        }
    } catch (e) {
        console.log('Error al inicializar audio:', e);
    }
}

function playSound(soundFile) {
    if (!audioContext) {
        console.log('AudioContext no disponible');
        return;
    }
    
    try {
        fetch(soundFile)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.arrayBuffer();
            })
            .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
            .then(audioBuffer => {
                const source = audioContext.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(audioContext.destination);
                source.start();
            })
            .catch(error => console.log('Error playing sound:', error));
    } catch (error) {
        console.log('Error en playSound:', error);
    }
}

// Sistema de Partículas mejorado
function initializeParticles() {
    try {
        p5Instance = new p5(function(p) {
            let particles = [];
            
            p.setup = function() {
                let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
                canvas.parent('particles-canvas');
                
                // Crear partículas iniciales
                for (let i = 0; i < 50; i++) {
                    particles.push(new Particle(p));
                }
            };
            
            p.draw = function() {
                p.clear();
                
                // Actualizar y dibujar partículas
                for (let i = particles.length - 1; i >= 0; i--) {
                    particles[i].update();
                    particles[i].display();
                    
                    if (particles[i].isDead()) {
                        particles.splice(i, 1);
                    }
                }
                
                // Añadir nuevas partículas
                if (particles.length < 50 && p.random() < 0.02) {
                    particles.push(new Particle(p));
                }
            };
            
            p.windowResized = function() {
                p.resizeCanvas(p.windowWidth, p.windowHeight);
            };
            
            // Clase Particle
            function Particle(p) {
                this.x = p.random(p.width);
                this.y = p.random(p.height);
                this.vx = p.random(-0.5, 0.5);
                this.vy = p.random(-0.5, 0.5);
                this.life = 255;
                this.symbol = p.random(['x', 'y', '+', '-', '×', '÷', '²', '³']);
                this.color = p.random(['#00BFFF', '#32CD32', '#FF6347', '#9370DB']);
                
                this.update = function() {
                    this.x += this.vx;
                    this.y += this.vy;
                    this.life -= 0.5;
                    
                    // Wrap around edges
                    if (this.x < 0) this.x = p.width;
                    if (this.x > p.width) this.x = 0;
                    if (this.y < 0) this.y = p.height;
                    if (this.y > p.height) this.y = 0;
                };
                
                this.display = function() {
                    p.push();
                    try {
                        const alpha = Math.floor(this.life / 255 * 100);
                        p.fill(this.color + (alpha < 16 ? '0' : '') + alpha.toString(16));
                        p.noStroke();
                        p.textAlign(p.CENTER, p.CENTER);
                        p.textSize(20);
                        p.text(this.symbol, this.x, this.y);
                    } catch (e) {
                        // Silenciar errores de rendering
                    }
                    p.pop();
                };
                
                this.isDead = function() {
                    return this.life <= 0;
                };
            }
        });
    } catch (error) {
        console.log('Error al inicializar partículas:', error);
    }
}

// Gestión de Estado
function saveGameState() {
    try {
        localStorage.setItem('algebraQuest', JSON.stringify(gameState));
    } catch (error) {
        console.log('Error al guardar estado:', error);
    }
}

function loadGameState() {
    try {
        const saved = localStorage.getItem('algebraQuest');
        if (saved) {
            const parsedState = JSON.parse(saved);
            gameState = { ...gameState, ...parsedState };
            console.log('Estado cargado:', gameState);
        }
    } catch (error) {
        console.log('Error al cargar estado:', error);
    }
}

function updateUI() {
    try {
        const playerNameEl = document.getElementById('player-name');
        const coinsEl = document.getElementById('coins');
        const levelEl = document.getElementById('current-level');
        const worldEl = document.getElementById('current-world');
        
        if (playerNameEl) playerNameEl.textContent = gameState.playerName;
        if (coinsEl) coinsEl.textContent = gameState.coins;
        if (levelEl) levelEl.textContent = gameState.level;
        if (worldEl) worldEl.textContent = gameState.currentWorld.charAt(0).toUpperCase() + gameState.currentWorld.slice(1);
    } catch (error) {
        console.log('Error actualizando UI:', error);
    }
}

// Navegación
function startGame() {
    try {
        document.getElementById('start-screen').classList.add('hidden');
        document.getElementById('game-screen').classList.remove('hidden');
        updateWorlds();
        console.log('Juego iniciado');
    } catch (error) {
        console.log('Error en startGame:', error);
    }
}

function showTutorial() {
    try {
        document.getElementById('tutorial-modal').classList.remove('hidden');
    } catch (error) {
        console.log('Error en showTutorial:', error);
    }
}

function closeTutorial() {
    try {
        document.getElementById('tutorial-modal').classList.add('hidden');
    } catch (error) {
        console.log('Error en closeTutorial:', error);
    }
}

function showAvatar() {
    try {
        document.getElementById('avatar-modal').classList.remove('hidden');
    } catch (error) {
        console.log('Error en showAvatar:', error);
    }
}

function selectAvatar(type) {
    gameState.avatar = type;
    // Visual feedback
    document.querySelectorAll('.avatar-option').forEach(el => el.classList.remove('ring-4', 'ring-yellow-400'));
    if (event && event.target) {
        event.target.closest('.avatar-option').classList.add('ring-4', 'ring-yellow-400');
    }
}

function saveAvatar() {
    try {
        const nameInput = document.getElementById('player-name-input');
        const name = nameInput ? nameInput.value.trim() : '';
        if (name) {
            gameState.playerName = name;
        }
        saveGameState();
        updateUI();
        document.getElementById('avatar-modal').classList.add('hidden');
        showAchievement('Avatar Personalizado', '¡Has personalizado tu avatar!');
    } catch (error) {
        console.log('Error en saveAvatar:', error);
    }
}

// Sistema de Mundos
function updateWorlds() {
    try {
        const worldCards = document.querySelectorAll('.world-card');
        const worlds = ['monomio', 'binomio', 'trinomio', 'cuatrinomio'];
        
        worldCards.forEach((card, index) => {
            const world = worlds[index];
            if (gameState.unlockedWorlds.includes(world)) {
                card.classList.remove('opacity-50');
                card.style.cursor = 'pointer';
            } else {
                card.classList.add('opacity-50');
                card.style.cursor = 'not-allowed';
            }
        });
    } catch (error) {
        console.log('Error en updateWorlds:', error);
    }
}

function selectWorld(world) {
    if (!gameState.unlockedWorlds.includes(world)) {
        showNotification('¡Este mundo está bloqueado! Completa los niveles anteriores para desbloquearlo.');
        return;
    }
    
    gameState.currentWorld = world;
    try {
        document.getElementById('worlds-map').classList.add('hidden');
        document.getElementById('challenges').classList.remove('hidden');
        updateUI();
    } catch (error) {
        console.log('Error en selectWorld:', error);
    }
}

// Sistema de Desafíos
function startChallenge(type) {
    currentChallenge = type;
    try {
        document.getElementById('challenges').classList.add('hidden');
        document.getElementById('game-area').classList.remove('hidden');
        
        // Ocultar todas las áreas
        document.getElementById('battle-area').classList.add('hidden');
        document.getElementById('builder-area').classList.add('hidden');
        document.getElementById('sorting-area').classList.add('hidden');
        
        switch(type) {
            case 'battle':
                startBattleChallenge();
                break;
            case 'builder':
                startBuilderChallenge();
                break;
            case 'sorting':
                startSortingChallenge();
                break;
        }
    } catch (error) {
        console.log('Error en startChallenge:', error);
    }
}

// Desafío: Batalla Rápida
function startBattleChallenge() {
    try {
        document.getElementById('battle-area').classList.remove('hidden');
        generateBattleProblem();
        startTimer();
    } catch (error) {
        console.log('Error en startBattleChallenge:', error);
    }
}

function generateBattleProblem() {
    try {
        const problems = getProblemsByLevel(gameState.level);
        const problem = problems[Math.floor(Math.random() * problems.length)];
        
        const problemEl = document.getElementById('math-problem');
        if (problemEl) problemEl.textContent = problem.question;
        
        const optionsContainer = document.getElementById('battle-options');
        if (optionsContainer) {
            optionsContainer.innerHTML = '';
            
            const options = [problem.correct, ...problem.incorrect];
            // Mezclar opciones
            for (let i = options.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [options[i], options[j]] = [options[j], options[i]];
            }
            
            options.forEach((option, index) => {
                const button = document.createElement('button');
                button.className = 'option-button bg-gradient-to-br from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-bold py-4 px-6 rounded-2xl text-xl';
                button.textContent = option;
                button.onclick = () => checkBattleAnswer(option, problem.correct);
                optionsContainer.appendChild(button);
            });
        }
    } catch (error) {
        console.log('Error en generateBattleProblem:', error);
    }
}

function checkBattleAnswer(selected, correct) {
    clearInterval(timer);
    gameState.totalAttempts++;
    
    try {
        const buttons = document.querySelectorAll('.option-button');
        buttons.forEach(button => {
            button.disabled = true;
            if (button.textContent === correct) {
                button.classList.add('correct-answer');
            } else if (button.textContent === selected && selected !== correct) {
                button.classList.add('wrong-answer');
            }
        });
        
        if (selected === correct) {
            gameState.totalCorrect++;
            const coinsEarned = 10 + Math.floor(timeLeft * 2);
            gameState.coins += coinsEarned;
            playSound('resources/success.mp3');
            
            setTimeout(() => {
                showVictory(coinsEarned);
            }, 1000);
        } else {
            setTimeout(() => {
                showNotification('¡Casi! La respuesta correcta era: ' + correct);
                generateBattleProblem();
                startTimer();
            }, 2000);
        }
        
        saveGameState();
        updateUI();
    } catch (error) {
        console.log('Error en checkBattleAnswer:', error);
    }
}

function startTimer() {
    timeLeft = 15;
    const timerEl = document.getElementById('timer');
    if (timerEl) timerEl.textContent = timeLeft;
    
    timer = setInterval(() => {
        timeLeft--;
        if (timerEl) timerEl.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            showNotification('¡Se acabó el tiempo! Intenta de nuevo.');
            setTimeout(() => {
                generateBattleProblem();
                startTimer();
            }, 2000);
        }
    }, 1000);
}

// Desafío: Constructor
function startBuilderChallenge() {
    try {
        document.getElementById('builder-area').classList.remove('hidden');
        generateBuilderProblem();
    } catch (error) {
        console.log('Error en startBuilderChallenge:', error);
    }
}

function generateBuilderProblem() {
    try {
        const problems = getProblemsByLevel(gameState.level);
        const problem = problems[Math.floor(Math.random() * problems.length)];
        
        const targetEl = document.getElementById('builder-target');
        const resultEl = document.getElementById('builder-result');
        
        if (targetEl) targetEl.textContent = problem.question.replace(' = ?', '');
        if (resultEl) resultEl.textContent = 'Arrastra los elementos aquí';
        
        const pieces = problem.pieces || ['3x', '+', '5x', '8x'];
        const piecesContainer = document.getElementById('builder-pieces');
        if (piecesContainer) {
            piecesContainer.innerHTML = '';
            
            pieces.forEach(piece => {
                const button = document.createElement('button');
                button.className = 'bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-xl text-lg transition-all duration-300';
                button.textContent = piece;
                button.draggable = true;
                button.ondragstart = (e) => {
                    e.dataTransfer.setData('text', piece);
                };
                piecesContainer.appendChild(button);
            });
            
            // Configurar área de destino
            if (resultEl) {
                resultEl.ondragover = (e) => e.preventDefault();
                resultEl.ondrop = (e) => {
                    e.preventDefault();
                    const piece = e.dataTransfer.getData('text');
                    const current = resultEl.textContent;
                    resultEl.textContent = current === 'Arrastra los elementos aquí' ? piece : current + ' ' + piece;
                };
            }
        }
    } catch (error) {
        console.log('Error en generateBuilderProblem:', error);
    }
}

function checkBuilderAnswer() {
    try {
        const userAnswer = document.getElementById('builder-result').textContent;
        const target = document.getElementById('builder-target').textContent;
        
        // Simplificar la respuesta (esto es una versión básica)
        const isCorrect = evaluateExpression(userAnswer) === evaluateExpression(target);
        
        if (isCorrect) {
            const coinsEarned = 25;
            gameState.coins += coinsEarned;
            gameState.totalCorrect++;
            playSound('resources/success.mp3');
            saveGameState();
            updateUI();
            setTimeout(() => showVictory(coinsEarned), 500);
        } else {
            showNotification('¡Casi! Intenta construir la expresión correcta.');
            generateBuilderProblem();
        }
        
        gameState.totalAttempts++;
    } catch (error) {
        console.log('Error en checkBuilderAnswer:', error);
    }
}

// Desafío: Clasificación
function startSortingChallenge() {
    try {
        document.getElementById('sorting-area').classList.remove('hidden');
        generateSortingProblem();
    } catch (error) {
        console.log('Error en startSortingChallenge:', error);
    }
}

function generateSortingProblem() {
    try {
        const expressions = [
            { expr: '3x', type: 'monomio' },
            { expr: 'x + 2', type: 'binomio' },
            { expr: '2x² + x + 1', type: 'trinomio' },
            { expr: '5y', type: 'monomio' },
            { expr: '3y - 4', type: 'binomio' },
            { expr: 'x² + 2x + 3', type: 'trinomio' },
            { expr: '7', type: 'monomio' },
            { expr: '2a + b', type: 'binomio' }
        ];
        
        // Mezclar expresiones
        for (let i = expressions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [expressions[i], expressions[j]] = [expressions[j], expressions[i]];
        }
        
        const container = document.getElementById('sorting-expressions');
        if (container) {
            container.innerHTML = '';
            
            expressions.forEach((item, index) => {
                const div = document.createElement('div');
                div.className = 'bg-gradient-to-br from-yellow-500 to-orange-600 text-white font-bold py-3 px-4 rounded-xl text-lg cursor-move transition-all duration-300 hover:scale-105';
                div.textContent = item.expr;
                div.draggable = true;
                div.dataset.type = item.type;
                div.id = `expr-${index}`;
                
                div.ondragstart = (e) => {
                    e.dataTransfer.setData('text/plain', e.target.id);
                };
                
                container.appendChild(div);
            });
            
            // Configurar áreas de destino
            ['monomio', 'binomio', 'trinomio'].forEach(type => {
                const bin = document.getElementById(`${type}-bin`);
                if (bin) {
                    bin.ondragover = (e) => e.preventDefault();
                    bin.ondrop = (e) => {
                        e.preventDefault();
                        const elementId = e.dataTransfer.getData('text/plain');
                        const element = document.getElementById(elementId);
                        if (element && bin) bin.appendChild(element);
                    };
                }
            });
        }
    } catch (error) {
        console.log('Error en generateSortingProblem:', error);
    }
}

function checkSortingAnswer() {
    try {
        let correct = 0;
        let total = 0;
        
        ['monomio', 'binomio', 'trinomio'].forEach(type => {
            const bin = document.getElementById(`${type}-bin`);
            if (bin) {
                const items = bin.querySelectorAll('[data-type]');
                
                items.forEach(item => {
                    total++;
                    if (item.dataset.type === type) {
                        correct++;
                        item.classList.add('bg-green-600');
                    } else {
                        item.classList.add('bg-red-600');
                    }
                });
            }
        });
        
        if (correct === total && total > 0) {
            const coinsEarned = 30;
            gameState.coins += coinsEarned;
            gameState.totalCorrect++;
            playSound('resources/success.mp3');
            saveGameState();
            updateUI();
            setTimeout(() => showVictory(coinsEarned), 1000);
        } else {
            showNotification(`Tienes ${correct} de ${total} correctas. ¡Intenta de nuevo!`);
            setTimeout(() => {
                generateSortingProblem();
            }, 2000);
        }
        
        gameState.totalAttempts++;
    } catch (error) {
        console.log('Error en checkSortingAnswer:', error);
    }
}

// Sistema de Problemas
function getProblemsByLevel(level) {
    if (level <= 25) {
        // Mundo Monomio
        return [
            {
                question: '3x + 5x = ?',
                correct: '8x',
                incorrect: ['7x', '15x', '8'],
                pieces: ['3x', '+', '5x', '8x']
            },
            {
                question: '2y + 4y = ?',
                correct: '6y',
                incorrect: ['8y', '6', '2y'],
                pieces: ['2y', '+', '4y', '6y']
            },
            {
                question: '7x - 3x = ?',
                correct: '4x',
                incorrect: ['10x', '4', '21x'],
                pieces: ['7x', '-', '3x', '4x']
            },
            {
                question: '5a + 2a = ?',
                correct: '7a',
                incorrect: ['10a', '7', '3a'],
                pieces: ['5a', '+', '2a', '7a']
            },
            {
                question: '9x - 4x = ?',
                correct: '5x',
                incorrect: ['13x', '5', '36x'],
                pieces: ['9x', '-', '4x', '5x']
            }
        ];
    } else if (level <= 50) {
        // Valle Binomio
        return [
            {
                question: '(x + 2) + (3x - 1) = ?',
                correct: '4x + 1',
                incorrect: ['4x + 3', '5x + 1', '3x + 3'],
                pieces: ['x', '+', '2', '+', '3x', '-', '1', '4x + 1']
            },
            {
                question: '(2y - 3) + (y + 5) = ?',
                correct: '3y + 2',
                incorrect: ['3y + 8', '2y + 2', '3y - 2'],
                pieces: ['2y', '-', '3', '+', 'y', '+', '5', '3y + 2']
            },
            {
                question: '(3x + 4) + (2x - 2) = ?',
                correct: '5x + 2',
                incorrect: ['5x + 6', '6x + 2', '5x + 8'],
                pieces: ['3x', '+', '4', '+', '2x', '-', '2', '5x + 2']
            }
        ];
    } else if (level <= 75) {
        // Montaña Trinomio
        return [
            {
                question: 'x² + 2x + 1 es un:',
                correct: 'Trinomio',
                incorrect: ['Monomio', 'Binomio', 'Cuatrinomio'],
                pieces: ['x²', '+', '2x', '+', '1']
            },
            {
                question: '2x² + 3x - 5 es un:',
                correct: 'Trinomio',
                incorrect: ['Binomio', 'Monomio', 'Cuatrinomio'],
                pieces: ['2x²', '+', '3x', '-', '5']
            },
            {
                question: 'x² + x + 1 es un:',
                correct: 'Trinomio',
                incorrect: ['Binomio', 'Monomio', 'Cuatrinomio'],
                pieces: ['x²', '+', 'x', '+', '1']
            }
        ];
    } else {
        // Cueva Cuatrinomio
        return [
            {
                question: 'x³ + x² + x + 1 es un:',
                correct: 'Cuatrinomio',
                incorrect: ['Trinomio', 'Binomio', 'Monomio'],
                pieces: ['x³', '+', 'x²', '+', 'x', '+', '1']
            },
            {
                question: '2x³ - x² + 3x - 4 es un:',
                correct: 'Cuatrinomio',
                incorrect: ['Trinomio', 'Binomio', 'Monomio'],
                pieces: ['2x³', '-', 'x²', '+', '3x', '-', '4']
            }
        ];
    }
}

// Utilidades
function evaluateExpression(expr) {
    // Esta es una función simplificada para evaluar expresiones algebraicas básicas
    // En una aplicación real, se usaría un parser más sofisticado
    try {
        // Eliminar espacios y convertir x^2 a x*x
        let simplified = expr.replace(/\s/g, '').replace(/x\^2/g, 'x*x');
        // Evaluar para x=1 como prueba
        simplified = simplified.replace(/x/g, '1');
        return eval(simplified);
    } catch (e) {
        return NaN;
    }
}

// Sistema de Victoria
function showVictory(coinsEarned) {
    try {
        document.getElementById('game-area').classList.add('hidden');
        document.getElementById('victory-screen').classList.remove('hidden');
        
        const coinsEarnedEl = document.getElementById('coins-earned');
        const totalCoinsEl = document.getElementById('total-coins');
        
        if (coinsEarnedEl) coinsEarnedEl.textContent = `+${coinsEarned}`;
        if (totalCoinsEl) totalCoinsEl.textContent = gameState.coins;
        
        // Animación de monedas
        if (typeof anime !== 'undefined') {
            anime({
                targets: '#coins-earned',
                scale: [0, 1.2, 1],
                duration: 1000,
                easing: 'easeOutElastic(1, .8)'
            });
        }
        
        playSound('resources/coin.mp3');
        
        // Verificar logros
        checkAchievements();
    } catch (error) {
        console.log('Error en showVictory:', error);
    }
}

function nextChallenge() {
    try {
        document.getElementById('victory-screen').classList.add('hidden');
        document.getElementById('game-area').classList.remove('hidden');
        
        // Continuar con el mismo tipo de desafío
        startChallenge(currentChallenge);
        
        // Subir de nivel cada 5 respuestas correctas
        if (gameState.totalCorrect % 5 === 0 && gameState.totalCorrect > 0) {
            gameState.level++;
            updateUI();
            showAchievement('¡Subiste de Nivel!', `Ahora eres nivel ${gameState.level}`);
            
            // Desbloquear nuevos mundos
            if (gameState.level === 26 && !gameState.unlockedWorlds.includes('binomio')) {
                gameState.unlockedWorlds.push('binomio');
                showAchievement('¡Mundo Desbloqueado!', 'Has desbloqueado el Valle Binomio');
            } else if (gameState.level === 51 && !gameState.unlockedWorlds.includes('trinomio')) {
                gameState.unlockedWorlds.push('trinomio');
                showAchievement('¡Mundo Desbloqueado!', 'Has desbloqueado la Montaña Trinomio');
            } else if (gameState.level === 76 && !gameState.unlockedWorlds.includes('cuatrinomio')) {
                gameState.unlockedWorlds.push('cuatrinomio');
                showAchievement('¡Mundo Desbloqueado!', 'Has desbloqueado la Cueva Cuatrinomio');
            }
            
            updateWorlds();
        }
    } catch (error) {
        console.log('Error en nextChallenge:', error);
    }
}

function backToMenu() {
    try {
        document.getElementById('victory-screen').classList.add('hidden');
        document.getElementById('game-area').classList.add('hidden');
        document.getElementById('challenges').classList.add('hidden');
        document.getElementById('worlds-map').classList.remove('hidden');
    } catch (error) {
        console.log('Error en backToMenu:', error);
    }
}

// Sistema de Logros
function checkAchievements() {
    const achievements = [
        { id: 'first_win', condition: () => gameState.totalCorrect >= 1, title: 'Primer Problema', desc: '¡Resolviste tu primer problema!' },
        { id: 'streak_5', condition: () => gameState.totalCorrect >= 5, title: 'Racha de 5', desc: '¡5 problemas correctos!' },
        { id: 'streak_10', condition: () => gameState.totalCorrect >= 10, title: 'En Fuego', desc: '¡10 problemas correctos!' },
        { id: 'coin_100', condition: () => gameState.coins >= 100, title: 'Coleccionista', desc: '¡Has recolectado 100 monedas!' },
        { id: 'level_10', condition: () => gameState.level >= 10, title: 'Experto', desc: '¡Llegaste al nivel 10!' }
    ];
    
    achievements.forEach(achievement => {
        if (!gameState.achievements.includes(achievement.id) && achievement.condition()) {
            gameState.achievements.push(achievement.id);
            showAchievement(achievement.title, achievement.desc);
            saveGameState();
        }
    });
}

function showAchievement(title, description) {
    try {
        const notification = document.getElementById('achievement-notification');
        const textEl = document.getElementById('achievement-text');
        
        if (textEl) textEl.textContent = description;
        if (notification) {
            notification.classList.remove('hidden');
            
            if (typeof anime !== 'undefined') {
                anime({
                    targets: notification,
                    translateX: [300, 0],
                    opacity: [0, 1],
                    duration: 500,
                    easing: 'easeOutCubic'
                });
            }
            
            setTimeout(() => {
                if (typeof anime !== 'undefined') {
                    anime({
                        targets: notification,
                        translateX: [0, 300],
                        opacity: [1, 0],
                        duration: 500,
                        easing: 'easeInCubic',
                        complete: () => notification.classList.add('hidden')
                    });
                } else {
                    notification.classList.add('hidden');
                }
            }, 3000);
        }
    } catch (error) {
        console.log('Error en showAchievement:', error);
    }
}

// Mascota Mathy
function mathyHelp() {
    const tips = [
        '¡Recuerda! Un monomio tiene solo un término, como 3x o 5y²',
        'Tip: Para sumar monomios, los términos deben ser semejantes (tener la misma variable)',
        '¡Los binomios tienen dos términos! Como x + 2 o 3y - 5',
        'Consejo: Suma los coeficientes cuando las variables sean iguales',
        '¡Sigue practicando! La práctica hace al maestro en matemáticas',
        '¡No te rindas! Cada error es una oportunidad de aprender',
        'Los trinomios tienen tres términos, como x² + 2x + 1'
    ];
    
    const tip = tips[Math.floor(Math.random() * tips.length)];
    showNotification(tip);
    
    // Animar a Mathy
    if (typeof anime !== 'undefined') {
        anime({
            targets: '#mathy-avatar',
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
            duration: 1000,
            easing: 'easeOutElastic(1, .8)'
        });
    }
}

function showNotification(message) {
    try {
        // Crear notificación temporal
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white p-4 rounded-2xl shadow-2xl z-50 max-w-md text-center';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        if (typeof anime !== 'undefined') {
            anime({
                targets: notification,
                translateY: [-50, 0],
                opacity: [0, 1],
                duration: 500,
                easing: 'easeOutCubic'
            });
            
            setTimeout(() => {
                anime({
                    targets: notification,
                    translateY: [0, -50],
                    opacity: [1, 0],
                    duration: 500,
                    easing: 'easeInCubic',
                    complete: () => {
                        if (document.body.contains(notification)) {
                            document.body.removeChild(notification);
                        }
                    }
                });
            }, 4000);
        } else {
            // Sin animación
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 4000);
        }
    } catch (error) {
        console.log('Error en showNotification:', error);
    }
}

// Función de respaldo para cuando las librerías no carguen
window.addEventListener('load', function() {
    console.log('AlgebraQuest completamente cargado');
    
    // Verificar que todo esté funcionando
    if (typeof anime === 'undefined') {
        console.log('Anime.js no cargado, usando funciones básicas');
    }
    
    if (typeof p5 === 'undefined') {
        console.log('p5.js no cargado, sistema de partículas desactivado');
    }
    
    // Añadir event listeners de respaldo
    const startButton = document.querySelector('button[onclick="startGame()"]');
    if (startButton) {
        startButton.addEventListener('click', function() {
            if (typeof startGame === 'function') {
                startGame();
            }
        });
    }
});