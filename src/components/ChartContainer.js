/**
 * Container component for chart components
 */
export default class ChartContianer {
    /**
     * Create a ChartContainer component
     * @param {number} height height of the container
     * @param {number} width width of the container
     * @param {HTMLElement} chart the chart element (created with PieChart)
     * @param {HTMLElement} legend the legend element (created with ChartLegend)
     */
    constructor(height, width, chart, legend) {
        this._height = height;
        this._width = width;
        this._chart = chart.getElement();
        this._legend = legend.getElement();
    }

    /**
     * Creates an SVG element in the correct namespace
     * @param {string} tagName the tag name to create
     */
    createSvgElement(tagName) {
        return document.createElementNS("http://www.w3.org/2000/svg", tagName);
    }

    /**
     * Get the component's HTMLElement
     * @return {HTMLElement}
     */
    getElement() {
        // Shift the chart to the left
        this._chart.setAttribute("transform", "translate(200)");

        const svgRoot = this.createSvgElement("svg");

        svgRoot.setAttribute("height", `${this._height}`);
        svgRoot.setAttribute("width", `${this._width}`);
        svgRoot.setAttribute("viewBox", `0 0 ${this._width} ${this._height}`);

        svgRoot.appendChild(this._legend);
        svgRoot.appendChild(this._chart);

        return svgRoot;
    }
}
