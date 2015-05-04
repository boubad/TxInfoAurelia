//depchild.ts
//
import {IDepartementChildItem} from '../../infodata.d';
import {BaseItem} from './baseitem';
//
export class DepartementChildItem extends BaseItem
    implements IDepartementChildItem {
    private _departementid: string;
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.departementid !== undefined) {
                this.departementid = oMap.departementid;
            }
        } // oMap
    } // constructor
    public get departementid(): string {
        return (this._departementid !== undefined) ? this._departementid : null;
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
    public is_storeable(): boolean {
        return super.is_storeable() && (this.departementid !== null);
    }
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if (this.departementid !== null) {
            oMap.departementid = this.departementid;
        }
    } // toInsertMap
}