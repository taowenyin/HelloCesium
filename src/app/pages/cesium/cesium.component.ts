import {Component, OnInit} from '@angular/core';
import {bindCallback, Observable} from 'rxjs';
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

    private rotation = Cesium.Math.toRadians(30);

    // 天地图的密钥
    private tdtAccessToken = '5685d82109cd055413fd7e3815b827be';

    constructor(private planesService: PlanesService) {}

    ngOnInit() {
        // 配置Ion的密钥
        Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkNzA2YTE4Yi0zN2E3LTQwN2MtODliOS1hNjZiMGE3YjhjMDYiLCJpZCI6MTM1NDQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NjM0NTIzNTF9.A5EnyeVHLL9GU6vI2qsw2KHD-q1rkbohTLyJwJysoWg';

        // 初始化信息球
        this.cesiumView = new Cesium.Viewer('cesiumContainer', {
            animation: true, // 是否创建动画小器件，左下角仪表
            timeline: true, // 是否显示时间轴
            sceneModePicker: false, // 是否显示3D/2D选择器
            baseLayerPicker: true, // 是否显示图层选择器
            geocoder: false, // 是否显示geocoder小器件，右上角查询按钮
            scene3DOnly: true, // 如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
            navigationHelpButton: false, // 是否显示右上角的帮助按钮
            homeButton: false, // 是否显示Home按钮
            infoBox: true, // 是否显示信息框
            showRenderLoopErrors: false, // 如果设为true，将在一个HTML面板中显示错误信息
            // imageryProviderViewModels: [imgTdtSl, imgTdtYx], // 图层列表
            // selectedImageryProviderViewModel: imgTdtYx // 默认图层
            // terrainProvider: Cesium.createWorldTerrain({
            //     requestVertexNormals: true, // 添加地形的光线
            //     requestWaterMask: true, // 添加地形中的水
            // })
        });

        // 去除版权信息
        this.cesiumView._cesiumWidget._creditContainer.style.display = 'none';

        // 创建天地图矢量
        const imgTdtSl = new Cesium.ProviderViewModel({
            name: '天地图矢量',
            tooltip: '天地图矢量',
            iconUrl: './assets/images/map.png',
            creationFunction: function() {
                this.cesiumView.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
                    url: 'http://t0.tianditu.gov.cn/cva_w/wmts?tk=5685d82109cd055413fd7e3815b827be',
                    layer: 'cva',
                    tileMatrixSetID: 'w',
                    format: 'tiles',
                    style: 'default'
                }));

                return new Cesium.WebMapTileServiceImageryProvider({
                    url: 'http://t0.tianditu.gov.cn/vec_w/wmts?tk=5685d82109cd055413fd7e3815b827be',
                    layer: 'vec',
                    tileMatrixSetID: 'w',
                    format: 'tiles',
                    style: 'default'
                });
            }.bind(this)
        });

        // 创建天地图影像
        const imgTdtYx = new Cesium.ProviderViewModel({
            name: '天地图影像',
            tooltip: '天地图影像',
            iconUrl: './assets/images/map.png',
            creationFunction: function() {
                this.cesiumView.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
                    url: 'http://t0.tianditu.gov.cn/cia_w/wmts?tk=5685d82109cd055413fd7e3815b827be',
                    layer: 'cia',
                    tileMatrixSetID: 'w',
                    format: 'tiles',
                    style: 'default'
                }));

                return new Cesium.WebMapTileServiceImageryProvider({
                    url: 'http://t0.tianditu.gov.cn/img_w/wmts?tk=5685d82109cd055413fd7e3815b827be',
                    layer: 'img',
                    tileMatrixSetID: 'w',
                    format: 'tiles',
                    style: 'default'
                });
            }.bind(this)
        });

        // 创建图层列表
        const providerViewModels = [imgTdtSl, imgTdtYx];
        // 设置图层列表
        this.cesiumView.baseLayerPicker.viewModel.imageryProviderViewModels = providerViewModels;
        // 设置默认图层
        this.cesiumView.baseLayerPicker.viewModel.selectedImagery = providerViewModels[0];
        // 开启太阳和月亮的日照
        this.cesiumView.scene.globe.enableLighting = true;
        // 启动信息球时间
        this.cesiumView.clock.shouldAnimate = true;
        // 设置信息球当前时间
        const currTime = new Date();
        this.cesiumView.clock.currentTime = Cesium.JulianDate.fromDate(new Date(currTime.setHours(currTime.getHours() + 8)));

        const logoEntity = this.cesiumView.entities.add({
            position: Cesium.Cartesian3.fromDegrees(120.754587, 31.276233),
            label: {
                text: 'Label on top of scaling billboard',
                pixelOffset: new Cesium.Cartesian3(0.0, 80),
                fillColor: Cesium.Color.BLUE
            },
            billboard: {
                image: './assets/images/logo.png',
                show: true,
                scaleByDistance : new Cesium.NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5),
                scale: 0.1
            }
        });
        this.cesiumView.zoomTo(logoEntity);

        const labelEntity = this.cesiumView.entities.add({
            label : {
                show : false,
                showBackground : true,
                font : '14px monospace',
                horizontalOrigin : Cesium.HorizontalOrigin.LEFT,
                verticalOrigin : Cesium.VerticalOrigin.TOP,
                pixelOffset : new Cesium.Cartesian2(15, 0)
            }
        });

        // 获取鼠标动作对象
        const handler = new Cesium.ScreenSpaceEventHandler(this.cesiumView.scene.canvas);
        // 设置鼠标移动的处理函数
        handler.setInputAction(function(movement) {
            // 鼠标移动是否在对象内移动
            let foundPosition = false;
            // 获取当前鼠标所在位置的对象
            const pickedPrimitive = this.cesiumView.scene.pick((movement.endPosition));
            // 判断当前对象的id是否是logo
            if (this.cesiumView.scene.pickPositionSupported && Cesium.defined(pickedPrimitive) && pickedPrimitive.id === logoEntity) {
                // 获取当前位置的笛卡尔坐标对象
                const cartesian = this.cesiumView.scene.pickPosition(movement.endPosition);
                if (Cesium.defined(cartesian)) {
                    const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
                    const longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(2);
                    const latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(2);
                    const heightString = cartographic.height.toFixed(2);

                    labelEntity.position = cartesian;
                    labelEntity.label.show = true;
                    labelEntity.label.text =
                        'Lon: ' + ('   ' + longitudeString).slice(-7) + '\u00B0' +
                        '\nLat: ' + ('   ' + latitudeString).slice(-7) + '\u00B0' +
                        '\nAlt: ' + ('   ' + heightString).slice(-7) + 'm';

                    labelEntity.label.eyeOffset = new Cesium.Cartesian3(
                        0.0, 0.0, -cartographic.height * (this.cesiumView.scene.mode === Cesium.SceneMode.SCENE2D ? 1.5 : 1.0));

                    foundPosition = true;
                }
            }
            if (!foundPosition) {
                labelEntity.label.show = false;
            }
        }.bind(this), Cesium.ScreenSpaceEventType.MOUSE_MOVE);

        // const blueBox = this.cesiumView.entities.add({
        //     name: 'Blue Box',
        //     position: Cesium.Cartesian3.fromDegrees(120.757637, 31.262359),
        //     box: {
        //         dimensions: new Cesium.Cartesian3(40000.0, 30000.0, 50000.0),
        //         material: Cesium.Color.BLUE.withAlpha(0.5),
        //         outline: true,
        //         outlineColor: Cesium.Color.BLACK,
        //         outlineWidth: 20
        //     }
        // });



        // const geocachePromise = Cesium.GeoJsonDataSource.load('./assets/simplestyles.geojson', {
        //     clampToGround: true
        // });
        // geocachePromise.then(function(dataSource) {
        //     this.cesiumView.dataSources.add(dataSource);
        //
        //     const geocacheEntities = dataSource.entities.values;
        //     for (const entity of geocacheEntities) {
        //         if (Cesium.defined(entity.billboard)) {
        //             entity.billboard.verticalOrigin = Cesium.VerticalOrigin.BOTTOM;
        //             entity.label = undefined;
        //             entity.billboard.distanceDisplayCondition = new Cesium.DistanceDisplayCondition(10.0, 2000000.0);
        //
        //             const cartographicPosition = Cesium.Cartographic.fromCartesian(entity.position.getValue(Cesium.JulianDate.now()));
        //             const longitude = Cesium.Math.toDegrees(cartographicPosition.longitude);
        //             const latitude = Cesium.Math.toDegrees(cartographicPosition.latitude);
        //             const description = '<table class="cesium-infoBox-defaultTable cesium-infoBox-defaultTable-lighter"><tbody>' +
        //                 '<tr><th>' + 'Longitude' + '</th><td>' + longitude.toFixed(5) + '</td></tr>' +
        //                 '<tr><th>' + 'Latitude' + '</th><td>' + latitude.toFixed(5) + '</td></tr>' +
        //                 '</tbody></table>';
        //             entity.description = description;
        //         }
        //     }
        // }.bind(this));
        //
        // this.cesiumView.zoomTo(geocachePromise);
        // this.cesiumView.zoomTo(this.cesiumView.entities);

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

    getRotationValue() {
        this.rotation += 0.005;
        return this.rotation;
    }

}
