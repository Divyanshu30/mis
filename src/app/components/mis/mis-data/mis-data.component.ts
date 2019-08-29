import { Component, HostBinding, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'lodash';

import { MisService } from '../../../services/mis.service';
import { DataStoreService } from './../../../services/data-store.service';

import { routeAnimationTrigger } from './../../../routes/routing.animations';
import { AuthService } from '../../../services/auth.service';
import { MisData } from './../../../interfaces/mis-data.interface';
import { ModalHelperService } from '../../../services/modal-helper.service';

@Component({
    selector: 'app-mis-data',
    templateUrl: './mis-data.component.html',
    styleUrls: ['./mis-data.component.scss'],
    animations: [ routeAnimationTrigger ]
})

export class MisDataComponent implements OnInit, OnDestroy {
    @HostBinding('@routeAnimationState') routeAnimationState;
    @ViewChild('misForm') misForm: NgForm;
    loadDataSubscription: Subscription;
    searchText:string =  '';
    
    tableData: {}[];
    misHeaders: {}[] = [];
    trackingId: string = '';
    misPeriod: string = '';

    rowData: any;
    editRowTrackingId: any;

    showAddDataRow: boolean = false;
    addDataButtonText: string = 'ADD'
    
    selectedRowIndex: number = -1;
    oldSelectedIndex = -1;
    showHintRowIndex: number = -1;

    loadingData: boolean = true;
    loadingError: boolean = false;

    constructor(private misService: MisService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private dataStoreService: DataStoreService,
                private authService: AuthService,
                private modalHelperService: ModalHelperService){}

    ngOnInit(){
        this.modalHelperService.closeModal.emit(true)
        this.misHeaders = this.misService.misHeaders;
        this.tableData = []
        let misData = this.dataStoreService.misData;
        if(misData){
            this.mapData()
            this.loadingData = false;
        } else {
            this.fetchMisData();
        }
    }

    fetchMisData(){
        this.checkIfLoadedData()
        this.loadingError = false;
        this.loadingData = true;
        this.loadDataSubscription = this.misService.getMisData().subscribe((res: any) => {
            this.loadingData = false;
            this.dataStoreService.saveData(res.result)
            this.mapData()
        }, () => {
            this.loadingData = false;
            this.loadingError = true;
        })
    }

    mapData(){
        map(this.dataStoreService.misData, (row: MisData) => {
            this.tableData.push(row)
        })
    }

    checkIfLoadedData(){
        setTimeout(() => {
            if(!this.dataStoreService.misData){
                this.loadDataSubscription.unsubscribe()
                this.loadingData = false;
                this.loadingError = true;
            }
        }, 10000);
    }

    reloadData(){
        this.fetchMisData()
    }

    onAddData(){
        this.unselectRow()
        this.router.navigate(['/mis', 'add'])
    }

    onEditData(){
        this.unselectRow()
        const id = this.editRowTrackingId;
        this.router.navigate(['/mis', 'edit', id], { relativeTo: this.activatedRoute })
    }

    unselectRow(){
        if(this.showHintRowIndex > -1){
            this.tableData.splice(this.oldSelectedIndex, 1)
            this.showHintRowIndex = -1;
            this.oldSelectedIndex = -1;
            this.selectedRowIndex = - 1;
        }
    }
    
    onReset(){
        this.misForm.reset()
        this.router.navigate(['/mis', 'edit', this.editRowTrackingId], { relativeTo: this.activatedRoute })
    }

    onSelectRow(index, trackingId){
        this.editRowTrackingId = trackingId;
        if(index == 0){

           if(this.selectedRowIndex == 0){
            this.selectedRowIndex = -1;
            } else {
                this.selectedRowIndex = index;
            }

            if(this.showHintRowIndex > -1){
                this.tableData.splice(this.oldSelectedIndex, 1)
                this.showHintRowIndex = -1;
                this.oldSelectedIndex = -1;
            }
            
        } else if (this.oldSelectedIndex == index - 1){
            this.tableData.splice(this.oldSelectedIndex, 1)
            this.showHintRowIndex = -1;
            this.oldSelectedIndex = -1;
            this.selectedRowIndex = -1;

        } else {
            if(index == this.oldSelectedIndex){
                return
            }
            
            if(this.showHintRowIndex > -1){
                this.selectedRowIndex = index;
            } else {
                this.selectedRowIndex = index + 1;
            }
            
            if(this.showHintRowIndex > -1){
                this.tableData.splice(this.oldSelectedIndex, 1)
                this.showHintRowIndex = this.selectedRowIndex - 1;
                
                if(index < this.oldSelectedIndex){
                    this.showHintRowIndex = this.selectedRowIndex
                    this.selectedRowIndex = this.selectedRowIndex + 1;
                }
                this.oldSelectedIndex = this.showHintRowIndex;
                this.createHintRow()
                return 
            } else {
                this.showHintRowIndex = index;
                this.oldSelectedIndex = this.showHintRowIndex;
                this.createHintRow()
            }
        }
    }

    createHintRow(){
        this.tableData.splice(this.showHintRowIndex, 0, this.misService.hintRow)
    }

    ngOnDestroy(){
        if(this.loadDataSubscription){
            this.loadDataSubscription.unsubscribe();
        }
    }

}