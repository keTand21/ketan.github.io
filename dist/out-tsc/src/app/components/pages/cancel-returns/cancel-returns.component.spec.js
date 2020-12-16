import { async, TestBed } from '@angular/core/testing';
import { CancelReturnsComponent } from './cancel-returns.component';
describe('CancelReturnsComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CancelReturnsComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(CancelReturnsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=cancel-returns.component.spec.js.map