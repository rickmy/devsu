import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PaginationComponent, FormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit page change event', () => {
    spyOn(component.changePage, 'emit');
    const pageSelected = 2;
    component.changePageCurrent(pageSelected);
    expect(component.changePage.emit).toHaveBeenCalledWith(pageSelected);
  });

  it('should emit row change event', () => {
    spyOn(component.changeRow, 'emit');
    component.row = 10;
    component.changeCountedRow();
    expect(component.changeRow.emit).toHaveBeenCalledWith(component.row);
  });

  it('should calculate total pages correctly', () => {
    component.total = 25;
    component.row = 5;
    component.calculateTotalPages();
    expect(component.totalPage).toBe(5);
    expect(component.listPages.length).toBe(5);
  });
});
