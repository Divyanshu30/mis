import { MisService } from './../../services/mis.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RoutingModule } from './../../routes/routing.module';

import { MzButtonModule, MzInputModule, 
    MzSelectModule, MzDatepickerModule, 
    MzTabModule, MzModalModule, MzSpinnerModule, MzIconModule} from 'ngx-materialize';
    
import { MisDataComponent } from './mis-data/mis-data.component';
import { AddMisDataComponent } from './add-mis-data/add-mis-data.component';
import { ModalComponent } from '../../shared/modal/modal.component';

import { DateFixPipe } from '../../pipes/date-fix.pipe';
import { FilterPipe } from './../../pipes/filter.pipe';

@NgModule({
    declarations: [
        MisDataComponent,
        AddMisDataComponent,
        ModalComponent,
        DateFixPipe,
        FilterPipe
    ],
    imports: [
        FormsModule,
        CommonModule,
        RoutingModule,
        MzButtonModule,
        MzInputModule,
        MzSelectModule,
        MzDatepickerModule,
        MzTabModule,
        MzModalModule,
        MzSpinnerModule,
        MzIconModule,
    ],
    entryComponents: [
        MisDataComponent,
        AddMisDataComponent,
        ModalComponent
    ],
    providers: [
        MisService
    ]
})

export class HomeModule {}