import { Injectable } from '@angular/core';
import { mapKeys } from 'lodash';

@Injectable()
export class DataStoreService {
    misData: any;

    saveData(data){
        let promise = new Promise(resolve => {
            const newData = mapKeys(data, 'trackingId')
            this.misData = newData;
            resolve()
        })
        return promise
    }

    addToMisData(row, trackingId, editMode){
        let promise = new Promise(resolve => {
            if(editMode){
                this.misData[trackingId] = row
            } else {
                this.misData = { ...this.misData, [row.trackingId]: row }
            }
            resolve()
        })
        return promise
        
    }

    isMisDataPresent(){
        let promise = new Promise((resolve, reject) => {
            if(this.misData){
               resolve()
            } else {
                reject()
            }
        })
        return promise
    }

}