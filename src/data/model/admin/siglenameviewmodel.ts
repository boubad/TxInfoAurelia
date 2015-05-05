//siglenameviewmodel.ts
//
//
import {UserInfo} from '../userinfo';
import {ISigleNameItem} from '../../../infodata.d';
import {BaseEditViewModel} from './baseeditmodel';
//
export class SigleNameViewModel<T extends ISigleNameItem> extends BaseEditViewModel<T> {
    //
    constructor(userinfo: UserInfo) {
        super(userinfo);
    }// constructor
    //
    public get sigle(): string {
        let x = this.currentItem;
        return (x !== null) ? x.sigle : null;
    }
    public set sigle(s: string) {
        let x = this.currentItem;
        if (x !== null) {
            x.sigle = s;
        }
    }
    public get name(): string {
        let x = this.currentItem;
        return (x !== null) ? x.name : null;
    }
    public set name(s: string) {
        let x = this.currentItem;
        if (x !== null) {
            x.name = s;
        }
    }
    public get description(): string {
        let x = this.currentItem;
        return (x !== null) ? x.description : null;
    }
    public set description(s: string) {
        let x = this.currentItem;
        if (x !== null) {
            x.description = s;
        }
    }
}// class BaseEditViewModel
