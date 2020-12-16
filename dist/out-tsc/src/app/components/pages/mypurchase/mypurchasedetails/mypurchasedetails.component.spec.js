import { async, TestBed } from '@angular/core/testing';
import { MypurchasedetailsComponent } from './mypurchasedetails.component';
describe('MypurchasedetailsComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MypurchasedetailsComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(MypurchasedetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=mypurchasedetails.component.spec.js.map