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
            const htmlContent = await fetch(route.content).then((response) => response.text());
        
            this.root_element.innerHTML = htmlContent;
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    getRoute() {
        const path = this.removeHash();

        //console.log(path);
        const route = this.routes.find(route => route.path === path);

        if(route) {
            return route;
        }
    }

    removeHash() {
        const hash = window.location.hash;
        const href = hash.slice(1);

        return href;
    }
}