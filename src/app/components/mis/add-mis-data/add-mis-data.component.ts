import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ModalComponent } from '../../../shared/modal/modal.component';

import { MisService } from '../../../services/mis.service';
import { DataStoreService } from './../../../services/data-store.service';
import { MzModalService } from 'ngx-materialize';
import { ModalHelperService } from '../../../services/modal-helper.service';

@Component({
    selector: 'app-add-mis-data',
    templateUrl: './add-mis-data.component.html',
    styleUrls: ['./add-mis-data.component.scss']
})

export class AddMisDataComponent implements OnInit {
    @ViewChild('misForm') misForm: NgForm;

    misPeriod: string;

    ItemName: string = '';
    ItemNameLength: number = 32;
    TotalEffort: string = '';
    TotalEffortForMonth: string = ''
    value: string = ''
    
    cancelAddMisDataSubscription: Subscription;
    title: string;
    submitted: boolean = false;
    editMode: boolean = false;

    onAddSubscription: Subscription;
    isDataAdded: boolean = false;
   
    disableReset: boolean = true;
    trackingId: string;

    fieldRequired: string = 'This field is required'
    today: Date;

    constructor(private misService: MisService,
                private modalService: MzModalService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private modalHelperService: ModalHelperService,
                private dataStoreService: DataStoreService){
                  
                }

    public optionsWithMinDate: Pickadate.DateOptions = {
        // format: 'dddd, dd mmm, yyyy',
        // formatSubmit: 'yyyy-mm-dd',
        min: new Date()
    }

    public options: Pickadate.DateOptions = {
        format: 'dddd, dd mmm, yyyy',
        formatSubmit: 'yyyy-mm-dd',
    };

    ngOnInit(){
        const path = (this.activatedRoute.snapshot.routeConfig.path).substr(0, 3)
        this.trackingId = this.activatedRoute.snapshot.params.id
        this.submitted = false
        if(path === 'add') {
            this.title = 'Add new data';
            this.editMode = false;
        } else {
                this.title = `Edit tracking id:  ${this.trackingId}`
                this.editMode = true;
                const isData = this.dataStoreService.misData;
                if(isData){
                    this.loadForm(this.dataStoreService.misData[this.trackingId])
                } else {
                    this.checkIfDataAdded()
                    setTimeout(() => {
                        this.modalService.open(ModalComponent, { modalProperty: 'loading' });

                        this.dataStoreService.isMisDataPresent()
                            .then(() => {
                                this.loadCurrentMisData()
                            })
                            .catch(() => {
                                this.misService.getMisData()
                                    .subscribe((res: any) => {
                                        this.dataStoreService.saveData(res.result)
                                            .then(() => {
                                                this.loadCurrentMisData()
                                            })
                                    })
                            })

                    }, 750)
                }
        }
    }

    onEffortChange(e){
        e.preventDefault()
        if(this.misService.isKeyValid(e.key)){
            if(!this.TotalEffort){
                if(e.key == 0){
                    e.preventDefault()
                } else {
                    this.TotalEffort = (e.key).toString()
                }
            } else if(this.TotalEffort.length >= 3) {
                e.preventDefault()
            } else {
                this.TotalEffort = this.TotalEffort.toString().concat(e.key)
            }
        }
    }

    onEffortChangeForMonth(e){
        e.preventDefault()
        if(this.misService.isKeyValid(e.key)){
            if(!this.TotalEffortForMonth){
                if(e.key == 0){
                    e.preventDefault()
                } else {
                    this.TotalEffortForMonth = (e.key).toString()
                }
            } else if(this.TotalEffortForMonth.length >= 3) {
                e.preventDefault()
            } else {
                this.TotalEffortForMonth = this.TotalEffortForMonth.toString().concat(e.key)
            }
        }
    }

    loadCurrentMisData(){
        this.misService.getProjectById(this.trackingId).subscribe((res: any) => {
            this.loadForm(res.result)
        }, () => {
            this.modalHelperService.changeMessage.next('error')
            this.closeModal()
        })
    }

