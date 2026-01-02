:root {
    --primary: #4a90e2;
    --success: #2ecc71;
    --error: #e74c3c;
    --accent: #f1c40f;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: #2c3e50;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

#game-container {
    background: #34495e;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    text-align: center;
    width: 90%;
    max-width: 600px;
}

.balance-container {
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    margin: 40px 0;
    height: 150px;
}

.plate {
    background: var(--accent);
    color: #333;
    padding: 20px;
    border-radius: 10px;
    min-width: 100px;
    font-size: 2rem;
    font-weight: bold;
    transition: transform 0.3s ease;
}

.pivot { font-size: 3rem; color: #95a5a6; }

.drop-target {
    border: 3px dashed white;
    width: 80px;
    height: 80px;
    margin: 20px auto;
    line-height: 80px;
    font-size: 1.5rem;
    border-radius: 10px;
}

.option-card {
    display: inline-block;
    background: white;
    color: #333;
    padding: 15px 25px;
    margin: 10px;
    border-radius: 8px;
    cursor: grab;
    font-weight: bold;
    font-size: 1.2rem;
}

.dragging { opacity: 0.5; }
