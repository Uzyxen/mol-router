export class Router {
    constructor(routes, root_element) {
        this.routes = routes;
        this.root_element = root_element;
    }

    async loadContent(path) {
        try { 
            const response = await fetch(path);
            const htmlContent = await response.text();
            
            this.root_element.innerHTML = htmlContent;

        } catch (error) {
            console.error('Error: ', error);
        }
    }
}