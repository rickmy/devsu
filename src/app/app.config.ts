import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authorInterceptor } from './core/interceptors/author.interceptor';
import { spinnerInterceptor } from './core/interceptors/spinner.interceptor';
import { errorHandlerInterceptor } from '@core/interceptors/errorHandler.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(withInterceptors([spinnerInterceptor, authorInterceptor, errorHandlerInterceptor]))]
};
