//profaffviewmodel.ts
/// <reference path='../../../../typings/aurelia/aurelia-dependency-injection.d.ts' />
//
import {inject} from 'aurelia-dependency-injection';
//
import {UserInfo} from '../userinfo';
//import {IAffectation, IDepartementPerson} from '../../../infodata.d';
import {AffectationViewModel} from './affectationviewmodel';
import {ProfAffectation} from '../../domain/profaffectation';
import {Enseignant} from '../../domain/enseignant';
//
export class Profaffectations extends AffectationViewModel<ProfAffectation, Enseignant> {
    //
    private _genre: string = null;
    //
    static inject() { return [UserInfo]; }
    //
    constructor(userinfo: UserInfo) {
        super(userinfo);
    }// constructor
    //
    protected create_person(): Enseignant {
        let p = new Enseignant({ departementid: this.departementid });
        return p;
    }
    protected is_storeable(): boolean {
        return super.is_storeable() && (this.uniteid !== null)
            && (this.matiereid !== null);
    }
    protected create_item(): ProfAffectation {
        let p = new ProfAffectation({
            departementid: this.departementid,
            anneeid: this.anneeid,
            semestreid: this.semestreid,
            groupeid: this.groupeid,
            uniteid: this.uniteid,
            matiereid: this.matiereid,
            genre: this.genre,
            startDate: this._start,
            endDate: this._end
        });
        return p;
    }
    protected retrieve_add_items(): ProfAffectation[] {
        let oRet: ProfAffectation[] = [];
        if ((this.currentPersons !== null) && (this.currentPersons.length > 0)) {
            for (let p of this.currentPersons) {
                let a = this.create_item();
                a.personid = p.personid;
                a.firstname = p.firstname;
                a.lastname = p.lastname;
                a.avatarid = p.avatarid;
                a.enseignantid = p.id;
                oRet.push(a);
            }// p
        }// persons
        return oRet;
    }// retrieve_add_items
    protected post_change_matiere(): Promise<any> {
        this.modelItem.matiereid = this.matiereid;
        this.currentAffectations = [];
        return this.refreshAll();
    }
    protected is_refresh(): boolean {
        return super.is_refresh() && (this.modelItem.matiereid !== null) &&
            (this.modelItem.genre !== null);
    }
    //
    public get genre(): string {
        return this._genre;
    }
    public set genre(s: string) {
        this._genre = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
            s.trim().toUpperCase() : null;
        this.modelItem.genre = this.genre;
        this.refreshAll();
    }
    //
     public refreshAll(): Promise<any> {
         this.prepare_refresh();
        if ((this.semestreid === null) || (this.groupeid === null) ||
            (this.matiereid === null) || (this.genre === null)){
            return Promise.resolve(false);
        }
        return super.refreshAll();
    }// refreshAll
}// class AffectationViewModel
