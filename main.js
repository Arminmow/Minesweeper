import Game from "./Game.js";

const game = new Game();

document.getElementById('initBtn').addEventListener('click',initGame);

function initGame (){
    const size = parseInt(document.getElementById('size').value);
    const bombAmount = parseInt(document.getElementById('bombAmount').value);

    document.getElementById('gameInp').remove();

    game.start(size,bombAmount,'grid');
}

