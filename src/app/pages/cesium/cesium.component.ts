import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AcNotification, ActionType} from 'angular-cesium';
import {PlanesService} from '../../services/planes.service';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-cesium',
    templateUrl: './cesium.component.html',
    styleUrls: ['./cesium.component.css']
})

export class CesiumComponent implements OnInit {
    planes: Observable<AcNotification>;

    constructor(private planesService: PlanesService) {}

    ngOnInit() {
        // const viewer = new Cesium.Viewer('cesiumContainer');

        this.planes = this.planesService.getPlanes().pipe(map(plane => ({
            id: plane.id,
            actionType: ActionType.ADD_UPDATE,
            entity: plane
        })));
    }

    getColor(plane) {
        if (plane.name.startsWith('Boeing')) {
            return Cesium.Color.Green;
        } else {
            return Cesium.Color.White;
        }
    }

}
