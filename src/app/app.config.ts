import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import {HttpClient, provideHttpClient, withFetch} from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withFetch()), importProvidersFrom(MatButtonModule), provideAnimations(), provideClientHydration(withEventReplay()) ],
};
