//depperson.ts
//
import {IPerson, IDepartementPerson} from '../../infodata.d';
import {DepartementChildItem} from './depchild';
import {InfoRoot} from '../../inforoot';
//
export class DepartementPerson extends DepartementChildItem
    implements IDepartementPerson {
    private _personid: string = null;
    private _first: string = null;
    private _last: string = null;
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.personid !== undefined) {
                this.personid = oMap.personid;
            }
            if (oMap.firstname !== undefined) {
                this.firstname = oMap.firstname;
            }
            if (oMap.lastname !== undefined) {
                this.lastname = oMap.lastname;
            }
        } // oMap
    } // constructor
    public get personid(): string {
        return this._personid;
    }
    public set personid(s: string) {
        this._personid = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
            s.trim() : null;
    }
    //
    public get lastname(): string {
        return this._last;
    }
    public set lastname(s: string) {
        if ((s !== undefined) && (s !== null) && (s.trim().length > 0)) {
            this._last = s.trim().toUpperCase();
        } else {
            this._last = null;
        }
    }
    //
    public get firstname(): string {
        return this._first;
    }
    public set firstname(s: string) {
        if ((s !== undefined) && (s !== null) && (s.trim().length > 0)) {
            var ss = s.trim();
            var n = ss.length;
            if (n > 1) {
                this._first =
                ss.substr(0, 1).toUpperCase() + ss.substr(1, n - 1).toLowerCase();
            } else {
                this._first = ss.toUpperCase();
            }
        } else {
            this._first = null;
        }
    }
    //
    public get fullname(): string {
        var s = null;
        if (this.lastname !== null) {
            s = this.lastname;
        }
        if (this.firstname !== null){
            if (s !== null){
                s = s + ' ' + this.firstname;
            } else {
                s = this.firstname;
            }
        }
        return s;
    } // fullname
    public avatardocid(): string {
        return this.personid;
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
    public update_person(pPers: IPerson): void {
        if ((pPers !== undefined) && (pPers !== null)) {
            this.personid = pPers.id;
            this.firstname = pPers.firstname;
            this.lastname = pPers.lastname;
            this.avatarid = pPers.avatarid;
            if (this.departementid !== null) {
                let cont: string[] = pPers.departementids;
                if (cont === null) {
                    cont = [];
                }
                InfoRoot.add_id_to_array(cont, this.departementid);
                pPers.departementids = cont;
            }
        }// pPers
    }// update_person
    public is_storeable(): boolean {
        return super.is_storeable() && (this.personid !== null) &&
            (this.lastname !== null) && (this.firstname !== null);
    }
    public toString(): string {
        return this.fullname;
    }
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if (this.personid !== null) {
            oMap.personid = this.personid;
        }
        if (this.lastname !== null) {
            oMap.lastname = this.lastname;
        }
        if (this.firstname !== null) {
            oMap.firstname = this.firstname;
        }
    } // toInsertMap
    public sort_func(p1: IDepartementPerson, p2: IDepartementPerson): number {
        let s1 = p1.fullname;
        let s2 = p2.fullname;
        if ((s1 !== null) && (s2 !== null)) {
            return s1.localeCompare(s2);
        } else if ((s1 === null) && (s2 !== null)) {
            return 1;
        } else if ((s1 !== null) && (s2 === null)) {
            return -1;
        } else {
            return 0;
        }
    } // sort_func
}