import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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
import { SignUpService } from 'src/app/services/sign-up.service';
import { ISignUpModel } from 'src/app/shared/model/interface/i-sign-up-model';
import { NotificationType } from 'src/app/util/notification_type';
import { requestRoutes } from 'src/app/util/request_routes';
const columns = [
  'membersCode',
  'fullName',
  'email',
  'contactNo',
  'referalCode',
  'status',
  'downline',
];

var routes = new requestRoutes();

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css'],
})
export class MembersListComponent implements OnInit {
  search = '';
  isApproved = 0;
  result_length = 0;
  pageNumber = 1;
  pageSize = 10;
  isLoading = false;
  searchControl = new FormControl();

  displayedColumns: string[] = columns;
  dataSource = new MatTableDataSource<ISignUpModel>();

  selectedItem!: ISignUpModel;

  constructor(
    private dialog: MatDialog,
    private httpClient: HttpClient,
    private signUpService: SignUpService,
    private notificationService: NotificationService
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
          this.isLoading = true;
        }),
        switchMap((value) => {
          this.search = value;

          var url: string =
            routes.baseBackendUrl +
            routes.signUp +
            `/pagination?search_value=${value}&pageNumber=${this.pageNumber}&pageSize=${this.pageSize}`;
          let header = new HttpHeaders();
          header = header.set('api-key', routes.apiKey);

          return this.httpClient
            .get(url, {
              headers: header,
            })
            .pipe(
              finalize(() => {
                this.isLoading = false;
              })
            );
        })
      )
      .subscribe({
        next: (res) => {
          const retVal: any = res;
          const { data } = retVal;
          const { result } = data;
          const { count } = data;

          this.result_length = count;
          this.dataSource = new MatTableDataSource(result);
        },
        error: (err) => {
          console.log({
            error: err,
          });
        },
        complete: () => {
          setTimeout(async () => {
            this.isLoading = false;
            console.log('completed');
          }, 1000);
        },
      });
  }

  fetchData() {
    this.isLoading = true;
    this.signUpService
      .fetchData(this.search, this.pageNumber, this.pageSize)
      ?.subscribe({
        next: (res) => {
          const retVal: any = res;
          const { data } = retVal;
          const { result } = data;
          const { count } = data;

          this.result_length = count;
          this.dataSource = new MatTableDataSource(result);
        },
        error: (err) => {
          console.log({
            error: err,
          });
        },
        complete: () => {
          setTimeout(async () => {
            this.isLoading = false;
          }, 1000);
        },
      });
  }
  rowSelected(item: ISignUpModel) {
    this.selectedItem = item;
    this.isApproved = item.status;
  }

  remove() {
    this.signUpService.remove(this.selectedItem.id)?.subscribe({
      next: (res) => {},
      error: (err) => {
        console.log({
          error: err,
        });
      },
      complete: () => {
        this.notificationService.showNotification(
          NotificationType.success,
          'Successfully Removed!',
          'Success'
        );
        setTimeout(async () => {
          this.fetchData();
        }, 1000);
      },
    });
  }
  approve(status: number) {
    this.signUpService.approve(this.selectedItem.id, status)?.subscribe({
      next: (res) => {},
      error: (err) => {
        console.log({
          error: err,
        });
      },
      complete: () => {
        this.notificationService.showNotification(
          NotificationType.success,
          'Successfully Approved!',
          'Success'
        );
        setTimeout(async () => {
          this.fetchData();
        }, 1000);
      },
    });
  }
  refresh() {
    this.clear();
  }
  clear() {
    this.search = '';
    this.searchControl.reset();
    this.paginator.firstPage();

    this.fetchData();
  }
  convertStatus(status: number) {
    if (status === 0) {
      return 'Pending';
    } else if (status === 1) {
      return 'Approve';
    } else if (status === 2) {
      return 'Disapprove';
    } else if (status === 3) {
      return 'In Active';
    }
    return 'Undefined';
  }
  paginate(item: any) {
    this.pageNumber = item.pageIndex + 1;
    this.pageSize = item.pageSize;

    this.fetchData();
  }
}
