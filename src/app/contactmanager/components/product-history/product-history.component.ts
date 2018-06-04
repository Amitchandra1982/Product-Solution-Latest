import { ToastrService } from 'ngx-toastr';
import { ProductService } from './../../services/product.service';
import { Product } from './../../models/product.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-history',
  templateUrl: './product-history.component.html',
  styleUrls: ['./product-history.component.scss']
})
export class ProductHistoryComponent implements OnInit {

  productList = [];
  productList2 = [];
  product = new Product;
  constructor(private productService: ProductService, private tostr: ToastrService) { }

  ngOnInit() {
  }

  getProduct(productForm: NgForm) {
    this.productService.getHistoryForProduct( productForm.value.batchNumber)
      .subscribe((data: any) => {
        this.productList2 = [];
        console.log("This is response data: data................................." + JSON.stringify(data));
        // console.log("Owner is : "+ localStorage.getItem('owner') )
        // console.log("User Name is : "+ localStorage.getItem('owner'))
        data.forEach(element => {
          this.product = new Product;
          this.product.batchNumber = element.Value.batchid;
          this.product.barcode = element.Value.barcode;
          this.product.comment = element.Value.comment;
          this.product.expiryDate = new Date(parseInt(element.Value.expdate))// element.expdate;
          this.product.manufacturerName = element.Value.manname;
          this.product.manufacturingDate = new Date(parseInt(element.Value.manfdate));// element.manfdate;
          this.product.ownership = element.Value.ownership;
          this.product.price = element.Value.price;
          this.product.productName = element.Value.prdname;
          this.product.quantity = element.Value.quantity;
          this.product.temperature = element.Value.temp;
          this.product.weight = element.Value.weight
          this.product.status = element.Value.status

          this.productList2.push(this.product)
        })

        this.productList = this.productList2 as Product[];
        //this.cd.markForCheck();
        //this.sam= data;
        console.log("This is list==========================" + JSON.stringify(this.productList));
        console.log("This is response data==========================" + JSON.stringify(data));
        //console.log("This is response data"+ JSON.stringify(productList));

        // this.tostr.success('Added Succcessfully', 'Product Added');
        // console.log("value of e"+ JSON.stringify(e));
      }, err => {
        if (err.status == 200) {
          this.tostr.success('Product Fetched Successfully', '');
          console.log("Trx ID is " + err.error.text);
        }

        // console.log("value of e"+ JSON.stringify(e));
        console.log("error occured" + JSON.stringify(err));
      });

  }

}
