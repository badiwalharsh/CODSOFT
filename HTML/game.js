let board = ['','','','','','','','',''];
const HUMAN = 'O';
const AI = 'X';
let currentPlayer = HUMAN;
let gameActive = true;

const statusDisplay = document.getElementById('status');

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function printBoard() {
    for (let i = 0; i < 9; i++) {
        document.getElementById(`cell${i}`).innerText = board[i];
    }
}

function resetGame() {
    board = ['','','','','','','','',''];
    currentPlayer = HUMAN;
    gameActive = true;
    statusDisplay.innerText = '';
    printBoard();
}

function checkWinner() {
    for (let i = 0; i < 8; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return board.includes('') ? null : 'draw';
}

function makeMove(index) {
    if (board[index] !== '' || !gameActive) return;

    board[index] = currentPlayer;
    printBoard();

    let winner = checkWinner();
    if (winner) {
        if (winner === 'draw') {
            statusDisplay.innerText = 'It\'s a draw!';
        } else {
            statusDisplay.innerText = `${winner} wins!`;
        }
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === HUMAN ? AI : HUMAN;
    if (currentPlayer === AI) {
        aiMove();
    }
}

function minimax(newBoard, depth, isMaximizing, alpha, beta) {
    let winner = checkWinner();
    if (winner === HUMAN) return { score: -10 + depth };
    if (winner === AI) return { score: 10 - depth };
    if (winner === 'draw') return { score: 0 };

    if (isMaximizing) {
        let bestScore = -Infinity;
        let bestMove;
        for (let i = 0; i < 9; i++) {
            if (newBoard[i] === '') {
                newBoard[i] = AI;
                let score = minimax(newBoard, depth + 1, false, alpha, beta).score;
                newBoard[i] = '';
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
                alpha = Math.max(alpha, score);
                if (beta <= alpha) break;
            }
        }
        return { score: bestScore, move: bestMove };
    } else {
        let bestScore = Infinity;
        let bestMove;
        for (let i = 0; i < 9; i++) {
            if (newBoard[i] === '') {
                newBoard[i] = HUMAN;
                let score = minimax(newBoard, depth + 1, true, alpha, beta).score;
                newBoard[i] = '';
                if (score < bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
                beta = Math.min(beta, score);
                if (beta <= alpha) break;
            }
        }
        return { score: bestScore, move: bestMove };
    }
}

function aiMove() {
    let move = minimax(board, 0, true, -Infinity, Infinity).move;
    board[move] = AI;
    currentPlayer = HUMAN;
    printBoard();

    let winner = checkWinner();
    if (winner) {
        if (winner === 'draw') {
            statusDisplay.innerText = 'It\'s a draw!';
        } else {
            statusDisplay.innerText = `${winner} wins!`;
        }
        gameActive = false;
    }
}

resetGame();