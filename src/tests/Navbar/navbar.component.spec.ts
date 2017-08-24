import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { HeaderComponent } from '../../app/header/header.component';
import { NavbarComponent } from '../../app/navbar/navbar.component';
import { NavbarService } from '../../app/services/navbar.service';
import { APIService } from '../../app/services/api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DashboardService } from '../../app/services/dashboard.service';
import { LanguageService } from '../../app/services/language.service';

describe('NavbarComponent', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
            imports: [
                HttpModule,
                BrowserAnimationsModule
            ],
            declarations: [ 
                NavbarComponent,
                HeaderComponent
            ],
            providers: [ 
                DashboardService,
                NavbarService,
                APIService,
                LanguageService
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
