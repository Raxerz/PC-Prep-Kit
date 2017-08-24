import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SplashscreenComponent } from '../../app/splashscreen/splashscreen.component';
import { LanguageService } from '../../app/services/language.service';
import { HttpModule } from '@angular/http';
import { APIService } from '../../app/services/api.service';

describe('SplashscreenComponent', () => {
    let component: SplashscreenComponent;
    let fixture: ComponentFixture<SplashscreenComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpModule
            ],      
            declarations: [ SplashscreenComponent ],
            providers: [
                LanguageService,
                APIService
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SplashscreenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
