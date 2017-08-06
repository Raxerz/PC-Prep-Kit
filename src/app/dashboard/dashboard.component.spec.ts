import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from '../services/dashboard.service';
import { AuthService } from '../services/auth.service';
import { APIService } from '../services/api.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let dashboardService: DashboardService;
    let authService: AuthService;
    let apiService: APIService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ DashboardComponent ],
            imports: [
                RouterTestingModule,
                HttpModule
            ],            
            providers: [
                DashboardService,
                APIService,
                AuthService            
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        dashboardService = TestBed.get(DashboardService);
        apiService = TestBed.get(APIService);
        authService = TestBed.get(AuthService);
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
