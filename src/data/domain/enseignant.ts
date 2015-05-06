//enseignant.ts
//
import {IPerson, IEnseignant} from '../../infodata.d';
import {DepartementPerson} from './depperson';
import {InfoRoot} from '../../inforoot';
import {ENSEIGNANT_TYPE, ENSEIGNANT_PREFIX, ROLE_PROF} from '../../infoconstants';
//
export class Enseignant extends DepartementPerson implements IEnseignant {
    //
    constructor(oMap?: any) {
        super(oMap);
    }// constructor
    public type(): string {
        return ENSEIGNANT_TYPE;
    }
    public base_prefix(): string {
        return ENSEIGNANT_PREFIX;
    }
    public update_person(pPers: IPerson): void {
        if ((pPers !== undefined) && (pPers !== null)) {
            super.update_person(pPers);
            let cont: string[] = pPers.enseignantids;
            if (cont === null) {
                cont = [];
            }
            InfoRoot.add_id_to_array(cont, this.id);
            pPers.enseignantids = cont;
        }// pPers
    }// update_person
}// class Enseignant
