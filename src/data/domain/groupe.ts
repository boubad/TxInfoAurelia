//groupe.ts
//
import {IGroupe} from '../../infodata.d';
import {DepSigleNameItem} from './depsiglename';
import {GROUPE_TYPE, GROUPE_PREFIX} from '../../infoconstants';
//
export class Groupe extends DepSigleNameItem implements IGroupe {
    constructor(oMap?: any) {
        super(oMap);
    } // constructor
    public type(): string {
        return GROUPE_TYPE;
    }
    public base_prefix(): string {
        return GROUPE_PREFIX;
    }
} // class Groupe