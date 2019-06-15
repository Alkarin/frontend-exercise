import Card from "./Card";
import RadialProgessBar from "./RadialProgressBar";
import "styles/RangeCard.css";

/**
 * Displays range data
 */
export default class RangeCard {
    /**
     * Create a RangeCard component
     * @param {Array<any>} data The data to display
     */
    constructor(data) {
        this._data = data ? data : {};
    }

    /**
     * Get the component's HTMLElement
     * @return {HTMLElement}
     */
    getElement() {
        const {title, value, upperRange} = this._data;
        const children = [];

        const titleElement = document.createElement("h4");
        titleElement.innerText = title;

        const valueElement = new RadialProgessBar(
            value / upperRange,
            value
        ).getElement();

        // Displays the upper range of the data
        const outOfElement = document.createElement("p");
        outOfElement.innerText = `out of ${upperRange} target`;

        children.push(titleElement);
        children.push(valueElement);
        children.push(outOfElement);

        // Help button
        const helpButton = document.createElement("button");
        helpButton.className = "help-button";
        const helpIcon = document.createElement("i");
        helpIcon.className = "fas fa-question-circle";
        helpButton.appendChild(helpIcon);
        children.push(helpButton);

        const card = new Card(children).getElement();
        card.className += " range-card";

        return card;
    }
}
