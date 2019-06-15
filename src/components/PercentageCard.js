import Card from "./Card";
import ProgressBar from "./ProgressBar";
import "styles/PercentageCard.css";

/**
 * Displays percentage data
 */
export default class PercentageCard {
    /**
     * Create a PercentageCard component
     * @param {Array<any>} data
     */
    constructor(data) {
        this._data = data ? data : {};
    }

    /**
     * Get the component's HTMLElement
     * @return {HTMLElement}
     */
    getElement() {
        const {title, value} = this._data;

        const titleElement = document.createElement("h4");
        titleElement.innerText = title;

        const percentageValue = document.createElement("em");
        percentageValue.innerText = `${value}%`;

        const titleRow = document.createElement("div");
        titleRow.appendChild(titleElement);

        titleRow.appendChild(titleElement);
        titleRow.appendChild(percentageValue);

        const percentageRow = document.createElement("div");
        const progressBar = new ProgressBar({value});
        percentageRow.appendChild(progressBar.getElement());

        const footerRow = document.createElement("div");

        // Help button
        const helpButton = document.createElement("button");
        helpButton.className = "help-button";
        const helpIcon = document.createElement("i");
        helpIcon.className = "fas fa-question-circle";
        helpButton.appendChild(helpIcon);

        footerRow.appendChild(helpButton);

        const card = new Card([titleRow, percentageRow, footerRow]).getElement();
        card.className += " percentage-card";

        return card;
    }
}
