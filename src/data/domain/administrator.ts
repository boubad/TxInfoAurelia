//administrator.ts
//
import {IPerson, IAdministrator} from '../../infodata.d';
import {DepartementPerson} from './depperson';
import {InfoRoot} from '../../inforoot';
import {ADMINISTRATOR_TYPE, ADMINISTRATOR_PREFIX, ROLE_ADMIN} from '../../infoconstants';
//
export class Administrator extends DepartementPerson implements IAdministrator {
    //
    constructor(oMap?: any) {
        super(oMap);
    }// constructor
    public type(): string {
        return ADMINISTRATOR_TYPE;
    }
    public base_prefix(): string {
        return ADMINISTRATOR_PREFIX;
    }
}// class Enseignant
