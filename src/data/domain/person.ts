//person.ts
//
import {IPerson} from '../../infodata.d';
import {BaseItem} from './baseitem';
import {MyCrypto} from './mycrypto';
import {InfoRoot} from '../../inforoot';
//
//
var cc = new MyCrypto();
//
export class Person extends BaseItem implements IPerson {
    private _user: string;
    private _pass: string;
    private _first: string;
    private _last: string;
    private _email: string;
    private _phone: string;
    private _roles: string[];
    private _deps: string[];
    private _annees: string[];
    private _semestres: string[];
    private _matieres: string[];
    private _unites: string[];
    private _groupes: string[];
    public _enseignants: string[];
    public _etudiants: string[];
    public _affectations: string[];
    public _events: string[];
    //
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if ((oMap.enseignantids !== undefined) && (oMap.enseignantids !== null)) {
                this.enseignantids = oMap.enseignantids;
            }
            if ((oMap.etudiantids !== undefined) && (oMap.etudiantids !== null)) {
                this.etudiantids = oMap.etudiantids;
            }
            if ((oMap.affectationids !== undefined) && (oMap.affectationids !== null)) {
                this.affectationids = oMap.affectationids;
            }
            if ((oMap.eventids !== undefined) && (oMap.eventids !== null)) {
                this.eventids = oMap.eventids;
            }
            if (oMap.username !== undefined) {
                this.username = oMap.username;
            }
            if (oMap.password !== undefined) {
                this.password = oMap.password;
            }
            if (oMap.firstname !== undefined) {
                this.firstname = oMap.firstname;
            }
            if (oMap.lastname !== undefined) {
                this.lastname = oMap.lastname;
            }
            if (oMap.email !== undefined) {
                this.email = oMap.email;
            }
            if (oMap.phone !== undefined) {
                this.phone = oMap.phone;
            }
            if (oMap.departementids !== undefined) {
                this.departementids = oMap.departementids;
            } //
            if (oMap.roles !== undefined) {
                this.roles = oMap.roles;
            } //
            if (oMap.anneeids !== undefined) {
                this.anneeids = oMap.anneeids;
            } //
            if (oMap.semestreids !== undefined) {
                this.semestreids = oMap.semestreids;
            } //
            if (oMap.uniteids !== undefined) {
                this.uniteids = oMap.uniteids;
            } //
            if (oMap.matiereids !== undefined) {
                this.matiereids = oMap.matiereids;
            } //
            if (oMap.groupeids !== undefined) {
                this.groupeids = oMap.groupeids;
            } //
        } // oMap
    } // constructor
    //
    public base_prefix(): string {
        return 'PER';
    }
    public create_id(): string {
        let s = this.start_key();
        if ((s !== null) && (this.username !== null)) {
            s = s + '-' + this.username;
        }
        return s;
    }// create_id
    //
    public get enseignantids(): string[] {
        return (this._enseignants !== undefined) ? this._enseignants : null;
    }
    public set enseigantids(s: string[]) {
        this._enseignants = ((s !== undefined) && (s !== null) && (s.length > 0)) ? s : null;
    }
    public get etudiantids(): string[] {
        return (this._etudiants !== undefined) ? this._etudiants : null;
    }
    public set etudiantids(s: string[]) {
        this._etudiants = ((s !== undefined) && (s !== null) && (s.length > 0)) ? s : null;
    }
    public get affectationids(): string[] {
        return (this._affectations !== undefined) ? this._affectations : null;
    }
    public set affectationids(s: string[]) {
        this._affectations = ((s !== undefined) && (s !== null) && (s.length > 0)) ? s : null;
    }
    public get eventids(): string[] {
        return (this._events !== undefined) ? this._events : null;
    }
    public set eventids(s: string[]) {
        this._events = ((s !== undefined) && (s !== null) && (s.length > 0)) ? s : null;
    }
    //
    public get departementids(): string[] {
        return (this._deps !== undefined) ? this._deps : null;
    }
    public set departementids(s: string[]) {
        this._deps = ((s !== undefined) && (s !== null) && (s.length !== undefined) &&
            (s.length > 0)) ? s : null;
    }
    //
    public get groupeids(): string[] {
        return (this._groupes !== undefined) ? this._groupes : null;
    }
    public set groupeids(s: string[]) {
        this._groupes = ((s !== undefined) && (s !== null) && (s.length !== undefined) &&
            (s.length > 0)) ? s : null;
    }
    //
    public get anneeids(): string[] {
        return (this._annees !== undefined) ? this._annees : null;
    }
    public set anneeids(s: string[]) {
        this._annees = ((s !== undefined) && (s !== null) && (s.length !== undefined) &&
            (s.length > 0)) ? s : null;
    }
    //
    public get semestreids(): string[] {
        return (this._semestres !== undefined) ? this._semestres : null;
    }
    public set semestreids(s: string[]) {
        this._semestres = ((s !== undefined) && (s !== null) && (s.length !== undefined) &&
            (s.length > 0)) ? s : null;
    }
    //
    public get uniteids(): string[] {
        return (this._unites !== undefined) ? this._unites : null;
    }
    public set uniteids(s: string[]) {
        this._unites = ((s !== undefined) && (s !== null) && (s.length !== undefined) &&
            (s.length > 0)) ? s : null;
    }
    //
    public get matiereids(): string[] {
        return (this._matieres !== undefined) ? this._matieres : null;
    }
    public set matiereids(s: string[]) {
        this._matieres = ((s !== undefined) && (s !== null) && (s.length !== undefined) &&
            (s.length > 0)) ? s : null;
    }
    //
    public get roles(): string[] {
        return (this._roles !== undefined) ? this._roles : null;
    }
    public set roles(s: string[]) {
        this._roles = ((s !== undefined) && (s !== null) && (s.length !== undefined) &&
            (s.length > 0)) ? s : null;
    }
    //
    public reset_password(): void {
        if (this.username !== null) {
            this.password = cc.md5(this.username);
        } else {
            this.password = null;
        }
    }
    public change_password(ct: string): void {
        if ((ct === undefined) || (ct === null)) {
            this.password = null;
        } else {
            var v = null;
            var x = ct.trim();
            if (x.length > 0) {
                v = cc.md5(ct);
            }
            this.password = v;
        }
    }
    public check_password(ct: string): boolean {
        if ((ct === undefined) || (ct === null)) {
            if (this.password === null) {
                return true;
            } else {
                return false;
            }
        }
        var v = cc.md5(ct);
        return (this.password == v);
    } // check_password
    //
    public type(): string {
        return "person";
    }
    public get username(): string {
        return (this._user !== undefined) ? this._user : null;
    }
    public set username(s: string) {
        if ((s !== undefined) && (s !== null) && (s.trim().length > 0)) {
            this._user = InfoRoot.check_name(s, true);
        } else {
            this._user = null;
        }
    }
    //
    public get lastname(): string {
        return (this._last !== undefined) ? this._last : null;
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
        return (this._first !== undefined) ? this._first : null;
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
        var s = '';
        if (this.lastname !== null) {
            s = this.lastname;
        }
        if (this.firstname != null) {
            s = s + ' ' + this.firstname;
        }
        s = s.trim();
        return (s.length > 0) ? s : null;
    } // fullname
    //
    public get password(): string {
        return (this._pass !== undefined) ? this._pass : null;
    }
    public set password(s: string) {
        if (s !== undefined) {
            this._pass = s;
        } else {
            this._pass = null;
        }
    }

    //
    public get email(): string {
        return (this._email !== undefined) ? this._email : null;
    }
    public set email(s: string) {
        if ((s !== undefined) && (s !== null) && (s.trim().length > 0)) {
            this._email = s.trim();
        } else {
            this._email = null;
        }
    }

    public get phone(): string {
        return (this._phone !== undefined) ? this._phone : null;
    }
    public set phone(s: string) {
        if ((s !== undefined) && (s !== null) && (s.trim().length > 0)) {
            this._phone = s.trim();
        } else {
            this._phone = null;
        }
    }
    //
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if (this.username !== null) {
            oMap.username = this.username;
        }
        if (this.password !== null) {
            oMap.password = this.password;
        }
        if (this.firstname !== null) {
            oMap.firstname = this.firstname;
        }
        if (this.lastname !== null) {
            oMap.lastname = this.lastname;
        }
        if (this.email !== null) {
            oMap.email = this.email;
        }
        if (this.phone !== null) {
            oMap.phone = this.phone;
        }
        if (this.roles !== null) {
            oMap.roles = this.roles;
        }
        if (this.departementids !== null) {
            oMap.departementids = this.departementids;
        }
        if (this.uniteids !== null) {
            oMap.uniteids = this.uniteids;
        }
        if (this.matiereids !== null) {
            oMap.matiereids = this.matiereids;
        }
        if (this.anneeids !== null) {
            oMap.anneeids = this.anneeids;
        }
        if (this.semestreids !== null) {
            oMap.semestreids = this.semestreids;
        }
        if (this.groupeids !== null) {
            oMap.groupeids = this.groupeids;
        }
        if (this.enseignantids !== null) {
            oMap.enseignantids = this.enseignantids;
        }
        if (this.etudiantids !== null) {
            oMap.etudiantids = this.etudiantids;
        }
        if (this.affectationids !== null) {
            oMap.affectationids = this.affectationids;
        }
        if (this.eventids !== null) {
            oMap.eventids = this.eventids;
        }
    } // to_insert_map
    public toString(): string {
        return this.fullname;
    }
    public is_storeable(): boolean {
        return super.is_storeable() &&
            (this.username !== null) && (this.firstname !== null) &&
            (this.lastname !== null) && (this.roles !== null) &&
            (this.roles.length > 0);
    }
    public has_role(r: string): boolean {
        let bRet = false;
        if ((r !== undefined) && (r !== null) && (this.roles !== undefined) &&
            (this.roles !== null) && (this.roles.length > 0)) {
            let ss = r.trim().toLowerCase();
            for (let r of this.roles) {
                let x = r.trim().toLowerCase();
                if (ss == x) {
                    bRet = true;
                    break;
                }
            }
        }
        return bRet;
    } // hasrole_
    public get is_admin(): boolean {
        return (this.has_role('super') || this.has_role('admin'));
    }
    public get is_super(): boolean {
        return this.has_role('super');
    }
    public get is_prof(): boolean {
        return this.has_role('prof') && (this.enseigantids !== null) &&
            (this.enseignantids.length > 0);
    }
    public get is_etud(): boolean {
        return this.has_role('etud') && (this.etudiantids !== null) &&
            (this.etudiantids.length > 0);
    }
    public sort_func(p1: IPerson, p2: IPerson): number {
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
} // class Person