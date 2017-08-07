import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from '../header/header.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { NavbarService } from '../services/navbar.service';
import { PcpolicyComponent } from './pcpolicy.component';
import { APIService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { DashboardService } from '../services/dashboard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PcpolicyComponent', () => {
  let component: PcpolicyComponent;
  let fixture: ComponentFixture<PcpolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],      
      declarations: [ 
        PcpolicyComponent,
        HeaderComponent,
        NavbarComponent
      ],
      providers: [ 
        DashboardService,
        APIService,
        AuthService,
        NavbarService
      ]      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcpolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
