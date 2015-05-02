//enseignant.ts
//
import {IPerson, IEnseignant} from '../../infodata.d';
import {DepartementPerson} from './depperson';
import {InfoRoot} from '../../inforoot';
//
export class Enseignant extends DepartementPerson implements IEnseignant {
    //
    constructor(oMap?: any) {
        super(oMap);
    }// constructor
    public type(): string {
        return 'prof';
    }
    public base_prefix(): string {
        return 'PRF';
    }
    public update_person(pPers: IPerson): void {
        if ((pPers !== undefined) && (pPers !== null)) {
            super.update_person(pPers);
            if (!pPers.is_prof) {
                let x: string[] = pPers.roles;
                if (x === null) {
                    x = [];
                }
                x.push('prof');
                pPers.roles = x;
            }
            let cont: string[] = pPers.enseignantids;
            if (cont === null) {
                cont = [];
            }
            InfoRoot.add_id_to_array(cont, this.id);
            pPers.enseignantids = cont;
        }// pPers
    }// update_person
}// class Enseignant
