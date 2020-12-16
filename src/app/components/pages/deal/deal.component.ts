import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResponseModel } from 'src/app/modals/response.model';
import { Constants, MessageType, ShowAlert, Status } from '../../shared/services/global.service';
import swal from 'sweetalert2';
import { Pagination } from '../../shared/services/global.service';
import { MatPaginator, MatDialog, MatSort } from '@angular/material';
import {
  GlobalService, arrGST,
  arrPackType
} from '../../shared/services/global.service';
import * as moment from 'moment';

import { DealModel } from '../deal/deal.model';
import { AddDealComponent } from '../deal/add-deal/add-deal.component';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { EmployesService } from '../../shared/services/employes.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.sass']
})
export class DealComponent implements OnInit {

  @Input() childlist: string;
  loadingDealsId: number;
  public datepickerfilter: boolean;
  public objConstants = Constants;
  searchField = '';
  selectedDateColumn = 'UpdatedOn';
  arrDateFilters = [
    { columnName: 'StartOn-EndOn', displayValue: 'StartOn-EndOn' },
    // { columnName: 'ProdMfgDate', displayValue: 'ProdMfgDate' },
    { columnName: 'ProdExpiryDate', displayValue: 'ProdExpiryDate' },
    { columnName: 'CreatedOn', displayValue: 'CreatedOn' },
    { columnName: 'UpdatedOn', displayValue: 'UpdatedOn' },
  ];
  public arrStatuss: Array<any> = [];
  public objStatus = Status;
  public arrDataSource: any;
  arrSelectedStatus = [];

  selDateRange = {
    // startDate: moment().subtract(Constants.SELECT_DEFAULT_LAST_DAYS, 'days'),
    startDate: moment().subtract(),
    endDate: moment().subtract()
  };

  dropdownList = [];
  dropdownSettings = {};
  // maxDate = moment();
  // minDate = moment('2019-11-01');
  singleSelection = [];
  control: FormControl = new FormControl('');
  public pagination = Pagination;
  ladd: any;
  loag: any;

  form: FormGroup;
  ranges: any = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  };

  objDateRangeSettings = {
    format: 'YYYY-MM-DD',
    applyLabel: 'Set',
    dateLimit: 2,
    customRangeLabel: 'Custom Range'
  };

  public objPagination = {
    currentPage: 1,
    itemsPerPage: Pagination.pageSize,
    totalItems: Pagination.pageSize,
    allowPaginationAfter: Pagination.allowPaginationAfter,
    sortField: 'StartOn',
    sortOrder: 'DESC',
  };

  objCustomer: any = {};

  constructor(
    public dialog: MatDialog,
    private globalService: GlobalService,
    private employesService: EmployesService,

  ) { }

  displayedColumns: string[] = ['StartOn', 'EndOn', 'Discount', 'Buy', 'Get', 'SearchCount',
    'Status', 'CreatedOn', 'UpdatedOn', 'Action'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.getemployeelist();
  }
  getemployeelist() {
    const objParams = {}

    this.employesService.getEmployes(objParams)
      .subscribe((objResp: ResponseModel) => {
        this.globalService.spinner.hide();
        if (objResp) {
          this.arrDataSource = objResp;
          this.ladd = objResp[1].address.geo.lat;
          this.loag = objResp[1].address.geo.lng;


        }

      }, (error) => {

      }).add(() => {
        this.globalService.spinner.hide();
      });

  }

  getEmployeeDetails(objEmploye: DealModel, openDialogInMode = 'edit') {
    const objEmployeDetails = { ...objEmploye, ...objEmploye } as DealModel
    objEmployeDetails.city = objEmploye.address.city;
    objEmployeDetails.street = objEmploye.address.street;
    objEmployeDetails.suite = objEmploye.address.suite;
    objEmployeDetails.zipcode = objEmploye.address.zipcode;
    objEmployeDetails.lat = objEmploye.address.geo.lat;
    objEmployeDetails.lng = objEmploye.address.geo.lng;

    objEmployeDetails.cname = objEmploye.company.name;
    objEmployeDetails.catchPhrase = objEmploye.company.catchPhrase;
    objEmployeDetails.bs = objEmploye.company.bs;

    console.log('======>', objEmployeDetails);
    this.onAddEmployee(objEmployeDetails, openDialogInMode);

  }

  deleteEmploye(id: any) {
    const objParams = {
      id: id,
    };
    const subscription = this.employesService.deleteEmployee(objParams)
      .subscribe((objResp: ResponseModel) => {
        swal.fire(
          'Deleted!',
          objResp.message,
          'success'
        );
      }, (error) => {
        Swal.fire(
          'employee not delete',
          'Error'
        )
      }, () => {

      }).add(() => subscription.unsubscribe());
  }

  onAddEmployee(objEmployeeModel: DealModel, openDialogInMode = 'edit') {
    const dataa = this.ladd;
    const datta = this.loag;

    //objEmployeeModel.lng = 
    const dialogRef = this.dialog.open(AddDealComponent,
      { data: { objEmployeeModel, datta, dataa, openDialogInMode }, width: '600px', disableClose: true });
    dialogRef.afterClosed().subscribe(resp => {
      if (!resp) {
        return;
      } else {

      }
    });
  }


}