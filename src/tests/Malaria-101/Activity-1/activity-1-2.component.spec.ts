import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { MalariaLifeCycleComponent } from '../../../app/malaria-101/activity-1/activity-1-2.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardService } from '../../../app/services/dashboard.service';
import { APIService } from '../../../app/services/api.service';
import { SharedDataService } from '../../../app/services/shared.data.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InfokitService } from '../../../app/services/infokit.service';
import { LanguageService } from '../../../app/services/language.service';
import { ToastsManager, ToastOptions } from 'ng2-toastr/ng2-toastr';

describe('MalariaLifeCycleComponent', () => {
    let component: MalariaLifeCycleComponent;
    let fixture: ComponentFixture<MalariaLifeCycleComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
            imports: [
                RouterTestingModule,
                HttpModule
            ],      
            declarations: [ MalariaLifeCycleComponent ],
            providers: [
                DashboardService,
                APIService,
                SharedDataService,
                InfokitService,
                LanguageService,
                ToastOptions,
                ToastsManager   
            ]      
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MalariaLifeCycleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

});
