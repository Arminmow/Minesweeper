class HtmlGame {
    createWidget(tagName = 'div', attribute, parentId, widgetId, classNames, innerText, width, height) {
        const widget = document.createElement(tagName);

        widget.id = widgetId;

        for (const [key, value] of Object.entries(attribute)){
            widget.setAttribute(key, `${value}`);
        }

        if (classNames) {
            classNames.forEach((className) => {
                widget.classList.add(className);
            })
        }

        if (innerText) widget.innerText = innerText;

        widget.style.width = `${width}px`;
        widget.style.height = `${height}px`;

        document.getElementById(parentId).append(widget);
    }

    addClass (element,className) {
        element.classList.add(className);
    }

    removeClass (element,className){
        element.classList.remove(className);
    }

    updateInnerText (element, context){
        element.innerText = context
    }
}

export default HtmlGame
