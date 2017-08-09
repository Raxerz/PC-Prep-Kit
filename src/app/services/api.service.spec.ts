import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { APIService } from './api.service';

describe('APIService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule
            ],        	
            providers: [APIService]
        });
    });

    it('should be created', inject([APIService], (service: APIService) => {
        expect(service).toBeTruthy();
    }));
});
