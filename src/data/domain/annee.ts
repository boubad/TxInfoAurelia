//annee.ts
//
import {IAnnee} from '../../infodata.d';
import { IntervalItem} from "./intervalitem";
//
export class Annee extends IntervalItem implements IAnnee {
    constructor(oMap?: any) {
        super(oMap);
    } // constructor

    public type(): string {
        return 'annee';
    }
    public base_prefix(): string {
        return 'ANN';
    }
} // class Annee