import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { AnimatedVideoComponent } from '../../../app/malaria-101/activity-1/activity-1-1.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardService } from '../../../app/services/dashboard.service';
import { APIService } from '../../../app/services/api.service';
import { SharedDataService } from '../../../app/services/shared.data.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LanguageService } from '../../../app/services/language.service';


describe('AnimatedVideoComponent', () => {
    let component: AnimatedVideoComponent;
    let fixture: ComponentFixture<AnimatedVideoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
            imports: [
                RouterTestingModule,
                HttpModule
            ],      
            declarations: [ AnimatedVideoComponent ],
            providers: [
                DashboardService,
                APIService,
                SharedDataService,
                LanguageService
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
