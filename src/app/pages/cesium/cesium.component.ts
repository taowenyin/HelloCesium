import {Component, OnInit} from '@angular/core';

declare var Cesium;

@Component({
    selector: 'app-cesium',
    templateUrl: './cesium.component.html',
    styleUrls: ['./cesium.component.css']
})

export class CesiumComponent implements OnInit {

    constructor() {}

    ngOnInit() {
        const viewer = new Cesium.Viewer('cesiumContainer');
    }

}
