//depintervalmodel.ts
//
import {UserInfo} from '../userinfo';
import {IIntervalItem} from '../../../infodata.d';
import {InfoRoot} from '../../../inforoot';
import {SigleNameViewModel} from './siglenameviewmodel';
//
export class IntervalViewModel<T extends IIntervalItem> extends SigleNameViewModel<T> {
    //
    constructor(userinfo: UserInfo) {
        super(userinfo);
    }// constructor
    public get startDate(): string {
        let x = this.currentItem;
        return (x !== null) ? InfoRoot.date_to_string(x.startDate) : null;
    }//
    public set startDate(s: string) {
        let x = this.currentItem;
        if (x !== null) {
            x.startDate = InfoRoot.string_to_date(s);
        }
    }
    public get endDate(): string {
        let x = this.currentItem;
        return (x !== null) ? InfoRoot.date_to_string(x.endDate) : null;
    }//
    public set endDate(s: string) {
        let x = this.currentItem;
        if (x !== null) {
            x.endDate = InfoRoot.string_to_date(s);
        }
    }
}// class IntervalViewModel
