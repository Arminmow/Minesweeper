import HtmlGame from "./HtmlGame.js";

const HtmlHandler = new HtmlGame()

class Cell {
    constructor(bomb, id, width, height, parentId) {
        this.isBomb = bomb;
        this.cellId = id;
        this.width = width;
        this.height = height;
        this.parentId = parentId;
        this.isChecked = false;
        this.isFlagged = false;
        this.addToParent();
    }

    addToParent() {
        HtmlHandler.createWidget('div', '', this.parentId, this.cellId, ['cellDiv', 'valid'], '', this.width, this.height);

        this.cellDiv = document.getElementById(this.cellId);
    }

    check(neighborBombsCount) {
        HtmlHandler.addClass(this.cellDiv, 'checked');
        HtmlHandler.updateInnerText(this.cellDiv, neighborBombsCount === 0 ? '' : neighborBombsCount);
        this.isChecked = true;
    }

    highlightBomb() {
        if (this.isFlagged) {
            this.removeFlag();
        }

        HtmlHandler.createWidget('img',{src: 'assets/bomb-noBg.png'}, this.cellId, '', ['bombImg'], '');
    }

    addFlag() {
        this.isFlagged = true;

        HtmlHandler.addClass(this.cellDiv , 'flagged');
    }

    removeFlag() {
        this.isFlagged = false;

        HtmlHandler.removeClass(this.cellDiv, 'flagged');
    }
}

export default Cell;
