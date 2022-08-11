
class Cell {
    constructor(bomb,id,width,height,parentId) {
        this.isBomb = bomb;
        this.cellId = id;
        this.width = width;
        this.height = height;
        this.parentId = parentId;
        this.isChecked = false;
        this.isFlagged = false;
        this.addToParent();
    }

    addToParent (){
        const cellDiv = document.createElement('div');

        cellDiv.setAttribute('id',this.cellId);
        cellDiv.className = 'cellDiv'
        cellDiv.style.width = `${this.width}px`;
        cellDiv.style.height = `${this.height}px`;
        cellDiv.classList.add('valid');

        document.getElementById(this.parentId).appendChild(cellDiv);
        this.cellDiv = document.getElementById(this.cellId);
    }

    check (neighborBombsCount){
        console.log(this.cellDiv)
        this.cellDiv.classList.add('checked');
        this.cellDiv.innerText = neighborBombsCount === 0 ? '' : neighborBombsCount;
        this.isChecked = true;

    }

    highlightBomb (){
        if (this.isFlagged) {
            this.removeFlag();
        }
        const bombImg = document.createElement('img');

        bombImg.src = 'assets/bomb-noBg.png';
        bombImg.className = 'bombImg'

        this.cellDiv.append(bombImg);
    }

    addFlag (){
        this.isFlagged = true;

        this.cellDiv.classList.add('flagged')
    }

    removeFlag (){
        this.isFlagged = false;

        this.cellDiv.classList.remove('flagged')
    }
}

export default Cell;
