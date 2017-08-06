import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { MemoryGameComponent } from './activity-2.component';
import { SharedDataService } from '../../services/shared.data.service';
import { DashboardService } from '../../services/dashboard.service';
import { AuthService } from '../../services/auth.service';
import { APIService } from '../../services/api.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('MemoryGameComponent', () => {
  let component: MemoryGameComponent;
  let fixture: ComponentFixture<MemoryGameComponent>;
  let dashboardService: DashboardService;
  let authService: AuthService;
  let apiService: APIService;  
  let sharedService: SharedDataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
          RouterTestingModule,
          HttpModule
      ],       
      declarations: [ MemoryGameComponent ],
      providers: [
        DashboardService,
        APIService,
        AuthService,
        SharedDataService        
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoryGameComponent);
    component = fixture.componentInstance;
    dashboardService = TestBed.get(DashboardService);
    apiService = TestBed.get(APIService);
    authService = TestBed.get(AuthService);
    sharedService = TestBed.get(SharedDataService);     
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
