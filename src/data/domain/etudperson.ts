// etudperson.ts
//
import {IEtudiantPerson} from '../../infodata.d';
import {Person} from './person';
import {InfoRoot} from '../../inforoot';
import {ETUDIANTPERSON_KEY} from '../../infoconstants';
//
export class EtudiantPerson extends Person implements IEtudiantPerson {
    private _dossier: string = null;
    private _sexe: string = null;
    private _date: Date = null;
    private _ville: string = null;
    private _etablissement: string = null;
    private _seriebac: string = null;
    private _optionbac: string = null;
    private _mentionbac: string = null;
    private _sup: string = null;
    //
    constructor(oMap?: any) {
        super(oMap);
        this.roles = ['etud'];
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.dossier !== undefined) {
                this.dossier = oMap.dossier;
            }
            if (oMap.sexe !== undefined) {
                this.sexe = oMap.sexe;
            }
            if (oMap.birthDate !== undefined) {
                this.birthDate = oMap.birthDate;
            }
            if (oMap.etablissement !== undefined) {
                this.etablissement = oMap.etablissement;
            }
            if (oMap.ville !== undefined) {
                this.ville = oMap.ville;
            }
            if (oMap.serieBac !== undefined) {
                this.serieBac = oMap.serieBac;
            }
            if (oMap.optionBac !== undefined) {
                this.optionBac = oMap.optionBac;
            }
            if (oMap.mentionBac != undefined) {
                this.mentionBac = oMap.mentionBac;
            }
            if (oMap.etudesSuperieures !== undefined) {
                this.etudesSuperieures = oMap.etudesSuperieures;
            }
        } // oMap
    } // constructor
    public type(): string {
        return ETUDIANTPERSON_KEY;
    }
    //
    public get birthDate(): Date {
        return this._date;
    }
    public set birthDate(s: Date) {
        this._date = InfoRoot.check_date(s);
    }
    //
    public get dossier(): string {
        return this._dossier;
    }
    public set dossier(s: string) {
        this._dossier = ((s !== undefined) &&
            (s !== null) && (s.trim().length > 0)) ? s.trim().toUpperCase() : null;
    }
    public get sexe(): string {
        return this._sexe;
    }
    public set sexe(s) {
        this._sexe = ((s !== undefined) &&
            (s !== null) && (s.trim().length > 0)) ? s.trim().toUpperCase() : null;
    }
    //
    public get isMale(): boolean {
        return (this.sexe !== null) && (this.sexe.indexOf('M') == 0);
    }
    public set isMale(b: boolean) {
        if ((b !== undefined) && (b !== null)) {
            this.sexe = (b) ? 'M' : 'F';
        }
    }
    public get isFeminin(): boolean {
        return (this.sexe !== null) && (this.sexe.indexOf('F') == 0);
    }
    public set isFeminin(b: boolean) {
        if ((b !== undefined) && (b !== null)) {
            this.sexe = (b) ? 'F' : 'M';
        }
    }
    //
    public get ville(): string {
        return this._ville;
    }
    public set ville(s: string) {
        this._ville = ((s !== undefined) &&
            (s !== null) && (s.trim().length > 0)) ? s.trim() : null;
    }
    //
    public get etablissement(): string {
        return this._etablissement;
    }
    public set etablissement(s: string) {
        this._etablissement = ((s !== undefined) &&
            (s !== null) && (s.trim().length > 0)) ? s.trim() : null;
    }
    //
    public get serieBac(): string {
        return this._seriebac;
    }
    public set serieBac(s: string) {
        this._seriebac = ((s !== undefined) &&
            (s !== null) && (s.trim().length > 0)) ? s.trim().toUpperCase() : null;
    }
    //
    public get optionBac(): string {
        return  this._optionbac;
    }
    public set optionBac(s: string) {
        this._optionbac = ((s !== undefined) &&
            (s != null) && (s.trim().length > 0)) ? s.trim().toUpperCase() : null;
    }
    public get mentionBac(): string {
        return this._mentionbac;
    }
    public set mentionBac(s: string) {
        this._mentionbac = ((s !== undefined) &&
            (s !== null) && (s.trim().length > 0)) ? s.trim().toUpperCase() : null;
    }
    //
    public get etudesSuperieures(): string {
        return this._sup;
    }
    public set etudesSuperieures(s: string) {
        this._sup = ((s !== undefined) &&
            (s !== null) && (s.trim().length > 0)) ? s.trim().toUpperCase() : null;
    }
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if (this.dossier !== null) {
            oMap.dossier = this.dossier;
        }
        if (oMap.sexe !== null) {
            oMap.sexe = this.sexe;
        }
        if (oMap.birthDate !== null) {
            oMap.birthDate = this.birthDate;
        }
        if (oMap.ville !== null) {
            oMap.ville = this.ville;
        }
        if (oMap.etablissement !== null) {
            oMap.etablissement = this.etablissement;
        }
        if (this.serieBac !== null) {
            oMap.serieBac = this.serieBac;
        }
        if (this.optionBac !== null) {
            oMap.optionBac = this.optionBac;
        }
        if (this.mentionBac !== null) {
            oMap.mentionBac = this.mentionBac;
        }
        if (this.etudesSuperieures !== null) {
            oMap.etudesSuperieures = this.etudesSuperieures;
        }
    } // to_insert_map
} // class EtudiantPerson
