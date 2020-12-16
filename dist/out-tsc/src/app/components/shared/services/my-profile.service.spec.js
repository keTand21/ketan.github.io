import { TestBed } from '@angular/core/testing';
import { MyProfileService } from './my-profile.service';
describe('MyProfileService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));
    it('should be created', () => {
        const service = TestBed.get(MyProfileService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=my-profile.service.spec.js.map