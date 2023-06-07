import { HeatMap } from "../components/heat-map/heat-map";

type RouteHandler = () => void;
type RouteMap = Record<string, RouteHandler>;

export class Router {
  public handleHomeRoute (): void {
   
    const heatMap = new HeatMap();
    void heatMap.render();
  }

  public configureRoutes (): void {
    const routes: RouteMap = {
      '/': this.handleHomeRoute
    };

    const currentUrl = window.location.pathname;
    const routeHandler = routes[currentUrl];
    if (routeHandler !== null) {
      routeHandler();
    }
  }
}


