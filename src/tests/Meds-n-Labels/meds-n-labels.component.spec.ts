import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MedsNLabelsComponent } from '../../app/meds-n-labels/meds-n-labels.component';
import { LanguageService } from '../../app/services/language.service';
import { HttpModule } from '@angular/http';
import { APIService } from '../../app/services/api.service';


describe('MedsNLabelsComponent', () => {
    let component: MedsNLabelsComponent;
    let fixture: ComponentFixture<MedsNLabelsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                RouterTestingModule
            ],      
            declarations: [ MedsNLabelsComponent ],
            providers: [
                LanguageService,
                APIService
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MedsNLabelsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
