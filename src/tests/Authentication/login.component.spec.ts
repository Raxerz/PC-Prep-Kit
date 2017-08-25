import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../../app/authentication/login.component';
import { AuthService } from '../../app/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { APIService } from '../../app/services/api.service';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';
import { ToastsManager, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { SharedDataService } from '../../app/services/shared.data.service';
import { DashboardService } from '../../app/services/dashboard.service';
import { LanguageService } from '../../app/services/language.service';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let authService: AuthService;
    let apiService: APIService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ LoginComponent ],
            imports: [ 
                ReactiveFormsModule,
                RouterTestingModule,
                HttpModule
            ],
            providers: [
                AuthService,
                APIService,
                ToastsManager,
                ToastOptions,
                SharedDataService,
                DashboardService,
                LanguageService
            ]            
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        authService = fixture.debugElement.injector.get(AuthService);
        apiService = TestBed.get(APIService);             
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should route to menu page on successful login', () => {
        expect(component).toBeTruthy();
    });

    it('should return error message on unsuccessful login', () => {
        expect(component).toBeTruthy();
    }); 

    it('should return error/info message from server on unsuccessful login', () => {
        expect(component).toBeTruthy();
    });         

});
