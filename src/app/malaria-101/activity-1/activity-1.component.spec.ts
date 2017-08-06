import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardService } from '../../services/dashboard.service';
import { AnimatedVideoComponent } from './activity-1-1.component';
import { ResponseOptions, Response, Http, BaseRequestOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { APIService } from '../../services/api.service';
import { SharedDataService } from '../../services/shared.data.service';


const mockHttpProvider = {
    deps: [ MockBackend, BaseRequestOptions ],
    useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
        return new Http(backend, defaultOptions);
    }
};


describe('AnimatedVideoComponent', () => {
  let component: AnimatedVideoComponent;
  let fixture: ComponentFixture<AnimatedVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimatedVideoComponent ],
      providers: [
        { provide: Http, useValue: mockHttpProvider }, 
        DashboardService,
        APIService,
        SharedDataService
      ]      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
