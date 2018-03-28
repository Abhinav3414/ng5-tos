import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/button';

import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { DataListModule } from 'primeng/datalist';
import { DataTableModule } from 'primeng/datatable';
import { InplaceModule } from 'primeng/inplace';
import { CardModule } from 'primeng/card';

@NgModule({
  imports: [MenuModule, ButtonModule, MenubarModule, DataListModule, DataTableModule, InplaceModule, CardModule],
  exports: [MenuModule, ButtonModule, MenubarModule, DataListModule, DataTableModule, InplaceModule, CardModule]
})
export class PrimeModule { }
