// This example requires the Visualization library. Include the libraries=visualization
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=visualization">
import { Point } from '../../interfaces/Point';
import { ApiManager } from '../api-manager/api-manager';
import template from './heat-map.html';

let map: google.maps.Map, heatmap: google.maps.visualization.HeatmapLayer;

declare global {
    interface Window {
        initMap: () => void;
    }
}

export class HeatMap {

    async render(): Promise<void> {
        const element = document.createElement('div');
        element.classList.add('container');
        element.insertAdjacentHTML('beforeend', template);

        const content = document.querySelector('body');
        content?.appendChild(element);
        window.initMap = this.initMap;

    }

    public initMap = async (): Promise<void> => {
        map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
            zoom: 17,
            center: { lat: 	-29.697185811920143, lng: -52.43834566931921 },
            mapTypeId: "satellite",
        });
        const data = await this.getPoints();

        heatmap = new google.maps.visualization.HeatmapLayer({
            data: data,
            map: map,
        });

        document.getElementById("toggle-heatmap")!.addEventListener("click", this.toggleHeatmap.bind(this));
        document.getElementById("change-gradient")!.addEventListener("click", this.changeGradient.bind(this));
        document.getElementById("change-opacity")!.addEventListener("click", this.changeOpacity.bind(this));
        document.getElementById("change-radius")!.addEventListener("click", this.changeRadius.bind(this));
        
    }

    public toggleHeatmap(): void {
        heatmap.setMap(heatmap.getMap() ? null : map);
    }

    public changeGradient(): void {
        const gradient = [
            "rgba(0, 255, 255, 0)",
            "rgba(0, 255, 255, 1)",
            "rgba(0, 191, 255, 1)",
            "rgba(0, 127, 255, 1)",
            "rgba(0, 63, 255, 1)",
            "rgba(0, 0, 255, 1)",
            "rgba(0, 0, 223, 1)",
            "rgba(0, 0, 191, 1)",
            "rgba(0, 0, 159, 1)",
            "rgba(0, 0, 127, 1)",
            "rgba(63, 0, 91, 1)",
            "rgba(127, 0, 63, 1)",
            "rgba(191, 0, 31, 1)",
            "rgba(255, 0, 0, 1)",
        ];

        heatmap.set("gradient", heatmap.get("gradient") ? null : gradient);
    }

    public changeRadius(): void {
        heatmap.set("radius", heatmap.get("radius") ? null : 20);
    }

    public changeOpacity(): void {
        heatmap.set("opacity", heatmap.get("opacity") ? null : 0.2);
    }

    // Heatmap data: 500 Points
    public async getPoints() {
        
        const api = new ApiManager();
        const points: Array<Point> = await api.getPoints(); //esquema dos parâmetros depois
        let gPoints: Array<any> = [];

        points.forEach( (point) => {
            const t =  new google.maps.LatLng(point.latitude, point.longitude)
            gPoints.push(t)
        })
        return gPoints
    }
}