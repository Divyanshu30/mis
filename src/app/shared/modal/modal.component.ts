import { Component, ViewChild, Input } from "@angular/core";
import { MzBaseModal, MzModalComponent } from 'ngx-materialize';
import { Subscription } from "rxjs";

import { ModalHelperService } from '../../services/modal-helper.service';

@Component({
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})

export class ModalComponent extends MzBaseModal {
    @ViewChild('modal') modal: MzModalComponent;
    @Input() modalProperty: string;
    modalCloseSubscription: Subscription;
    changeMessageSubscription: Subscription;

    loading: boolean = true;
    loadingSuccess: boolean = false;
    loadingError: boolean = false;
    
    constructor(private modalHelperService: ModalHelperService){
        super()
        this.modalCloseSubscription = this.modalHelperService.closeModal.subscribe(() => {
            this.modal.closeModal()
        })
        this.changeMessageSubscription = this.modalHelperService.changeMessage.subscribe((message: string) => {
            this.loading = false;
            if(message === 'success') {
                this.loadingError = false;
                this.loadingSuccess = true;
            }
            if(message === 'error') {
                this.loadingSuccess = false;
                this.loadingError = true;
            }
        })
    }

    public modalOptions: Materialize.ModalOptions = {
        dismissible: false,
        inDuration: 250,
        outDuration: 250,
        startingTop: '25%',
        endingTop: '30%',
        complete: () => {}
    };

    onContinue(){
        this.modal.closeModal()
        let action = this.modalProperty;
        this.modalHelperService.resetOrCancel.next(action)
    }

    ngOnDestroy(){
        if(this.modalCloseSubscription) this.modalCloseSubscription.unsubscribe()
        if(this.changeMessageSubscription) this.changeMessageSubscription.unsubscribe()
    }

}