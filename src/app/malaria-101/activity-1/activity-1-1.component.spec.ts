import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { AnimatedVideoComponent } from './activity-1-1.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardService } from '../../services/dashboard.service';
import { APIService } from '../../services/api.service';
import { SharedDataService } from '../../services/shared.data.service';

describe('AnimatedVideoComponent', () => {
  let component: AnimatedVideoComponent;
  let fixture: ComponentFixture<AnimatedVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpModule
      ],      
      declarations: [ AnimatedVideoComponent ],
      providers: [
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
