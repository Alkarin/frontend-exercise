import IconButton from "./IconButton";
import Data from "../data.js";
import "styles/ExportButtons.css";

/**
 * Contains buttons to export data in multiple formats
 */
export default class ExportButtons {
    /**
     * Create a ExportButtons component
     */
    constructor() {
        this._container = document.createElement("div");
    }

    /**
     * Get the component's HTMLElement
     * @return {HTMLElement}
     */
    getElement() {
        this._container.className = "export-buttons";

        const title = document.createElement("h2");
        title.className = "export-buttons-title";
        title.innerText = "Export";

        const pdfButton = new IconButton("file-pdf").getElement();
        const excelButton = new IconButton("file-excel").getElement();
        const csvButton = new IconButton("file-csv").getElement();

        // Add event listeners
        pdfButton.addEventListener(
            'click',
            () => ExportButtons.downloadFile('PDF')
        );

        excelButton.addEventListener(
            'click',
            () => ExportButtons.downloadFile('EXCEL')
        );

        csvButton.addEventListener(
            'click',
            () => ExportButtons.downloadFile('CSV')
        );

        const buttonContainer = document.createElement("div");
        buttonContainer.className = "export-buttons-container";
        buttonContainer.appendChild(pdfButton);
        buttonContainer.appendChild(excelButton);
        buttonContainer.appendChild(csvButton);

        this._container.append(title);
        this._container.append(buttonContainer);

        return this._container;
    }


    /**
     * Utility function to download the correct file with appropriate data
     * @param fileType      The type of file that will be downloaded
     *
     * See for downloading dynamic files without a server
     * https://www.soft4tec.de/development/javascript/download-json.html
     */
    static downloadFile(fileType) {
        let link = document.createElement('a');
        let jsonObject = JSON.stringify(Data);
        let data = ExportButtons.ConvertToCSV(jsonObject);
        switch (fileType) {
            case 'PDF':
                link.download = 'alexander-vaughan-cover-letter.pdf';
                link.href = '../assets/alexander-vaughan-cover-letter.pdf';
                break;
            case 'EXCEL':
                link.download = 'spreadsheet.xlsx';
                link.href = 'data:application/octet-stream,' + data;
                break;
            case 'CSV':
                link.download = 'currentData.csv';
                link.href = 'data:application/octet-stream,' + data;
                break;
        }
        link.click();
    }

    /**
     * Utility function to convert a JSON object to parsed CSV datasets
     * Logic pulled from https://stackoverflow.com/a/11257124
     * @returns {string}    comma seperated values parsed from JSON object
     */
    static ConvertToCSV(objArray) {
        let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        let str = '';

        for (let i = 0; i < array.length; i++) {
            let line = '';
            for (let index in array[i]) {
                if (line != '') line += ',';
                line += array[i][index];
            }
            str += line + '\r\n';
        }
        return str;
    }
}
