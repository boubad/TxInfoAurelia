//departementperson.ts
//
import {IProfAffectation, IPerson} from '../../infodata.d';;
import {Affectation} from './affectation';
import {InfoRoot} from '../../inforoot';
import {PROFAFFECTATION_TYPE, PROFAFFECTATION_PREFIX} from '../../infoconstants';
//
export class ProfAffectation extends Affectation
    implements IProfAffectation {
    private _enseignantid: string = null;
    private _uniteid: string = null;
    private _matiereid: string = null;
    //
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.enseignantid !== undefined) {
                this.enseignantid = oMap.enseignantid;
            }
            if (oMap.uniteid !== undefined) {
                this.uniteid = oMap.uniteid;
            }
            if (oMap.matiereid !== undefined) {
                this.matiereid = oMap.matiereid;
            }
        } // oMap
    } // constructor
    public get enseignantid(): string {
        return this._enseignantid;
    }
    public set enseignantid(s: string) {
        this._enseignantid = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
            s.trim() : null;
    }
    public get uniteid(): string {
        return this._uniteid;
    }
    public set uniteid(s: string) {
        this._uniteid = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
            s.trim() : null;
    }
    public get matiereid(): string {
        return this._matiereid;
    }
    public set matiereid(s: string) {
        this._matiereid = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
            s.trim() : null;
    }
    public update_person(pPers: IPerson): void {
        if ((pPers !== undefined) && (pPers !== null)) {
            super.update_person(pPers);
            if (this.uniteid !== null) {
                let cont: string[] = pPers.uniteids;
                if (cont === null) {
                    cont = [];
                }
                InfoRoot.add_id_to_array(cont, this.uniteid);
                pPers.uniteids = cont;
            }
            if (this.matiereid !== null) {
                let cont: string[] = pPers.matiereids;
                if (cont === null) {
                    cont = [];
                }
                InfoRoot.add_id_to_array(cont, this.matiereid);
                pPers.matiereids = cont;
            }
        }// pPers
    }// update_person
    public start_key(): string {
        let s = this.base_prefix();
        if ((s !== null) && (this.semestreid !== null)) {
            s = s + '-' + this.semestreid;
        }
        if ((s !== null) && (this.matiereid !== null)) {
            s = s + '-' + this.matiereid;
        }
        if ((s !== null) && (this.groupeid !== null)) {
            s = s + '-' + this.groupeid;
        }
        if ((s !== null) && (this.genre !== null)) {
            s = s + '-' + this.genre.trim().toUpperCase();
        }
        return s;
    }
    public create_id(): string {
        let s = this.start_key();
        if ((s !== null) && (this.personid !== null)) {
            s = s + '-' + this.personid;
        }
        if ((s !== null) && (this.startDate !== null)) {
            let ss = InfoRoot.create_date_random_id(this.startDate);
            if (ss !== null) {
                s = s + '-' + ss;
            }
        }
        return s;
    } // create_id
    public is_storeable(): boolean {
        return super.is_storeable() && (this.enseignantid !== null) &&
            (this.uniteid !== null) && (this.matiereid !== null) &&
            (this.genre !== null);
    }
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if (this.enseignantid !== null) {
            oMap.enseignantid = this.enseignantid;
        }
        if (this.uniteid !== null) {
            oMap.uniteid = this.uniteid;
        }
        if (this.matiereid !== null) {
            oMap.matiereid = this.matiereid;
        }
    } // toInsertMap
    public base_prefix(): string {
        return PROFAFFECTATION_PREFIX;
    }
    public type(): string {
        return PROFAFFECTATION_TYPE;
    }
}