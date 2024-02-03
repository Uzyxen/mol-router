export class Router {
    constructor(routes, root_element) {
        this.routes = routes;
        this.root_element = root_element;
    }

    navigate(event) {
        event = event || window.event;
        event.preventDefault();
        window.history.pushState({}, '', event.target.href);

        this.loadContent();
    }

    async loadContent() {
        try { 
            const route = this.getRoute();

            const response = await fetch(route.content);
            const htmlContent = await response.text();
        
            this.root_element.innerHTML = htmlContent;
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    getRoute() {
        const path = window.location.pathname;
        const route = this.routes.find(route => route.path === path);

        if(route) {
            return route;
        }
    }
}