import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NewComponent } from './new.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ProductsService } from '../../shared/services/api/products.service';
import { ToastService } from '@shared/services/toast.service';
import { Subject } from 'rxjs';
import { Product } from '@core/models/product/product';

describe('NewComponent', () => {
  let component: NewComponent;
  let fixture: ComponentFixture<NewComponent>;
  let mockProductsService: Partial<ProductsService>;
  let mockToastService: Partial<ToastService>;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    mockProductsService = {
      verifyId: () => of(false),
      postProduct: (product: Product) => of(product),
    };

    mockToastService = {
      openToast: () => { }
    };

    await TestBed.configureTestingModule({
      imports: [
        NewComponent,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ProductsService, useValue: mockProductsService },
        { provide: ToastService, useValue: mockToastService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to route params and call getProduct if id is present', () => {
    spyOn(component, 'getProduct');
    (activatedRoute.params as Subject<any>).next({ id: '123' });
    expect(component.getProduct).toHaveBeenCalledWith('123');
  });

  it('should call builderForm', () => {
    spyOn(component, 'builderForm');
    component.ngOnInit();
    expect(component.builderForm).toHaveBeenCalled();
  });



});

