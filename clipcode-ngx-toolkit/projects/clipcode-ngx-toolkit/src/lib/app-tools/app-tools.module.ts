import { NgModule } from '@angular/core';
import { ClipcodeNgxToolkitSharedModule } from '../shared/shared.module';

import { AppInfoTreeComponent } from './app-info-tree/app-info-tree.component';

@NgModule({
  declarations: [
    AppInfoTreeComponent
  ],
  imports: [
    ClipcodeNgxToolkitSharedModule
  ],
  exports: [
    AppInfoTreeComponent
  ]
})
export class ClipcodeNgxToolkitAppToolsModule { }
