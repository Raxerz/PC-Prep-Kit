import { TestBed, inject } from '@angular/core/testing';
import { APIService } from './api.service';
import { HttpModule } from '@angular/http';
import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
    beforeEach(() => {
            TestBed.configureTestingModule({
            imports: [
                HttpModule
            ], 
            providers: [DashboardService, APIService]
        });
    });

    it('should be created', inject([DashboardService], (service: DashboardService) => {
        expect(service).toBeTruthy();
    }));
});
