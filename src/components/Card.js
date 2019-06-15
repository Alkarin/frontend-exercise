import "styles/Card.css";

/**
 * Container component for card components
 */
export default class Card {
    /**
     * Create Card component
     * @param {Array<HTMLElement>} children
     */
    constructor(children) {
        this._children = children;
        this._container = document.createElement("div");
    }

    /**
     * Get the component's HTMLElement
     * @return {HTMLElement}
     */
    getElement() {
        this._container.className = "card";
        if (this._children && this._children.length > 0) {
            this._children.forEach(child => this._container.appendChild(child));
        }
        return this._container;
    }
}
