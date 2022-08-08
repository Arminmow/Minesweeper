import Cell from "./Cell.js";

class Game {

    start(size, bombAmount,parentId){
        this.cellAmount = parseInt(size)
        this.bombAmount = parseInt(bombAmount)
        this.remainingFlags = bombAmount
        this.gridId = parentId
        this.createGameArray()
        this.createGrid()
    }

    createGameArray (){
        let gameArray = []
        const bombArray = Array(this.bombAmount).fill(1)
        const emptyArray = Array(this.cellAmount * this.cellAmount - this.bombAmount).fill(0)
        const shuffledArray = emptyArray.concat(bombArray).sort(()=> Math.random() - 0.5)

        for (let i = 0; i < this.cellAmount * this.cellAmount; i += this.cellAmount) {
            const test = shuffledArray.slice(i, i + this.cellAmount)

            gameArray.push(test)
        }

        this.gameArray = gameArray;
    }

    prepareGrid (){
        const grid = document.getElementById(this.gridId)
        const width = this.cellAmount >= 15 ? 800 : 600
        const height = this.cellAmount >= 15 ? 800 : 600
        this.size = {
            width: width,
            height: height
        }
        grid.style.width = `${width}px`
        grid.style.height = `${height}px`
        this.clickListener = (e)=> this.handleClick(e.target)
        this.flagHandler = (e)=> this.handleFlag(e)
        grid.addEventListener('click',this.clickListener)
        grid.addEventListener('contextmenu', this.flagHandler)
    }

    createGrid (){
        this.prepareGrid()

        let cellsArray = []

        const cellWidth = this.size.width / this.cellAmount
        const cellHeight = this.size.height / this.cellAmount

        this.gameArray.forEach((line,lineIndex)=>{
            line.forEach((cell,cellIndex)=>{
                const cellInstance = new Cell(cell === 1 , `${lineIndex}_${cellIndex}`, cellWidth , cellHeight , this.gridId )
                document.getElementById(this.gridId).style.display = 'flex'
                cellsArray.push(cellInstance)
            })
        })

        this.cellsArray = cellsArray
    }

    findCell (targetId){
        for (let i=0; i < this.cellsArray.length; i++){
            const cellInstance = this.cellsArray[i]
            if (cellInstance.cellId === targetId){
                return cellInstance
            }
        }
    }

    handleClick (el){

        if(el === null) return

        const targetCell = this.findCell(el.id)

        if (targetCell !== undefined){
            if (targetCell.isBomb) {
                this.gameOver()
            }else {
                this.controlCells(targetCell)
                this.checkForWin()
            }
        }

    }

    handleFlag (e){
        e.preventDefault()
        const targetCell = this.findCell(e.target.id)

        if (targetCell !== undefined){
            if (targetCell.isChecked) return

            if (this.remainingFlags === 0) {
                if (targetCell.isFlagged) {
                    targetCell.removeFlag()
                    this.remainingFlags += 1
                }
            }else {

                if (targetCell.isFlagged) {
                    targetCell.removeFlag()
                    this.remainingFlags += 1
                }else {
                    targetCell.addFlag()
                    this.remainingFlags -= 1
                }
            }
        }

    }

    controlCells(cell){
        if (cell.isChecked) return
        if (cell.isFlagged) return;

        const idSplit = cell.cellId.split('_')
        const targetLineId = parseInt(idSplit[0])
        const targetRowId = parseInt(idSplit[1])
        let counter = 0;

        for (let i = targetLineId-1 ; i <= targetLineId+1; i++ ){
            for (let j = targetRowId-1 ; j <= targetRowId+1; j++ ){
                const targetCell = this.findCell(`${i}_${j}`)

                if (targetCell !== undefined){
                    if (targetCell.isBomb) counter ++
                }
            }
        }

        if(counter !== 0){
            cell.activeCell(counter)
        }else {
            cell.activeCell(0)

            for (let i = targetLineId-1 ; i <= targetLineId+1; i++ ){
                for (let j = targetRowId-1 ; j <= targetRowId+1; j++ ){
                    const targetCell = this.findCell(`${i}_${j}`)
                    if (targetCell !== undefined){
                        this.controlCells(targetCell)
                    }
                }
            }
        }

    }

    gameOver (){
        this.cellsArray.forEach((cell)=>{
            if (cell.isBomb) cell.highlightBomb()
        })
        document.getElementById(this.gridId).removeEventListener('click', this.clickListener)
        document.getElementById(this.gridId).removeEventListener('contextmenu', this.flagHandler)
        alert('GameOver')
    }

    checkForWin (){
        let checked = 0
        this.cellsArray.forEach((cell)=>{
            if (cell.isChecked) checked ++
        })
        if (checked + this.bombAmount === this.cellAmount * this.cellAmount){
            this.gameWin()
        }
    }

    gameWin (){
        alert('YOU WON')
    }

}

export default Game
