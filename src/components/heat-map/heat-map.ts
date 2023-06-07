// This example requires the Visualization library. Include the libraries=visualization
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=visualization">
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

    public initMap = (): void => {
        map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
            zoom: 13,
            center: { lat: 37.775, lng: -122.434 },
            mapTypeId: "satellite",
        });

        heatmap = new google.maps.visualization.HeatmapLayer({
            data: this.getPoints(),
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
    public getPoints() {
        return [
            new google.maps.LatLng(37.782551, -122.445368),
            new google.maps.LatLng(37.782745, -122.444586),
            new google.maps.LatLng(37.782842, -122.443688),
            new google.maps.LatLng(37.782919, -122.442815),
            new google.maps.LatLng(37.782992, -122.442112),
            new google.maps.LatLng(37.7831, -122.441461),
            new google.maps.LatLng(37.783206, -122.440829),

        ];
    }
}