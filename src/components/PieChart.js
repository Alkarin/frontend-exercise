/**
 * A SVG based pie chart contained in a SVG <g> element
 */
export default class PieChart {
    /**
     * Create a PieChart component
     * @param {number} diameter The diameter of the chart in px
     * @param {Array<any>} data The data to display in the chart
     */
    constructor(diameter, data) {
        this._diameter = diameter;
        this._data = data;
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
        const diameter = this._diameter;
        const totalValue = this._data.reduce((prev, curr) => prev + curr.value, 0);

        const degPerUnit = 360 / totalValue;
        const radPerUnit = degPerUnit * (Math.PI / 180);

        const radius = diameter / 2;

        const startX = diameter;
        const startY = radius;

        const slicesGroup = this.createSvgElement("g");
        slicesGroup.className.baseVal = "slices";

        let angleInDegStart = 0;

        this._data.forEach(datum => {
            const angleInRad = datum.value * radPerUnit;
            const endX = radius + radius * Math.cos(angleInRad);
            const endY = radius + radius * Math.sin(angleInRad);

            const largeArcFlag = angleInRad > Math.PI ? 1 : 0;

            const slice = this.createSvgElement("path");
            slice.className.baseVal = "slice";

            slice.setAttribute(
                "d",
                `M ${radius} ${radius} ` + // Move to the center of the circle
                `L ${startX} ${startY} ` + // Draw one edge of the slice
                `A ${radius} ${radius}, 0, ${largeArcFlag}, 1, ${endX} ${endY} Z` // Draw the arc and the second edge (Z)
            );
            slice.setAttribute("fill", datum.color);

            // Rotating this slice by the total angle occupied by previous slices
            slice.setAttribute(
                "transform",
                `rotate(${angleInDegStart}, ${radius}, ${radius})`
            );

            // Increment total angle by this slice's angle
            angleInDegStart += degPerUnit * datum.value;

            slicesGroup.appendChild(slice);
        });

        return slicesGroup;
    }
}
