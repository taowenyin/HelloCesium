import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// If youre using Cesium version >= 1.42.0 add this line
Cesium.buildModuleUrl.setBaseUrl('/assets/cesium/');

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
