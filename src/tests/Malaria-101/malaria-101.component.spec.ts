import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageService } from '../../app/services/language.service';
import { Malaria101Component } from '../../app/malaria-101/malaria-101.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';
import { APIService } from '../../app/services/api.service';


describe('Malaria101Component', () => {
    let component: Malaria101Component;
    let fixture: ComponentFixture<Malaria101Component>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
            imports: [
                HttpModule,
                RouterTestingModule
            ],      
            declarations: [ Malaria101Component ],
            providers: [
                LanguageService,
                APIService
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(Malaria101Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
