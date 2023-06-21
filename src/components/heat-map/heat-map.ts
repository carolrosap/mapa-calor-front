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

        const lat = window.innerWidth < 768 ? -29.697619124680667 : -29.6978478;
        const lng = window.innerWidth < 768 ? -52.43645461408208 : -52.4366833;
        const zoom = window.innerWidth < 768 ? 18 : 17;

        map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
            zoom: zoom,
            center: { lat: lat, lng: lng },
            mapTypeId: "satellite",
        });
        const data = await this.getPoints();

        heatmap = new google.maps.visualization.HeatmapLayer({
            data: data,
            map: map,
            radius: 25,
            opacity: 1,
        });
        document.getElementById("change-gradient")!.addEventListener("click", this.changeGradient.bind(this));
        document.getElementById("change-opacity")!.addEventListener("click", this.changeOpacity.bind(this));
        document.getElementById("change-radius")!.addEventListener("click", this.changeRadius.bind(this));
        document.getElementById("wifi")!.addEventListener("click", this.reload.bind(this));
        document.getElementById("movel")!.addEventListener("click", this.reload.bind(this));
    }
    public changeRadius(): void {
        heatmap.set("radius", heatmap.get("radius") === 25 ? 20 : 25);
    }
    public changeOpacity(): void {
        heatmap.set("opacity", heatmap.get("opacity") === 1 ? 0.8 : 1);
    }
    public async getPoints() {
        const api = new ApiManager();
        const points: Array<Point> = await api.getPoints(); //esquema dos parâmetros depois
        let gPoints: { location: google.maps.LatLng, weight: number }[] = [];

        const wifi = document.getElementById('wifi') as HTMLInputElement;
        const movel = document.getElementById('movel') as HTMLInputElement;

        points.forEach((point) => {
            let weight = 0;
            if (wifi && wifi.checked) {
                weight = point.wifi
            } else if (movel && movel.checked) {
                let minValue = -115; // o valor mínimo possível para dBm em seu caso
                weight = point.movel + Math.abs(minValue); // isto será positivo
            }

            const t = { location: new google.maps.LatLng(point.latitude, point.longitude), weight: weight };
            gPoints.push(t);
        });

        return gPoints;
    }

    public async reload(ev: MouseEvent): Promise<void> {
        const data = await this.getPoints(); 
        if (heatmap) {
            heatmap.setMap(null); 
            heatmap = new google.maps.visualization.HeatmapLayer({
                data: data,
                map: map,
                radius: 25,
                opacity: 1,
            });
        }
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
}