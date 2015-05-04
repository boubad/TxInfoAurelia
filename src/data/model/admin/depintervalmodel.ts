//depintervalmodel.ts
//
import {UserInfo} from '../userinfo';
import {IIntervalItem} from '../../../infodata.d';
import {InfoRoot} from '../../../inforoot';
import {DepPagedViewModel} from './deppagedviewmodel';
//
export class IntervalViewModel<T extends IIntervalItem> extends DepPagedViewModel<T> {
    //
    private _start:Date;
    private _end: Date;
    //
    constructor(userinfo: UserInfo, model: T) {
        super(userinfo, model);
        this._start = null;
        this._end = null;
    }// constructor
    public get startDate(): string {
        return InfoRoot.date_to_string(this._start);
        }//
    public set startDate(s:string) {
          this._start = InfoRoot.string_to_date(s);
    }
    public get endDate(): string {
        return InfoRoot.date_to_string(this._end);
        }//
    public set endDate(s:string) {
        this._end = InfoRoot.string_to_date(s);
    }
    protected post_change_item(): any {
      super.post_change_item();
        let x = this.currentItem;
        this._start = (x !== null) ? x.startDate : null;
        this._end = (x !== null) ? x.endDate : null;
    }// post_change_item
    protected is_storeable():boolean {
      if (!super.is_storeable()){
        return false;
      }
      if ((this._start === null) || (this._end === null)){
        return false;
      }
      let t1 = Date.parse(this._start.toString());
      let t2 = Date.parse(this._end.toString());
      if (isNaN(t1) || isNaN(t2)){
        return false;
      }
      return (t1 <= t2);
    }
    protected retrieve_item(): T {
      let x = super.retrieve_item();
      x.startDate = this._start;
      x.endDate = this._end;
      return x;
    }
}// class Dep PagedViewModel
