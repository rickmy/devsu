import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list.component';
import { ProductsService } from '@shared/services/api/products.service';
import { Router } from '@angular/router';
import { Product } from '@core/models/product/product';
import { Subject, of } from 'rxjs';
import { ConfirmationModalComponent } from '@shared/components/confirmation-modal/confirmation-modal.component';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { FormControl } from '@angular/forms';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let productsServiceSpy: jasmine.SpyObj<ProductsService>;
  let routerSpy: jasmine.SpyObj<Router>;
  const mockProducts: Product[] = [
    { id: '1', name: 'Product 1', description: 'Description 1', logo: 'logo1.png', date_release:'2024-05-06', date_revision:'2025-05-06' },
    { id: '2', name: 'Product 2', description: 'Description 2', logo: 'logo2.png', date_release:'2024-05-06', date_revision:'2025-05-06' },
    { id: '3', name: 'Product 3', description: 'Description 3', logo: 'logo3.png', date_release:'2024-05-06', date_revision:'2025-05-06' }
  ];
  const mockProductsFiltered: Product[] = [
    { id: '1', name: 'Product 1', description: 'Description 1', logo: 'logo1.png', date_release:'2024-05-06', date_revision:'2025-05-06' },
    { id: '2', name: 'Product 2', description: 'Description 2', logo: 'logo2.png', date_release:'2024-05-06', date_revision:'2025-05-06' },
    { id: '3', name: 'Product 3', description: 'Description 3', logo: 'logo3.png', date_release:'2024-05-06', date_revision:'2025-05-06' }

  ];

  beforeEach(waitForAsync(() => {
    productsServiceSpy = jasmine.createSpyObj('ProductsService', ['getProducts', 'deleteProduct']);
    productsServiceSpy.getProducts.and.returnValue(of(mockProducts));
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [ CommonModule, FormsModule, ReactiveFormsModule,ListComponent, ConfirmationModalComponent, PaginationComponent ],
      providers: [
        { provide: ProductsService, useValue: productsServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get products on init', () => {
    productsServiceSpy.getProducts.and.returnValue(of(mockProducts));

    component.ngOnInit();

    expect(productsServiceSpy.getProducts).toHaveBeenCalled();
    expect(component.products).toEqual(mockProducts);
    expect(component.productsFiltered).toEqual(mockProductsFiltered);
  });

  it('should change page', () => {
    component.products = mockProducts;

    component.changePage(1);

    expect(component.productsFiltered.length).toEqual(3);
    expect(component.productsFiltered[0]).toEqual(mockProducts[0]);
  });

  it('should redirect to new product', () => {
    component.redirectNew();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['new']);
  });

  it('should redirect to edit product', () => {
    const productId = '1';
    component.redirectEdit(productId);

    expect(routerSpy.navigate).toHaveBeenCalledWith(['edit', productId]);
  });

  it('should show modal', () => {
    const mockProduct: Product = { id: '1', name: 'Product 1', description: 'Description 1', logo: 'logo1.png', date_release:'2024-05-06', date_revision:'2025-05-06' };

    component.showModal(mockProduct);

    expect(component.displayModal).toBeTrue();
    expect(component.product).toEqual(mockProduct);
  });

  it('should hide modal', () => {
    component.hiddenModal();

    expect(component.displayModal).toBeFalse();
    expect(component.product).toBeUndefined();
  });

  it('should delete product', () => {
    const mockProduct: Product = { id: '1', name: 'Product 1', description: 'Description 1', logo: 'logo1.png', date_release:'2024-05-06', date_revision:'2025-05-06' };
    productsServiceSpy.deleteProduct.and.returnValue(of());
    productsServiceSpy.getProducts.and.returnValue(of(mockProducts));

    component.product = mockProduct;
    component.deleteProduct();

    expect(productsServiceSpy.deleteProduct).toHaveBeenCalledWith(mockProduct.id);
    expect(productsServiceSpy.getProducts).toHaveBeenCalled();
    expect(component.products).toEqual(mockProducts);
  });

  it('should unsubscribe on destroy', () => {
    const unsubscribeSpy = spyOn(component.unsubscribe$, 'next');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });

  it('should filter products on search', () => {
    const searchControl = new FormControl();
    component.search = searchControl;
    component.products = mockProducts;

    searchControl.setValue('Product');

    expect(component.productsFiltered.length).toEqual(3);
  expect(component.productsFiltered[0]).toEqual(mockProducts[0]);
  });
});
