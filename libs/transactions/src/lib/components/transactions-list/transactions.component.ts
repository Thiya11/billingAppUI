import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { URL_CONFIG } from 'libs/shared/configs/url-mapper';
import { CommonService } from 'libs/shared/services/common.service';

@Component({
  selector: 'lib-transactions',
  templateUrl:'./transactions.component.html'
})
export class TransactionsComponent implements OnInit {

  public itemPerPage: number            = 25;
  public currentPage: number            = 1;
  public transactionData: Array<any>    = [];
  public availablePages: number         = 0;
  public selectItemPerPage: FormControl = new FormControl(25, [Validators.required]);
  public itemPerPageList                = [{'label':25, 'value':25}, {'label':50, 'value':50}, {'label':100, 'value':100}];
  public searchTerm: FormControl        = new FormControl('');
  public visibleHeaders                 = ['Bill Id', 'User Id', 'Date', 'Time', 'Total Price (₹)', 'Total Tax (₹)', 'Total Amount (₹)', 'Quick Actions'];

  constructor(
    private httpClient:HttpClient,
    private commonService: CommonService,
    private router: Router
  ){}

  ngOnInit(): void {
   this.getAllTransactions();
   this.selectItemPerPage.valueChanges.subscribe((item)=> {
    this.itemPerPage = item;
    this.searchTerm.setValue('');
    this.getAllTransactions();
   })
   this.searchTerm.valueChanges.subscribe((search) => {
     if(search === '' && this.transactionData.length < 2) {
      this.getAllTransactions()
     }
   })
  }

  getAllTransactions () {
    let url = this.searchTerm.value === '' ? URL_CONFIG.getAllTransactions + 'size=' + this.itemPerPage + '/page=' + this.currentPage
              : URL_CONFIG.getAllTransactions + this.searchTerm.value;
    this.httpClient.get(url)
    .subscribe((data)=> {
      this.transactionData = data['success'].transactionsList;
      if (data['success'].totalPages && data['success'].page) {
        this.currentPage     = data['success'].page;
        this.availablePages  = data['success'].totalPages;
      }
      this.transactionData.forEach((transaction) => {
        transaction.total_price = Number(transaction.total_price);
        transaction.total_tax   = Number(transaction.total_tax);
        transaction['total_amount'] = transaction.total_price + transaction.total_tax;
        let dateTime = this.commonService.getCurrentTimeZoneTime(transaction.bill_date);
        transaction['bill_date'] = dateTime.date;
        transaction['bill_time'] = dateTime.time;
      })
    },
    (err)=> {
      console.log(err);
    })
  }

  onChangePage(page:number) {
    this.currentPage = page;
    this.getAllTransactions();
  }

  getTransactionDetail (billId:number) {
    this.httpClient.get(URL_CONFIG.getBillInfo + billId)
    .subscribe((data)=> {
      this.router.navigate(['transaction-info/' + billId], {state: data['success']})
    }, 
    (err)=> {
      console.log(err)
    })
  }

}
