import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  switchMap,
  tap,
} from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { PayoutRequestService } from 'src/app/services/payout-request.service';
import { IPayoutRequestModel } from 'src/app/shared/model/interface/i-payour-request-model';
import { NotificationType } from 'src/app/util/notification_type';
import { requestRoutes } from 'src/app/util/request_routes';

const columns = [
  'method',
  'amount',
  'member_name',
  'dateRequested',
  'datePaid',
  'status',
];
var routes = new requestRoutes();

@Component({
  selector: 'app-payment-request',
  templateUrl: './payment-request.component.html',
  styleUrls: ['./payment-request.component.css'],
})
export class PaymentRequestComponent implements OnInit {
  search = '';
  result_length = 0;
  pageNumber = 1;
  pageSize = 10;
  displayedColumns: string[] = columns;

  dataSource = new MatTableDataSource<IPayoutRequestModel>();
  selectedItem!: IPayoutRequestModel;

  searchControl = new FormControl();

  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationService,
    private payoutRequestService: PayoutRequestService
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.fetchData();

    this.searchControl.valueChanges
      .pipe(
        filter((res) => {
          return res !== null;
        }),
        distinctUntilChanged(),
        debounceTime(1000),
        tap(() => {
          // this.isLoading = true;
        }),
        switchMap((value) => {
          this.search = value;

          return this.payoutRequestService
            .fetchData(value, this.pageNumber, this.pageSize)
            .pipe(finalize(() => {}));
        })
      )
      .subscribe({
        next: (res) => {
          this.loadData(res);
        },
        error: (err) => {
          console.log({
            error: err,
          });
        },
        complete: () => {
          setTimeout(async () => {
            console.log('completed');
          }, 1000);
        },
      });
  }

  fetchData() {
    this.payoutRequestService
      .fetchData(this.search, this.pageNumber, this.pageSize)
      ?.subscribe({
        next: (res) => {
          this.loadData(res);
        },
        error: (err) => {
          console.log({
            error: err,
          });
        },
        complete: () => {
          setTimeout(async () => {}, 1000);
        },
      });
  }
  rowSelected(item: IPayoutRequestModel) {
    this.selectedItem = item;
  }

  loadData(res: any) {
    const retVal: any = res;
    const { data } = retVal;
    const { result } = data;
    const { count } = data;

    this.result_length = count;
    this.dataSource = new MatTableDataSource(result);
  }

  clear() {
    this.search = '';
    this.searchControl.reset();
    this.paginator.firstPage();

    this.fetchData();
  }
  refresh() {
    this.clear();
    this.fetchData();
  }
  approve(param: number) {
    if (this.selectedItem.status == 1) {
      this.notificationService.showNotification(
        NotificationType.warning,
        'This is already paid!',
        'Warning'
      );
      return;
    }

    this.payoutRequestService.paid(this.selectedItem.id)?.subscribe({
      next: (res) => {},
      error: (err) => {
        console.log({
          error: err,
        });
      },
      complete: () => {
        this.notificationService.showNotification(
          NotificationType.success,
          'Successfully Paid!',
          'Success'
        );
        setTimeout(async () => {
          this.fetchData();
        }, 1000);
      },
    });
  }
  paginate(item: any) {
    this.pageNumber = item.pageIndex + 1;
    this.pageSize = item.pageSize;

    this.fetchData();
  }
}
