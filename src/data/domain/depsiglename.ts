//depsiglenameitem.ts
//
import {IDepSigleNameItem} from '../../infodata.d';
import {SigleNameItem} from './siglenameitem';
import {InfoRoot} from '../../inforoot';
//
export class DepSigleNameItem extends SigleNameItem implements IDepSigleNameItem {
    private _departementid: string = null;
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.departementid !== undefined) {
                this.departementid = oMap.departementid;
            }
        } // oMap
    } // constructor
    public get departementid(): string {
        return this._departementid;
    }
    public set departementid(s: string) {
        this._departementid = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
            s.trim() : null;
    }
    public start_key(): string {
        let s = this.base_prefix();
        if ((s !== null) && (this.departementid !== null)) {
            s = s + '-' + this.departementid;
        }
        return s;
    }
    public create_id(): string {
        let s = this.start_key();
        if ((s !== null) && (this.sigle !== null)) {
                s = s + '-' + this.sigle.trim().toUpperCase();
        }
        return s;
    } // create_id
    public is_storeable(): boolean {
        return (this.sigle !== null) && (this.departementid !== null);
    }
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if (this.departementid !== null) {
            oMap.departementid = this.departementid;
        }
    } // toInsertMap
}
