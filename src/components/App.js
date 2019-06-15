import "styles/App.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Content from "./Content";

/**
 * Container for the application
 */
export default class App {
    /**
     * Create the App and render it's children
     * @param {HTMLElement} rootElement - The root element for all components
     */
    constructor(rootElement) {
        this._root = rootElement;
        this.render();
    }

    /**
     * Render elements to the DOM
     */
    render() {
        this._root.className = "app";

        const sidebar = new Sidebar();

        const pageContainer = document.createElement("div");
        pageContainer.className = "page";

        const header = new Header();
        const content = new Content();

        pageContainer.appendChild(content.getElement());

        // Separate header from page container, as it is now a fixed element, and should not be calculated in handlePageScroll()
        this._root.appendChild(sidebar.getElement());
        this._root.appendChild(header.getElement());
        this._root.appendChild(pageContainer);

        pageContainer.addEventListener(
            'scroll',
            () => App.handlePageScroll()
        );
    }

    static handlePageScroll() {
        let page = document.querySelector('.page');
        let header = document.querySelector('.header');
        let headerLogo = document.querySelector('.logo-container');
        if (page.scrollTop > 0) {
            header.classList.add('content-header');
            headerLogo.classList.add('content-logo');
        } else {
            header.classList.remove('content-header');
            headerLogo.classList.remove('content-logo');
        }
    }
}
