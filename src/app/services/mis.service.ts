import { Injectable, Output, EventEmitter } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { ApiService } from './api.service';
import { MisData} from './../interfaces/mis-data.interface';

@Injectable()
export class MisService {
    @Output() letsMapMisData = new EventEmitter<boolean>()

    constructor(private apiService: ApiService,
                private http: HttpClient){}
    
    misHeaders: {}[] = [
        {name: 'Tracking ID', required: false},
        {name: 'MIS Period', required: true},
        {name: 'PO no.', required: false},
        {name: 'Tentative PO Date',required: false},
        {name: 'PO Description',required: false},
        {name: 'TCU Code',required: false},
        {name: 'Team Lead',required: true},
        {name: 'Project Name',required: true},
        {name: 'Technology', required: true},
        {name: 'Release / Non-Release',required: true},
        {name: 'Team Split',required: true},
        {name: 'Account Codes',required: true},
        {name: 'FS / CR',required: true},
        {name: 'Item Name',required: true},
        {name: 'FS/ CR Name',required: true},
        {name: 'Current Status',required: true},
        {name: 'Challenge',required: false},
        {name: 'General Remark',required: false},
        {name: 'Patch',required: false},
        {name: 'Assigned To',required: true},
        {name: 'Total Effort In Man-days',required: true},
        {name: 'Effort In Man-days (For The Month)',required: true},
        {name: 'Effort Approval By',required: false},
        {name: 'Effort Approval Date',required: false},
        {name: 'Approval Status',required: true},
        {name: 'Request Received Date',required: true},
        {name: 'Requested By (BSA)',required: true},
        {name: 'Walkthrough Planned Date',required: false},
        {name: 'Dev Planned Start Date',required: true},
        {name: 'Dev Planned End Date',required: true},
        {name: 'UAT Rel Planned Date',required: true},
        {name: 'Actual Walkthrough Date',required: false},
        {name: 'Assigned For Development Date',required: true},
        {name: 'Actual Dev Start Date',required: false},
        {name: 'Actual Dev End Date',required: false},
        {name: 'UAT Promotion / Sent For Sign-Off Date',required: false},
        {name: 'Delayed Delivery',required: false},
        {name: 'Reason For Delay',required: false},
        {name: 'TS Document',required: true},
        {name: 'Reviewed By',required: false},
        {name: 'Promotion Date',required: false},
        {name: 'Promoted By',required: false},
        {name: 'Promotion Ticket Number',required: false},
        {name: 'MIS Group',required: true},
        {name: 'Invoice No.',required: false}
    ]

    hintRow = {
        trackingId: 'Tracking ID',
        misPeriod: 'MIS Period',
        poNumber: 'PO no.',
        tentativePoDate: 'Tentative PO Date',
        poDescription: 'PO Description',
        tcuCode: 'TCU Code',
        teamLead: 'Team Lead',
        projectName: 'Project Name',
        relNonRel: 'Release / Non-Release',
        teamSplit: 'Team Split',
        accountCodes: 'Account Codes',
        technology: 'Technology',
        fscr: 'FS / CR',
        itemName: 'Item Name',
        fscrName: 'FS/ CR Name',
        currentStatus: 'Current Status',
        challenge: 'Challenge',
        generalRemark: 'General Remark',
        patch: 'Patch',
        assignedTo: 'Assigned To',
        totalEffort: 'Total Effort In Man-days',
        totalEffortForMonth: 'Effort In Man-days (For The Month)',
        effortApprovalBy: 'Effort Approval By',
        effortApprovalDate: 'Effort Approval Date',
        approvalStatus: 'Approval Status',
        requestReceivedDate: 'Request Received Date',
        requestedByBSA: 'Requested By (BSA)',
        walkthoughPlannedDate: 'Walkthrough Planned Date',
        devPlannedStartDate: 'Dev Planned Start Date',
        devPlannedEndDate: 'Dev Planned End Date',
        uatRelPlannedDate: 'UAT Rel Planned Date',
        actualWalkthroughDate: 'Actual Walkthrough Date',
        assignedDevelopmentDate: 'Assigned For Development Date',
        actualDevStartDate: 'Actual Dev Start Date',
        actualDevEndDate: 'Actual Dev End Date',
        uatPromotionSignOffDate: 'UAT Promotion / Sent For Sign-Off Date',
        delayedDelivery: 'Delayed Delivery',
        reasonForDelay: 'Reason For Delay',
        tsDocument: 'TS Document',
        reviewedBy: 'Reviewed By',
        promotionDate: 'Promotion Date',
        promotedBy: 'Promoted By',
        promotionTicketNumber: 'Promotion Ticket Number',
        misGroup: 'MIS Group',
        invoiceNumber: 'Invoice No.'
    }

    getMisData(){
        const url = this.apiService.createUrl('getAllProjects')
        return this.http.get(url)
    }
    
    addProject(data, editMode, trackingId){
        let url: string;
        if(editMode){
            url = this.apiService.createUrl('updateProject')
            data.trackingId = trackingId
        } else {
            url = this.apiService.createUrl('addProject')
        }
        return this.http.post(url, data)
    }

    getProjectById(id){
        const url = this.apiService.createUrl('getProjectById')
        const completeUrl = `${url}/${id}`
        return this.http.get(completeUrl)
    }

    getTrackingId(): string{
        let id = localStorage.getItem('javaId')
        if(!id){
            id = '1'
        }
        return id
    }

    validKeys = ['0','1','2','3','4','5','6','7','8','9']

    isKeyValid(key){
        if(this.validKeys.includes(key)){
            return key
        } else {
            return false
        }
    }

    
}