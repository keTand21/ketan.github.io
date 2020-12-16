import { async, TestBed } from '@angular/core/testing';
import { LifeAtMedrevoComponent } from './life-at-medrevo.component';
describe('LifeAtMedrevoComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LifeAtMedrevoComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(LifeAtMedrevoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=life-at-medrevo.component.spec.js.map