//departement.ts
//
import {IDepartement} from '../../infodata.d';
import {SigleNameItem} from "./siglenameitem";
//
export class Departement extends SigleNameItem implements IDepartement {
    constructor(oMap?: any) {
        super(oMap);
    }
    public type(): string {
        return 'departement';
    }
    public base_prefix(): string {
        return 'DEP';
    }
}// class IDepartement
