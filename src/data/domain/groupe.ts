//groupe.ts
//
import {IGroupe} from '../../infodata.d';
import {DepSigleNameItem} from './depsiglename';
//
export class Groupe extends DepSigleNameItem implements IGroupe {
    constructor(oMap?: any) {
        super(oMap);
    } // constructor
    public type(): string {
        return 'groupe';
    }
    public base_prefix(): string {
        return 'GRP';
    }
} // class Groupe