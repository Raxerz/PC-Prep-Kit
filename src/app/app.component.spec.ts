import { TestBed, async } from '@angular/core/testing';
import { ResponseOptions, Response, Http, BaseRequestOptions, RequestMethod } from '@angular/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedDataService } from './services/shared.data.service';
import { DashboardService } from './services/dashboard.service';
import { AuthService } from './services/auth.service';
import { APIService } from './services/api.service';
import { RegService } from './services/reg.service';
import { NavbarService } from './services/navbar.service';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

const mockHttpProvider = {
    deps: [ MockBackend, BaseRequestOptions ],
    useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
        return new Http(backend, defaultOptions);
    }
};

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
            imports: [
                RouterTestingModule
            ],
            providers: [
                { provide: Http, useValue: mockHttpProvider },
                SharedDataService,
                DashboardService,
                APIService,
                AuthService,
                RegService,
                NavbarService,
                ToastsManager
            ],      
            declarations: [
                AppComponent,
                HeaderComponent,
                NavbarComponent
            ],
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

});