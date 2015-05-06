//etudaffectation.ts
//
import {IPerson, IEtudAffectation} from '../../infodata.d';
import {Affectation} from './affectation';
import {InfoRoot} from '../../inforoot';
import {ETUDAFFECTATION_TYPE, ETUDAFFECTATION_PREFIX} from '../../infoconstants';
//
export class EtudAffectation extends Affectation
    implements IEtudAffectation {
    private _etudiantid: string = null;
    //
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.etudiantid !== undefined) {
                this.etudiantid = oMap.etudiantid;
            }
        } // oMap
    } // constructor
    public get etudiantid(): string {
        return this._etudiantid;
    }
    public set etudiantid(s: string) {
        this._etudiantid = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
            s.trim() : null;
    }
    public create_id(): string {
        let s = this.start_key();
        if ((s !== null) && (this.lastname !== null)) {
            s = s + '-' + this.lastname.trim().toUpperCase();
        }
        if ((s !== null) && (this.firstname !== null)) {
            s = s + '-' + this.firstname.trim().toUpperCase();
        }
        if (s !== null) {
            s = s + '-' + InfoRoot.create_random_id();
        }
        return s;
    } // create_id
    public is_storeable(): boolean {
        return super.is_storeable() && (this.etudiantid !== null);
    }
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if (this.etudiantid !== null) {
            oMap.etudiantid = this.etudiantid;
        }
    } // toInsertMap
    public base_prefix(): string {
        return ETUDAFFECTATION_PREFIX;
    }
    public type(): string {
        return ETUDAFFECTATION_TYPE;
    }
}