import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardService } from '../../../app/services/dashboard.service';
import { APIService } from '../../../app/services/api.service';
import { HighlightActivityComponent } from '../../../app/introduction/activity-1/activity-1.component';
import { SharedDataService } from '../../../app/services/shared.data.service';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LanguageService } from '../../../app/services/language.service';
import { ToastsManager, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { InfokitService } from '../../../app/services/infokit.service';


describe('HighlightActivityComponent', () => {
    let component: HighlightActivityComponent;
    let fixture: ComponentFixture<HighlightActivityComponent>;
    let dashboardService: DashboardService;
    let apiService: APIService;
    let sharedService: SharedDataService;
    let selection = window.getSelection();
    let languageService = LanguageService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
            declarations: [ HighlightActivityComponent ],
            imports: [
                RouterTestingModule,
                HttpModule
            ],             
            providers: [
                SharedDataService, 
                DashboardService,
                APIService,
                LanguageService,
                ToastsManager,
                ToastOptions,
                InfokitService
            ]            
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HighlightActivityComponent);
        component = fixture.componentInstance;
        dashboardService = TestBed.get(DashboardService);
        sharedService = TestBed.get(SharedDataService);
        apiService = TestBed.get(APIService);
        languageService = TestBed.get(LanguageService);        
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('malaria definition is highlighted', () => {
        const rangeObject = {
            removeAllRanges: function(){return ''},
            empty: function(){return ''}
        };        
        spyOn(window, 'getSelection').and.returnValues('An intermittent and remittent fever caused by a protozoan parasite that invades the red blood cells. The parasite is transmitted by mosquitoes in many tropical and subtropical regions.', rangeObject); 
        //selection.removeAllRanges = jasmine.createSpy("removeSel").and.returnValue('');         
        spyOn(selection, 'removeAllRanges').and.returnValue('');
        component.select();
        expect(component.activityComplete).toBeTruthy();
    });        

});
