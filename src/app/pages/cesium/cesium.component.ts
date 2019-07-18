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

    private cesiumView = null;

    constructor(private planesService: PlanesService) {}

    ngOnInit() {
        Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkNzA2YTE4Yi0zN2E3LTQwN2MtODliOS1hNjZiMGE3YjhjMDYiLCJpZCI6MTM1NDQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NjM0NTIzNTF9.A5EnyeVHLL9GU6vI2qsw2KHD-q1rkbohTLyJwJysoWg';

        this.cesiumView = new Cesium.Viewer('cesiumContainer', {
            terrainProvider: Cesium.createWorldTerrain(),
            scene3DOnly: true,
            selectionIndicator: true,
            baseLayerPicker: true
        });

        this.cesiumView.scene.glob.enableLighting = false;

        // const titleset = this.cesiumView.scene.primitives.add(new Cesium.Cesium3DTileset({
        //     url: Cesium.IonResource.fromAssetId(34834)
        // }));
        //
        // this.cesiumView.zoomTo(titleset);

        // this.cesiumView.imageryLayers.remove(this.cesiumView.imageryLayers.get(0));
        // this.cesiumView.imageryLayers.addImageryProvider(new Cesium.IonImageryProvider({assetId: 3954}));

        // this.planes = this.planesService.getPlanes().pipe(map(plane => ({
        //     id: plane.id,
        //     actionType: ActionType.ADD_UPDATE,
        //     entity: plane
        // })));
    }

    // getColor(plane) {
    //     if (plane.name.startsWith('Boeing')) {
    //         return Cesium.Color.Green;
    //     } else {
    //         return Cesium.Color.White;
    //     }
    // }

}
