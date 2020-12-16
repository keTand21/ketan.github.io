import { async, TestBed } from '@angular/core/testing';
import { TermsOfUseComponent } from './terms-of-use.component';
describe('TermsOfUseComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TermsOfUseComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(TermsOfUseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=terms-of-use.component.spec.js.map