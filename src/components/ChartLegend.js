/**
 * Creates a legend for a chart as a SVG <g> element
 */
export default class ChartLegend {
    /**
     * Create a ChartLegend component
     * @param {Array<any>} data the data being displayed in the chart
     */
    constructor(data) {
        this._data = data;
    }

    /**
     * Creates an SVG element in the correct namespace
     * @param {string} tagName the tag name to create
     *
     * @return {SVGElement} the SVG element
     */
    createSvgElement(tagName) {
        return document.createElementNS("http://www.w3.org/2000/svg", tagName);
    }

    /**
     * Get the component's HTMLElement
     * @return {HTMLElement}
     */
    getElement() {
        const boxSideLength = 30;
        const boxMargin = 10;

        const legendGroup = this.createSvgElement("g");
        legendGroup.className.baseVal = "legend";

        this._data.forEach((datum, index) => {
            // Single legend part element
            const legendPartGroup = this.createSvgElement("g");
            legendPartGroup.className.baseVal = "legend-part";

            // Box to show the color corresponding to the data
            const box = this.createSvgElement("rect");
            box.setAttribute("height", "30");
            box.setAttribute("width", "30");
            box.setAttribute("x", boxMargin);
            box.setAttribute("y", boxMargin + index * (boxSideLength + boxMargin));
            box.setAttribute("fill", datum.color);

            // Text for the name of the data
            const dataTitle = this.createSvgElement("text");
            dataTitle.innerHTML = datum.title;
            dataTitle.setAttribute("x", boxSideLength + boxMargin * 2);
            dataTitle.setAttribute(
                "y",
                boxMargin * 3 + index * (boxSideLength + boxMargin)
            );

            legendGroup.appendChild(box);
            legendGroup.appendChild(dataTitle);

            legendGroup.appendChild(legendPartGroup);
        });

        return legendGroup;
    }
}
