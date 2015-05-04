//siglenameitem.ts
//
import {ISigleNameItem} from '../../infodata.d';
import {BaseItem} from './baseitem';
import {InfoRoot} from '../../inforoot';
//
export class SigleNameItem extends BaseItem implements ISigleNameItem {
    private _sigle: string;
    private _name: string;
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.sigle !== undefined) {
                this.sigle = oMap.sigle;
            }
            if (oMap.name !== undefined) {
                this.name = oMap.name;
            }
        } // oMap
    } // constructor
    public get sigle(): string {
        return (this._sigle !== undefined) ? this._sigle : null;
    }
    public set sigle(s: string) {
        this._sigle = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
            s.trim().toUpperCase() : null;
    }
    public get name(): string {
        return (this._name !== undefined) ? this._name : null;
    }
    public set name(s: string) {
        this._name = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
            s.trim() : null;
    }
    public create_id(): string {
        let s = this.start_key();
        if ((s !== null) && (this.sigle !== null)) {
                s = s + "-" + this.sigle.trim().toUpperCase();
        }
        return s;
    } // create_id
    public is_storeable(): boolean {
        return super.is_storeable() && (this.sigle !== null);
    }
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if (this.sigle !== null) {
            oMap.sigle = this.sigle;
        }
        if (this.name !== null) {
            oMap.name = this.name;
        }
    } // toInsertMap
    public toString(): string {
        return (this.name !== null) ? this.name : this.sigle;
    } // toString
    public sort_func(p1: ISigleNameItem, p2: ISigleNameItem): number {
        let s1 = p1.sigle;
        let s2 = p2.sigle;
        if ((s1 !== null) && (s2 !== null)) {
            return s1.localeCompare(s2);
        } else if ((s1 === null) && (s2 !== null)) {
            return 1;
        } else if ((s1 !== null) && (s2 === null)) {
            return -1;
        } else {
            return 0;
        }
    } // sort_func
}
