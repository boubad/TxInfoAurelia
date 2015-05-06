//semestre.ts
//
import {ISemestre} from '../../infodata.d';
import { IntervalItem} from "./intervalitem";
import {SEMESTRE_TYPE, SEMESTRE_PREFIX} from '../../infoconstants';
//
export class Semestre extends IntervalItem implements ISemestre {
    public _anneeid: string = null;
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap != undefined) && (oMap != null)) {
            if (oMap.anneeid != undefined) {
                this.anneeid = oMap.anneeid;
            }
        } // oMap
    } // constructor
    public get anneeid(): string {
        return this._anneeid;
    }
    public set anneeid(s: string) {
        this._anneeid = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
            s.trim() : null;
    }
    public base_prefix(): string {
        return SEMESTRE_PREFIX;
    }
    public start_key(): string {
        let s = 'SEM';
        if ((s !== null) && (this.anneeid !== null)) {
            s = s + '-' + this.anneeid;
        }
        return s;
    }
    public is_storeable(): boolean {
        return super.is_storeable() && (this.anneeid !== null);
    }
    public to_map(oMap?: any): void {
        super.to_map(oMap);
        if (this.anneeid !== null) {
            oMap.anneeid = this.anneeid;
        }
    } // to_insert_map
    public type(): string {
        return SEMESTRE_TYPE;
    }
} // class Semestre