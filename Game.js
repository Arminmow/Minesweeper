import Cell from "./Cell.js";

class Game {

    start(size, bombAmount,parentId){
        this.cellAmount = size;
        this.bombAmount = bombAmount;
        this.remainingFlags = bombAmount;
        this.gridId = parentId;
        this.isFirstClick = true
        this.createGameArray();
        this.createGrid();
        this.createScoreContainer();
    }

    createGameArray (){
        let gameArray = [];
        const bombArray = Array(this.bombAmount).fill(1);
        const emptyArray = Array(this.cellAmount * this.cellAmount - this.bombAmount).fill(0);
        const shuffledArray = [...emptyArray, ...bombArray].sort(()=> Math.random() - 0.5);

        for (let i = 0; i < this.cellAmount; i++) {
            const row = shuffledArray.slice(i * this.cellAmount, (i + 1) * this.cellAmount)

            gameArray.push(row)
        }
        this.gameArray = gameArray;
    }

    prepareGrid (){
        const grid = document.getElementById(this.gridId);
        const width = this.cellAmount >= 15 ? 800 : 600;
        const height = this.cellAmount >= 15 ? 800 : 600;

        this.size = {
            width: width,
            height: height
        }

        grid.style.width = `${width}px`;
        grid.style.height = `${height}px`;
        this.clickListener = (e)=> this.handleClick(e.target);
        this.flagHandler = (e)=> this.handleFlag(e);
        grid.addEventListener('click',this.clickListener);
        grid.addEventListener('contextmenu', this.flagHandler);
   }

    createGrid (){
        this.prepareGrid();

        let cellsArray = [];

        const cellWidth = this.size.width / this.cellAmount;
        const cellHeight = this.size.height / this.cellAmount;

        this.gameArray.forEach((line,lineIndex)=>{
            line.forEach((cell,cellIndex)=>{
                const cellInstance = new Cell(cell === 1 , `${lineIndex}_${cellIndex}`, cellWidth , cellHeight , this.gridId );

                document.getElementById(this.gridId).style.display = 'flex';
                cellsArray.push(cellInstance);
            })
        })
        this.cellsArray = cellsArray;
    }

    createScoreContainer (){
        const scoreboard = document.createElement('div');
        const scoreboardWidth = parseInt(document.getElementById(this.gridId).style.width) / 3;
        const scoreboardHeight = parseInt(document.getElementById(this.gridId).style.height);
        const flagsContainer = document.createElement('h3');
        const timerContainer = document.createElement('h3')


        scoreboard.id = 'scoreboard';
        scoreboard.style.width = `${scoreboardWidth}px`;
        scoreboard.style.height = `${scoreboardHeight}px`;
        scoreboard.style.marginLeft = `20px`;
        scoreboard.style.padding = `10px`;

        flagsContainer.id = 'flagsContainer';
        flagsContainer.innerText = `Flags: ${this.remainingFlags}`;
        flagsContainer.className = `scoreEl`

        timerContainer.id = `timerContainer`
        timerContainer.innerText = `Time:`
        timerContainer.className = 'scoreEl'

        scoreboard.append(flagsContainer);
        scoreboard.append(timerContainer)

        document.getElementById('main').append(scoreboard);
    }

    findCell (targetId){
        for (let i=0; i < this.cellsArray.length; i++){
            const cellInstance = this.cellsArray[i];

            if (cellInstance.cellId === targetId){
                return cellInstance;
            }
        }
    }

    handleClick (el){
        if (this.isFirstClick) {
            const startDate = Date.now()
            this.timerInterval = setInterval(()=> this.updateTimer(startDate), 1000);
        }

        this.isFirstClick = false;

        if(el === null) return;

        const targetCell = this.findCell(el.id);

       if (!targetCell) {
           return;
       }

       if (targetCell.isBomb){
           return this.gameOver();
       }

       this.controlCell(targetCell);
       this.checkForWin();

    }

    handleFlag (e){
        e.preventDefault();

        const targetCell = this.findCell(e.target.id);

        if (!targetCell || targetCell.isChecked) {
            return;
        }

        if (this.remainingFlags === 0 && !targetCell.isFlagged){
            return;
        }

        if (this.remainingFlags === 0 && targetCell.isFlagged){
            targetCell.removeFlag();
            this.remainingFlags += 1;
            this.updateFlagsTitle();
            return;
        }

        if (targetCell.isFlagged){
            targetCell.removeFlag();
            this.remainingFlags += 1;
        }else {
            targetCell.addFlag();
            this.remainingFlags -= 1;
        }

        this.updateFlagsTitle();
    }

    updateFlagsTitle (){
        document.getElementById('flagsContainer').innerText = `Flags: ${this.remainingFlags}`;
    }

    controlCell(cell){
        if (cell.isChecked) return;
        if (cell.isFlagged) return;

        const idSplit = cell.cellId.split('_');
        const targetLineId = parseInt(idSplit[0]);
        const targetRowId = parseInt(idSplit[1]);
        let counter = 0;

        for (let i = targetLineId-1 ; i <= targetLineId+1; i++ ){

            for (let j = targetRowId-1 ; j <= targetRowId+1; j++ ){

                const targetCell = this.findCell(`${i}_${j}`);

                if (targetCell !== undefined){

                    if (targetCell.isBomb) counter ++;
                }
            }
        }

        if(counter !== 0){

            cell.check(counter);
        }else {

            cell.check(0);

            for (let i = targetLineId-1 ; i <= targetLineId+1; i++ ){

                for (let j = targetRowId-1 ; j <= targetRowId+1; j++ ){

                    const targetCell = this.findCell(`${i}_${j}`);
                    if (targetCell !== undefined){

                        this.controlCell(targetCell);
                    }
                }
            }
        }

    }

    gameOver (){
        this.cellsArray.forEach((cell)=>{
            if (cell.isBomb) cell.highlightBomb();
        })
        document.getElementById(this.gridId).removeEventListener('click', this.clickListener);
        document.getElementById(this.gridId).removeEventListener('contextmenu', this.flagHandler);
        clearInterval(this.timerInterval);
        alert('GameOver');
    }

    updateTimer (startDate) {
        const delta = Date.now() - startDate;
        const deltaSec = Math.floor(delta / 1000);

        document.getElementById('timerContainer').innerText = `Time: ${deltaSec}`;
    }

    checkForWin (){
        let checked = 0;
        this.cellsArray.forEach((cell)=>{
            if (cell.isChecked) checked ++;
        })
        if (checked + this.bombAmount === this.cellAmount * this.cellAmount){
            this.gameWin();
        }
    }

    gameWin (){
        this.cellsArray.forEach((cell)=>{
            if (cell.isBomb) cell.addFlag()
        })
        clearInterval(this.timerInterval);
        alert('YOU WON');
    }

}

export default Game;
