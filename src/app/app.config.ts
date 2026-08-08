import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import {HttpClient, provideHttpClient} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), importProvidersFrom(MatButtonModule), provideAnimations() ],
};
