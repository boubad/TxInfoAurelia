//etudiant.ts
//
import {IPerson, IEtudiant} from '../../infodata.d';
import {DepartementPerson} from './depperson';
import {InfoRoot} from '../../inforoot';
import {ETUDIANT_TYPE, ETUDIANT_PREFIX, ROLE_ETUD} from '../../infoconstants';
//
export class Etudiant extends DepartementPerson implements IEtudiant {
    //
    constructor(oMap?: any) {
        super(oMap);
    }// constructor
    public type(): string {
        return  ETUDIANT_TYPE;
    }
    public base_prefix(): string {
        return ETUDIANT_PREFIX;
    }
    public update_person(pPers: IPerson): void {
        if ((pPers !== undefined) && (pPers !== null)) {
            super.update_person(pPers);
            let cont: string[] = pPers.etudiantids;
            if (cont === null) {
                cont = [];
            }
            InfoRoot.add_id_to_array(cont, this.id);
            pPers.etudiantids = cont;
        }// pPers
    }// update_person
}// class Etudiant
