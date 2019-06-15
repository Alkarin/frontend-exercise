import "styles/RadialProgressBar.css";

/**
 * Displays a circular progress "bar"
 */
export default class RadialProgressBar {
    /**
     * Create a RadialProgressBar component
     * @param {number} percentageAsDecimal The percentage expressed as a decimal between 0 to 1
     * @param {string} value Value to display at the center of the RadialProgressBar
     */
    constructor(percentageAsDecimal, value) {
        this._percentageAsDecimal = percentageAsDecimal;
        this._value = value;
    }

    /**
     * Creates an SVG element in the correct namespace
     * @param {string} tagName the tag name to create
     */
    createSvgElement(tagName) {
        return document.createElementNS("http://www.w3.org/2000/svg", tagName);
    }

    /**
     * Creates the a SVG path string for the progress "bar"'s shape
     * @param {number} radius The outer radius of the circle in px
     * @param {number} width The distance between the outer and inner radii
     * @param {number} percentage The percentage expressed as a decimal between 0 to 1
     */
    getPathForProgress(radius, width, percentage) {
        const outerDiameter = radius * 2;

        const outerRadius = radius;
        const innerRadius = outerRadius - width;
        const endCapRadius = width / 2;

        const outerStartX = outerDiameter;
        const outerStartY = outerRadius;
        const innerStartX = outerDiameter - width;
        const innerStartY = outerRadius;

        // Note: The progress bar has a range of 0-270°
        const angle = percentage * 270;
        // Convert angle from degrees to radians
        const rotationRad = angle * (Math.PI / 180);

        // Convert coordinates from polar (radius and angle) to cartesian (x, y)
        // And then offset them so they are in relation to center of our circles
        const outerEndX = outerRadius + outerRadius * Math.cos(rotationRad);
        const outerEndY = outerRadius + outerRadius * Math.sin(rotationRad);
        const innerEndX = outerRadius + innerRadius * Math.cos(rotationRad);
        const innerEndY = outerRadius + innerRadius * Math.sin(rotationRad);

        // Determine if we need to use the larger arc for the A SVG command
        // Need to set as 1 when the angle is greater than half a circle (180° or pi)
        const largeArcFlag = rotationRad > Math.PI ? 1 : 0;

        return (
            // X               Y
            // Moving to the center
            `M ${outerStartX}  ${outerStartY} ` +
            // Radius X        Radius Y         X Axis Rotation     Large Arc Flag     Sweep Flag   X              Y
            // Outer arc
            `A ${outerRadius}  ${outerRadius},  0,                  ${largeArcFlag},   1,           ${outerEndX}   ${outerEndY} ` +
            // First endcap
            `A ${endCapRadius} ${endCapRadius}, 0,                  0,                 1,           ${innerEndX}   ${innerEndY} ` +
            // Inner arc
            `A ${innerRadius}  ${innerRadius},  0,                  ${largeArcFlag},   0,           ${innerStartX} ${innerStartY} ` +
            // Second endcap
            `A ${endCapRadius} ${endCapRadius}, 0,                  0,                 1,           ${outerStartX} ${outerStartY}`
        );
    }

    /**
     * Get the component's HTMLElement
     * @return {HTMLElement}
     */
    getElement() {
        // Define values for the view port
        const sideLength = 165;
        const progressBarWidth = 10;

        const outerRadius = sideLength / 2;

        // Create the elements
        // Note: Need to use element.className.baseVal to set an SVG element's class attribute
        const svgRoot = this.createSvgElement("svg");
        svgRoot.className.baseVal = "radial-progress-bar";
        svgRoot.setAttribute("viewBox", `0 0 ${sideLength} ${sideLength}`);

        // Group to contain our SVG elements
        const progressGroup = this.createSvgElement("g");
        progressGroup.className.baseVal = "progress-group";

        // Progress bar trough (directly behind progress bar)
        const progressTroughPath = this.createSvgElement("path");
        progressTroughPath.className.baseVal = "progress-trough";
        progressTroughPath.setAttribute(
            "d",
            this.getPathForProgress(outerRadius, progressBarWidth, 1)
        );

        // Actual progress bar
        const progressPath = this.createSvgElement("path");
        progressPath.className.baseVal = "progress";
        progressPath.setAttribute(
            "d",
            this.getPathForProgress(
                outerRadius,
                progressBarWidth,
                this._percentageAsDecimal
            )
        );

        // Text value passed in from parent
        const valueText = this.createSvgElement("text");
        valueText.innerHTML = this._value;
        valueText.className.baseVal = "value";
        valueText.setAttribute("x", "82.5");
        valueText.setAttribute("y", "92.5"); // Added 10 to 'center' it

        progressGroup.appendChild(progressTroughPath);
        progressGroup.appendChild(progressPath);
        progressGroup.appendChild(valueText);

        svgRoot.appendChild(progressGroup);
        return svgRoot;
    }
}
