import Card from "./Card";
import PieChart from "./PieChart";
import ChartContianer from "./ChartContainer";
import ChartLegend from "./ChartLegend";
import "styles/PieChartCard.css";

/**
 * The card component for pie chart data
 */
export default class PieChartCard {
    /**
     * Create a PieChartCard component
     */
    constructor() {
        this._data = [
            {title: "Google Search", value: 10, color: "#D1D2F9"},
            {title: "Web Ads", value: 38, color: "#A3BCF9"},
            {title: "Email", value: 24, color: "#7796CB"},
            {title: "Social Media", value: 28, color: "#576490"}
        ];
    }

    /**
     * Get the component's HTMLElement
     * @return {HTMLElement}
     */
    getElement() {
        // Chart title
        const title = document.createElement("h4");
        title.innerText = "Web Traffic";

        // PieChart
        const height = 300;
        const width = 500;

        const pieChartLegend = new ChartLegend(this._data);
        const pieChart = new PieChart(height, this._data);
        const chartContainer = new ChartContianer(
            height,
            width,
            pieChart,
            pieChartLegend
        ).getElement();

        const card = new Card([title, chartContainer]).getElement();
        card.classList.add("pie-chart-card");
        return card;
    }
}
