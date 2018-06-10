import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { UtilityService } from '../services/utility.service';

import { CustomerDialogComponent } from './customer-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Customer } from './customer';
import { BreadCrumb } from '../menu/breadCrumb';

import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

@Component({
  selector: 'customer-main',
  templateUrl: './customer-main.html',
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate('200ms ease-in')
      ])
    ])
  ]
})
export class CustomerMainComponent {
  customers = [];
  customer = new Customer();
  bread: BreadCrumb;
  myControl: FormControl = new FormControl();

  countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua & Barbuda",
    "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh",
    "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia & Herzegovina",
    "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia",
    "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands",
    "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark",
    "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
    "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia",
    "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland",
    "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras",
    "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel",
    "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos",
    "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia",
    "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco",
    "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles",
    "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama",
    "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion",
    "Romania", "Russia", "Rwanda", "Saint Pierre & Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia",
    "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa",
    "South Korea", "Spain", "Sri Lanka", "St Kitts & Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan",
    "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand",
    "Timor L'Este", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks & Caicos",
    "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam",
    "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];

  filteredCountries: Observable<string[]>;

  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute,
    private dialog: MatDialog, private utilityService: UtilityService) {
  }

  ngOnInit() {
    this.utilityService.currentBreadCrumb.subscribe(bread => this.bread = bread);

    console.log("hi")
    this.dataService.getUsers()
    .then((resCustomerData) => console.log(resCustomerData));
    
    this.dataService.getEntityAllData('customers')
      .then((resCustomerData) => {
        resCustomerData.forEach(e => this.customers.push(e));
      },
      (err) => console.log("customers could not be fetched :" + err)
      );

    this.filteredCountries = this.myControl.valueChanges
      .pipe(
      startWith(''),
      map(val => this.filter(val))
      );
  }

  filter(val: string): string[] {
    return this.countries.filter(country =>
      country.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  openDialog(): void {
    this.customer = new Customer();
    let dialogRef = this.dialog.open(CustomerDialogComponent, {
      data: this
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'dialogDismissed' && result !== undefined) {
        this.addNewEntity('customers', result, this.customers)
      }
    });

  }

  addNewEntity(entityName, entity, entityArray) {
    this.dataService.postEntity(entityName, entity)
      .then((resEmployeeData) => {
        entityArray.push(resEmployeeData);
      },
      (err) => console.log(entityName + " could not be added :" + err)
      );
  }

  openUpdateDialog(id: number): void {
    const index = this.customers.findIndex(c => c.id === id);
    this.customer = this.customers[index];
    var customerCopy = Object.assign({}, this.customer);

    let dialogRef = this.dialog.open(CustomerDialogComponent, {
      data: this
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'dialogDismissed' && result !== undefined) {
        this.updateEntity('customers', id, result, this.customers);
      } else {
        this.customers[index] = customerCopy;
      }
    });
  }

  updateEntity(entityName, id, entity, entityArray) {
    this.dataService.updateEntity(entityName, id, entity)
      .then((resEmployeeData) => {
        let index = entityArray.findIndex(e => e.id === entity.id);
        entityArray[index] = entity;
      },
      (err) => console.log(entityName + " could not be updated :" + err)
      );
  }


  deleteCustomer(id) {
    this.dataService.delelteEntity('customers', id)
      .then((resCustomerData) => {
        this.customers.splice(this.customers.findIndex(function(i) {
          return i.id === id;
        }), 1);
      },
      (err) => console.log("Customer could not be deleted :" + err)
      );
  }

  navigateViewCustomer(id) {
    let entity = this.customers[this.customers.findIndex(c => c.id === id)];
    this.utilityService.addBreadCrumb(2, '', 'view/customer', id, 'entity', entity.name);
    this.router.navigate(['view/customer', id], { skipLocationChange: false });
  }

  checkEntity(entity) {
    return this.utilityService.checkEntity(entity);
  }

}
