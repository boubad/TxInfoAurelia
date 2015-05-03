//unite.ts
//
import {IUnite} from '../../infodata.d';
import {DepSigleNameItem} from './depsiglename';
import {UNITE_TYPE, UNITE_PREFIX} from '../../infoconstants';
//
export class Unite extends DepSigleNameItem implements IUnite {
    constructor(oMap?: any) {
        super(oMap);
    } // constructor
    public type(): string {
        return UNITE_TYPE;
    }
    public base_prefix(): string {
        return UNITE_PREFIX;
    }
} // class Unite