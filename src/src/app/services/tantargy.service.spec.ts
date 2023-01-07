import { TestBed } from '@angular/core/testing';

import { TantargyService } from './tantargy.service';

describe('TantargyService', () => {
    let service: TantargyService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(TantargyService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
