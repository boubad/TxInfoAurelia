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
} // class Annee
