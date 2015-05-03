//departement.ts
//
import {IDepartement} from '../../infodata.d';
import {SigleNameItem} from "./siglenameitem";
import {DEPARTEMENT_TYPE, DEPARTEMENT_PREFIX} from '../../infoconstants';
//
export class Departement extends SigleNameItem implements IDepartement {
    constructor(oMap?: any) {
        super(oMap);
    }
    public type(): string {
        return DEPARTEMENT_TYPE;
    }
    public base_prefix(): string {
        return DEPARTEMENT_PREFIX;
    }
}// class IDepartement
