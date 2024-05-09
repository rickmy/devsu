import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '@shared/services/api/products.service';
import { Router } from '@angular/router';
import { Product } from '@core/models/product/product';
import { Subject, debounce, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { ConfirmationModalComponent } from '@shared/components/confirmation-modal/confirmation-modal.component';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    ConfirmationModalComponent,
    PaginationComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit, OnDestroy {

  unsubscribe$ = new Subject<void>();
  products: Product[] = [];
  productsFiltered: Product[] = [];

  displayModal = false;
  product: Product | undefined;
  row = 5;
  pageCurrent = 1;
  search = new FormControl('');

  constructor(
    private _productsService: ProductsService,
    private _router: Router,
    private _cd: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
    this.getProducts();
    this.search.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((value) => {
        this.productsFiltered = [];
        if(value === ''){
          this.getAllProducts(this.row);
          return;
        }

        this.products.filter((product) => {
          if(product.name.toLowerCase().indexOf(value!.toLowerCase()) > -1){
            this.productsFiltered.push(product);
          };
        });
        this.pageCurrent = 1;
      });
    }

  getProducts() {
    this._productsService.getProducts().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((products) => {
      this.products = products;
      products.length > this.row ? this.getAllProducts(this.row) : this.productsFiltered = products;
      this.changePage(this.pageCurrent);
      this._cd.detectChanges();
    });
  }

  getAllProducts(row: number) {
    this.productsFiltered = this.products.slice(0, row);
  }

  changePage(page: number) {
    this.pageCurrent = page;
    const start = (page - 1) * this.row;
    const end = Math.min(start + this.row, this.products.length);
    this.productsFiltered = this.products.slice(start, end);
  }

  redirectNew() {
    this._router.navigate(['new']);
  }

  redirectEdit(id: string) {
    this._router.navigate(['edit', id]);
  }

  showModal(product: Product){
    this.product = product;
    this.displayModal = true;
  }

  hiddenModal(){
    this.displayModal = false;
  }

  deleteProduct(){
    this._productsService.deleteProduct(this.product!.id).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(() => {
      debugger
      this.getProducts();
      this.hiddenModal();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
