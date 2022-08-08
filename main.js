import Game from "./Game.js";

const game = new Game()

document.getElementById('initBtn').addEventListener('click',initGame)

function initGame (){
    const size = document.getElementById('size').value
    const bombAmount = document.getElementById('bombAmount').value

    document.getElementById('gameInp').remove()

    game.start(size,bombAmount,'grid')
}

