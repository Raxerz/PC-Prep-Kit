import { TestBed, inject } from '@angular/core/testing';
import { DashboardService } from './dashboard.service';
import { SharedDataService } from './shared.data.service';
import { APIService } from './api.service';
import { HttpModule } from '@angular/http';

describe('SharedDataService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule
            ],        	
            providers: [SharedDataService, DashboardService, APIService]
        });
    });

    it('should be created', inject([SharedDataService], (service: SharedDataService) => {
        expect(service).toBeTruthy();
    }));
});
