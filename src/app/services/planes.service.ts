import {Injectable} from '@angular/core';
import {from, Observable, Observer, of} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PlanesService {

    private planes = [
        {
            id: '1',
            position: Cesium.Cartesian3.fromDegrees(30, 30),
            name: 'Airbus a320',
            image: 'https://cdn3.iconfinder.com/data/icons/airport-collection/100/23-512.png'
        },
        {
            id: '2',
            position: Cesium.Cartesian3.fromDegrees(31, 31),
            name: 'Boeing 777',
            image: 'https://cdn1.iconfinder.com/data/icons/fly-airbus-and-aeroplane/154/fly-air-plane-airbus-aeroplane-512.png'
        }
    ];

    constructor() {
    }

    public getPlanes() {
        // return new Observable(observer => {
        //     observer.next(this.planes);
        //     observer.complete();
        // });
        return from(this.planes);
    }
}
