//unite.ts
//
import {IUnite} from '../../infodata.d';
import {DepSigleNameItem} from './depsiglename';
//
export class Unite extends DepSigleNameItem implements IUnite {
    constructor(oMap?: any) {
        super(oMap);
    } // constructor
    public type(): string {
        return 'unite';
    }
    public base_prefix(): string {
        return 'UNT';
    }
} // class Unite