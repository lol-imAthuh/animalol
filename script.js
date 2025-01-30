// Selecionando elementos da página
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const addFrameBtn = document.getElementById('addFrameBtn');
const playBtn = document.getElementById('playBtn');
const clearBtn = document.getElementById('clearBtn');

let frames = []; // Array para armazenar os quadros da animação
let isDrawing = false;

// Função para desenhar no canvas
function draw(event) {
    if (!isDrawing) return;
    
    const x = event.offsetX;
    const y = event.offsetY;

    ctx.lineTo(x, y);
    ctx.stroke();
}

// Função para começar a desenhar
function startDrawing(event) {
    isDrawing = true;
    ctx.beginPath();
    draw(event);
}

// Função para parar de desenhar
function stopDrawing() {
    isDrawing = false;
    ctx.closePath();
}

// Função para adicionar um novo quadro à animação
function addFrame() {
    // Armazena o estado atual do canvas em um quadro
    frames.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    console.log(`Quadro ${frames.length} adicionado!`);
}

// Função para limpar o canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frames = []; // Reseta os quadros
    console.log("Tela limpa!");
}

// Função para reproduzir a animação
function playAnimation() {
    let currentFrame = 0;

    const animationInterval = setInterval(() => {
        if (currentFrame >= frames.length) {
            clearInterval(animationInterval); // Para a animação quando acabar
            return;
        }

        ctx.putImageData(frames[currentFrame], 0, 0); // Desenha o quadro
        currentFrame++;
    }, 100); // Reproduz a animação a cada 100ms
}

// Adicionando eventos
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);

addFrameBtn.addEventListener('click', addFrame);
playBtn.addEventListener('click', playAnimation);
clearBtn.addEventListener('click', clearCanvas);
