import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { HttpModule } from '@angular/http';
import { APIService } from './api.service';

describe('AuthService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthService, APIService],
			imports: [
				RouterTestingModule,
				HttpModule
			],           
        });
    });

    it('should be created', inject([AuthService], (service: AuthService) => {
        expect(service).toBeTruthy();
    }));
});
