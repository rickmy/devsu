import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmationModalComponent } from './confirmation-modal.component';

describe('ConfirmationModalComponent', () => {
  let component: ConfirmationModalComponent;
  let fixture: ComponentFixture<ConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ConfirmationModalComponent, CommonModule, FormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit confirm event when confirmAction is called', () => {
    spyOn(component.confirm, 'emit');
    component.confirmAction();
    expect(component.confirm.emit).toHaveBeenCalledWith(true);
  });

  it('should emit cancel event when closeAction is called', () => {
    spyOn(component.cancel, 'emit');
    component.closeAction();
    expect(component.cancel.emit).toHaveBeenCalledWith(true);
  });

  it('should render the title correctly', () => {
    const title = 'Test Product';
    component.title = title;
    fixture.detectChanges();
    const modalBody = fixture.nativeElement.querySelector('.modal-body');
    expect(modalBody.textContent + title).toContain(`Estas seguro de eliminar el producto ${title}`);
  });

  it('should have close button', () => {
    const closeButton = fixture.nativeElement.querySelector('.btn-secondary');
    expect(closeButton).toBeTruthy();
  });

  it('should have confirm button', () => {
    const confirmButton = fixture.nativeElement.querySelector('.btn-add');
    expect(confirmButton).toBeTruthy();
  });
});
