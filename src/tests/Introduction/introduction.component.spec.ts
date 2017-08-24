import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { IntroductionComponent } from '../../app/introduction/introduction.component';
import { RouterTestingModule } from '@angular/router/testing';
import { LanguageService } from '../../app/services/language.service';
import { APIService } from '../../app/services/api.service';

describe('IntroductionComponent', () => {
    let component: IntroductionComponent;
    let fixture: ComponentFixture<IntroductionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpModule
            ],   
            declarations: [ IntroductionComponent ],
            providers: [
                LanguageService,
                APIService
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IntroductionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