    loadForm(editData){
        setTimeout(() => {
            this.misForm.setValue({
                misPeriod: editData.misPeriod ? editData.misPeriod : '',
                poNumber:  editData.poNumber ? editData.poNumber:'',
                tentativePoDate: editData.tentativePoDate  ?  editData.tentativePoDate : '',
                poDescription: editData.poDescription ? editData.poDescription:'',
                tcuCode: editData.tcuCode ? editData.tcuCode:'',
                teamLead: editData.teamLead,
                projectName: editData.projectName,
                relNonRel: editData.relNonRel,
                teamSplit: editData.teamSplit,
                accountCodes: editData.accountCodes,
                technology: editData.technology,
                fscr: editData.fscr,
                itemName: editData.itemName,
                fscrName: editData.fscrName,
                currentStatus: editData.currentStatus,
                challenge: editData.challenge ? editData.challenge:'',
                generalRemark: editData.generalRemark ? editData.generalRemark:'',
                patch: editData.patch ? editData.patch:'',
                assignedTo: editData.assignedTo,
                totalEffort: editData.totalEffort,
                totalEffortForMonth: editData.totalEffortForMonth,
                effortApprovalBy: editData.effortApprovalBy ? editData.effortApprovalBy:'',
                effortApprovalDate: editData.effortApprovalDate ? editData.effortApprovalDate:'',
                approvalStatus: editData.approvalStatus,
                requestReceivedDate: editData.requestReceivedDate,
                requestedByBSA: editData.requestedByBSA,
                walkthoughPlannedDate: editData.walkthoughPlannedDate ? editData.walkthoughPlannedDate:'',
                devPlannedStartDate: editData.devPlannedStartDate,
                devPlannedEndDate: editData.devPlannedEndDate,
                uatRelPlannedDate: editData.uatRelPlannedDate,
                actualWalkthroughDate: editData.actualWalkthroughDate ? editData.actualWalkthroughDate:'',
                assignedDevelopmentDate: editData.assignedDevelopmentDate,
                actualDevStartDate: editData.actualDevStartDate ? editData.actualDevStartDate:'',
                actualDevEndDate: editData.actualDevEndDate ? editData.actualDevEndDate:'',
                uatPromotionSignOffDate: editData.uatPromotionSignOffDate ? editData.uatPromotionSignOffDate:'',
                delayedDelivery: editData.delayedDelivery ? editData.delayedDelivery:'',
                reasonForDelay: editData.reasonForDelay ? editData.reasonForDelay:'',
                tsDocument: editData.tsDocument,
                reviewedBy: editData.reviewedBy ? editData.reviewedBy:'',
                promotionDate: editData.promotionDate ? editData.promotionDate:'',
                promotedBy: editData.promotedBy ? editData.promotedBy:'',
                promotionTicketNumber: editData.promotionTicketNumber ? editData.promotionTicketNumber:'',
                misGroup: editData.misGroup,
                invoiceNumber: editData.invoiceNumber ? editData.invoiceNumber:'',
            })
            this.isDataAdded = true;
            this.closeModal()
        }, 1000);
        this.isDataAdded = true;
    }

    onAddData(){
        if(this.misForm.valid){
            this.checkIfDataAdded()
            this.submitted = true;
            this.modalService.open(ModalComponent, { modalProperty: 'loading' });
            this.onAddSubscription = this.misService.addProject(this.misForm.value, this.editMode, this.trackingId)
                .subscribe((row: any) => {
                    this.modalHelperService.changeMessage.next('success')
                    this.dataStoreService.addToMisData(row.result, this.trackingId, this.editMode)
                    this.closeModal()
                    setTimeout(() => {
                        this.router.navigate(['/mis'])
                    }, 750);
            }, () => {
                this.modalHelperService.changeMessage.next('error')
                setTimeout(() => {
                    this.closeModal()
                }, 2000);
            })
        }   
    }

    checkIfDataAdded(){
        setTimeout(() => {
            if(this.isDataAdded !== true){
                if(this.onAddSubscription) this.onAddSubscription.unsubscribe();
                this.modalHelperService.changeMessage.next('error')
            }
        }, 10000);
    }

    onSelectRequestReceivedDate(requestReceivedDate){
        this.misPeriod = requestReceivedDate.value;
    }

    onResetOrCancel(action){
        if(!this.misForm.dirty && action === 'cancel'){
            this.router.navigate(['/mis'])
            return;
        }
        this.modalService.open(ModalComponent, { modalProperty: action });
        this.modalHelperService.resetOrCancel.subscribe((action: string) => {
            if(action === 'reset'){
                if(this.misForm) {
                    this.submitted = false;
                    this.disableReset = true;
                    this.misForm.setValue({
                        misPeriod: '',
                        poNumber:  '',
                        tentativePoDate: '',
                        poDescription: '',
                        tcuCode: '',
                        teamLead: '',
                        projectName: '',
                        relNonRel: '',
                        teamSplit: '',
                        accountCodes: '',
                        technology:'',
                        fscr: '',
                        itemName: '',
                        fscrName: '',
                        currentStatus: '',
                        challenge:'',
                        generalRemark: '',
                        patch: '',
                        assignedTo: '',
                        totalEffort: '',
                        totalEffortForMonth: '',
                        effortApprovalBy: '',
                        effortApprovalDate: '',
                        approvalStatus: '',
                        requestReceivedDate: '',
                        requestedByBSA: '',
                        walkthoughPlannedDate: '',
                        devPlannedStartDate: '',
                        devPlannedEndDate: '',
                        uatRelPlannedDate: '',
                        actualWalkthroughDate: '',
                        assignedDevelopmentDate: '',
                        actualDevStartDate: '',
                        actualDevEndDate: '',
                        uatPromotionSignOffDate: '',
                        delayedDelivery: '',
                        reasonForDelay: '',
                        tsDocument: '',
                        reviewedBy: '',
                        promotionDate: '',
                        promotedBy: '',
                        promotionTicketNumber: '',
                        misGroup: '',
                        invoiceNumber: ''
                    })
                }
            } else if(action === 'cancel'){
                this.router.navigate(['/mis'])
            }
        })
    }

    onDatePick(){
        this.disableReset = false;
    }

    closeModal(){
        setTimeout(() => {
            this.modalHelperService.closeModal.emit(true)
        }, 500);
    }

}