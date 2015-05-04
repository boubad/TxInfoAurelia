//depintervalmodel.ts
//
import {UserInfo} from '../userinfo';
import {IIntervalItem} from '../../../infodata.d';
import {InfoRoot} from '../../../inforoot';
import {DepPagedViewModel} from './deppagedviewmodel';
//
export class IntervalViewModel<T extends IIntervalItem> extends DepPagedViewModel<T> {
    //
    constructor(userinfo: UserInfo, model: T) {
        super(userinfo, model);
    }// constructor
    public get startDate(): string {
        let x = this.currentItem;
        return (x !== null) ? InfoRoot.date_to_string(x.startDate) : null;
        }//
    public set startDate(s:string) {
        let x = this.currentItem;
        if (x !== null){
            x.startDate = InfoRoot.string_to_date(s);
        }
    }
    public get endDate(): string {
        let x = this.currentItem;
        return (x !== null) ? InfoRoot.date_to_string(x.endDate) : null;
        }//
    public set endDate(s:string) {
        let x = this.currentItem;
        if (x !== null){
            x.endDate = InfoRoot.string_to_date(s);
        }
    }
}// class Dep PagedViewModel