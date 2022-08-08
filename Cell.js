
class Cell {
    constructor(bomb,id,width,height,parentId) {
        this.isBomb = bomb
        this.cellId = id
        this.width = width
        this.height = height
        this.parentId = parentId
        this.isChecked = false
        this.isFlagged = false
        this.addCellToParent()
    }

    addCellToParent (){
        const cellDiv = document.createElement('div')
        cellDiv.setAttribute('id',this.cellId)
        cellDiv.style.width = `${this.width}px`
        cellDiv.style.height = `${this.height}px`
        cellDiv.classList.add('valid')

        document.getElementById(this.parentId).appendChild(cellDiv)
    }

    activeCell (bombsCount){
        document.getElementById(this.cellId).className = 'checked'
        document.getElementById(this.cellId).innerText = bombsCount === 0 ? '' : bombsCount
        this.isChecked = true

    }

    highlightBomb (){
        if (this.isFlagged) {
            this.removeFlag()
        }
        const bombImg = document.createElement('img')
        bombImg.src = 'assets/bomb-noBg.png'
        bombImg.style.width = '100%'
        bombImg.style.height = '100%'
        document.getElementById(this.cellId).append(bombImg)
    }

    addFlag (){
        this.isFlagged = true
        document.getElementById(this.cellId).style.background = 'url("assets/flag.jpg")'
        document.getElementById(this.cellId).style.backgroundSize = '100%'
    }

    removeFlag (){
        this.isFlagged = false
        document.getElementById(this.cellId).style.removeProperty('background')
    }
}

export default Cell
