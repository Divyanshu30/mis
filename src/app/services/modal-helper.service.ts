import { Injectable, Output, EventEmitter, ViewChild, } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class ModalHelperService {
    @Output() closeModal = new EventEmitter<boolean>()
    @Output() changeMessage = new Subject<string>()
    @Output() resetOrCancel = new Subject<string>()
}