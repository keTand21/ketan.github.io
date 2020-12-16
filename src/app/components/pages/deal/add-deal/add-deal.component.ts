import { Component, OnInit, ViewChild, Inject, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResponseModel } from 'src/app/modals/response.model';
import { Constants, ShowAlert, MessageType } from '../../../shared/services/global.service';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import swal from 'sweetalert2';
import { MatPaginator, MatDialog, MatTableDataSource, MatSort } from '@angular/material';
import {
  GlobalService, arrGST,
  arrPackType, schemeType
} from '../../../shared/services/global.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';

import { DealModel } from '../../deal/deal.model';
import { Observable } from 'rxjs';
import ValidationMessages from '../add-deal/deal-validation-messages';
const arrValidators = [Validators.required, Validators.min(1), Validators.max(99999)];
import { formatDate } from '@angular/common';
import * as moment from 'moment';
import { CustomValidator } from 'src/app/components/shared/validations/custom.validator';
import { EmployesService } from 'src/app/components/shared/services/employes.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-add-deal',
  templateUrl: './add-deal.component.html',
  styleUrls: ['./add-deal.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class AddDealComponent implements OnInit {
  isFormSaving: boolean;
  isProdTitleLoading: boolean;
  isCompanyNameLoading: boolean;
  fileDataOfImageWeb1: File = null;
  fileDataOfImageMobile1: File = null;
  fileDataOfBannerImage: File = null;
  Constants = Constants;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  previewUrlOfImageWeb1: any = null;
  previewUrlOfImageMobile1: any = null;
  previewUrlOfBannerImage: any = null;
  openDialogInMode: string;
  now: Date = new Date();
  filteredProducts: Array<any> = [];
  filteredCompany: Array<any> = [];
  public schemeType: number = schemeType;
  public arrGST = arrGST;
  public arrPackType = arrPackType;
  public arrSchemeType = [
    { id: 0, displayValue: 'Quantity' },
    { id: 1, displayValue: 'Percentage' }
  ];
  public dropdownList = [];
  public selectedItems = [];
  public dropdownSettings = {};
  public ValidationMessages = ValidationMessages;
  public objEmployeeModel: DealModel;
  public employeeForm: FormGroup;
  public objCustomer: any = {};
  public doCalculationTimeout: any;
  date: Date;
  public objstartOnDateTime: any;
  public objEndOn: any;
  public objProdExpiryDate: any;
  public ProdTitleMassage: any;
  public lated: any;
  public lang: any;
  public dataa: any;

  constructor(public dialogRef: MatDialogRef<DealModel>,
    @Inject(MAT_DIALOG_DATA) public data: any,

    private fb: FormBuilder,
    public dialog: MatDialog,
    private globalService: GlobalService,
    private employesService: EmployesService
  ) { }

  ngOnInit() {

    if (this.data.objEmployeeModel) {
      this.objEmployeeModel = JSON.parse(JSON.stringify(this.data.objEmployeeModel));
    } else {
      this.objEmployeeModel = new DealModel();
    }

    this.openDialogInMode = this.data.openDialogInMode;
    this.objEmployeeModel = Object.assign({}, this.data.objEmployeeModel);
    console.log('this.objEmployeeModel ADD-EDIT', this.data.objEmployeeModel);
    this.objEmployeeModel.lat = this.data.dataa;
    this.objEmployeeModel.lng = this.data.datta;
    this.onBuildForm();
  }

  onCancel() {
    this.dialogRef.close();
  }
  onSave() {
    this.globalService.markAsTouched(this.employeeForm.controls);
    if (this.employeeForm.valid) {

      const objParams = JSON.parse(JSON.stringify(this.employeeForm.value));

      objParams['address'] = {
        city: this.employeeForm.value.city,
        geo: { lat: this.employeeForm.value.lat, lng: this.employeeForm.value.lng },
        street: this.employeeForm.value.street,
        suite: this.employeeForm.value.suite,
        zipcode: this.employeeForm.value.zipcode
      };
      objParams['company'] = {
        bs: this.employeeForm.value.bs,
        catchPhrase: this.employeeForm.value.catchPhrase,
        name: this.employeeForm.value.name
      }
      delete objParams['city'];
      delete objParams['lat'];
      delete objParams['lng'];
      delete objParams['street'];
      delete objParams['suite'];
      delete objParams['cizipcodety'];
      delete objParams['bs'];
      delete objParams['catchPhrase'];
      delete objParams['name'];
      delete objParams['cname'];
      delete objParams['id'];

      console.log('JSON.stringify(objParams)', JSON.stringify(objParams));

      if (this.employeeForm.value.id) {
        const subscription = this.employesService.updateEmployee(objParams)
          .subscribe((objResp: ResponseModel) => {
            ShowAlert(MessageType.SUCCESS, 'SUCCESS', objResp.message);
            if (objResp) {
              ShowAlert(MessageType.SUCCESS, 'SUCCESS', objResp.message);
              this.dialogRef.close(objResp);
            }
           
          }, error => {
           
            swal.fire(
              'Error',
              error,
              'error'
            );
          }, () => {

            this.isFormSaving = false;
            this.dialogRef.close(true);
          }
          ).add(() => {
            this.globalService.spinner.hide();
            subscription.unsubscribe();
          });
      } else {

        const subscription = this.employesService.addNewEmployee(objParams)
          .subscribe((objResp: ResponseModel) => {

            if (objResp) {
              ShowAlert(MessageType.SUCCESS, 'SUCCESS', objResp.message);
              this.dialogRef.close(objResp);
            }
          }, error => {
            console.log('Error while add new employee', error);
            swal.fire(
              'Error',
              error,
              'error'
            );
            this.dialogRef.close();
          }, () => {
            this.isFormSaving = false;

          }).add(() => {
            this.globalService.spinner.hide();
            subscription.unsubscribe();
          });
      }
    }


  }
  onBuildForm() {
    const reg = '([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

    this.employeeForm = this.fb.group({
      id: [''],
      name: [this.objEmployeeModel.name],
      username: [this.objEmployeeModel.username],
      email: [this.objEmployeeModel.email, [Validators.required, CustomValidator.email, CustomValidator.email]],
      phone: [this.objEmployeeModel.phone, [Validators.required]],
      city: [this.objEmployeeModel.city],
      zipcode: [this.objEmployeeModel.zipcode],
      street: [this.objEmployeeModel.street],
      suite: [this.objEmployeeModel.suite],
      lat: [this.objEmployeeModel.lat],
      lng: [this.objEmployeeModel.lng],
      cname: [this.objEmployeeModel.cname],
      website: [this.objEmployeeModel.website, [Validators.required, Validators.pattern(reg)]],
      catchPhrase: [this.objEmployeeModel.catchPhrase],
      bs: [this.objEmployeeModel.bs],
      address: [this.objEmployeeModel.address],
      company: [this.objEmployeeModel.company],

    });
  }


}