import { fakeAsync, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { HttpModule, XHRBackend, ResponseOptions, Response, RequestMethod } from '@angular/http';
import { APIService } from './api.service';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { environment } from '../../environments/environment';

const mockLoginResponse = {user: {email: 'abc@gmail.com', name: 'Rajath'}, token: 'abcdef'};
const loginAuthUrl = environment.baseURL + environment.authEndpoint + 'login';
const logoutAuthUrl = environment.baseURL + environment.authEndpoint + 'login';

describe('AuthService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthService, 
                APIService,
                {
                  provide: XHRBackend,
                  useClass: MockBackend
                }               
            ],
			imports: [
				RouterTestingModule,
				HttpModule
			],           
        });
    });

    it('should be created', fakeAsync(
        inject([
            XHRBackend, 
            AuthService
        ], (mockBackend: MockBackend, service: AuthService) => {
            mockBackend.connections.subscribe(
                (connection: MockConnection) => {
                    if (connection.request.url === logoutAuthUrl) {
                        expect(connection.request.method).toBe(RequestMethod.Get);
                        connection.mockRespond(new Response(
                            new ResponseOptions({})
                        ));                
                    } else if (connection.request.url === loginAuthUrl) {
                        expect(connection.request.method).toBe(RequestMethod.Post);
                        connection.mockRespond(new Response(
                            new ResponseOptions({ body: mockLoginResponse })
                        ));                    
                    }
                });            
                expect(service).toBeTruthy();
                service.logout()
                        .subscribe(res => {
                            expect(service).toBeTruthy();
                        });                
                service.loginUser({email: 'abc@gmail.com', password: 'abc'})
                        .subscribe(res => {
                            expect(res).toBeTruthy();
                        });
            })
    ));
});