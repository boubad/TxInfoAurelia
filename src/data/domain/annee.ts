//annee.ts
//
import {IAnnee} from '../../infodata.d';
import { IntervalItem} from "./intervalitem";
import {ANNEE_TYPE, ANNEE_PREFIX} from '../../infoconstants';
//
export class Annee extends IntervalItem implements IAnnee {
    constructor(oMap?: any) {
        super(oMap);
    } // constructor
    public type(): string {
        return ANNEE_TYPE;
    }
    public base_prefix(): string {
        return ANNEE_PREFIX;
    }
    public toMap(oMap: any): void {
        super.to_map(oMap);
        oMap.type = ANNEE_TYPE;
    }// toMap
} // class Annee
