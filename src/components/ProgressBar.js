import "styles/ProgressBar.css";

/**
 * A horizontal progress bar
 */
export default class ProgressBar {
    /**
     * Create a progress bar
     * @param {Array<any>} data The data to display in the bar
     */
    constructor(data) {
        this._data = data ? data : {};
        this._container = document.createElement("div");
    }

    /**
     * Get the component's HTMLElement
     * @return {HTMLElement}
     */
    getElement() {
        this._container.className = "progress-bar";

        const value = document.createElement("div");
        value.className = "progress-value";
        value.style = `width: ${this._data.value}%;`;

        this._container.appendChild(value);

        return this._container;
    }
}
