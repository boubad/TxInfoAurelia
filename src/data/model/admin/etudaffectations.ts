//etudaffviewmodel.ts
/// <reference path='../../../../typings/aurelia/aurelia-dependency-injection.d.ts' />
//
import {inject} from 'aurelia-dependency-injection';
//
import {UserInfo} from '../userinfo';
import {AffectationViewModel} from './affectationviewmodel';
import {EtudAffectation} from '../../domain/etudaffectation';
import {Etudiant} from '../../domain/etudiant';
//
export class Etudaffectations extends AffectationViewModel<EtudAffectation, Etudiant> {
    //
    static inject() { return [UserInfo]; }
    //
    constructor(userinfo: UserInfo) {
        super(userinfo);
    }// constructor
    //
    protected create_person(): Etudiant {
        let p = new Etudiant({ departementid: this.departementid });
        return p;
    }
    protected create_item(): EtudAffectation {
        let p = new EtudAffectation({
            departementid: this.departementid,
            anneeid: this.anneeid,
            semestreid: this.semestreid,
            groupeid: this.groupeid,
            startDate: this._start,
            endDate: this._end
        });
        return p;
    }
    protected retrieve_add_items(): EtudAffectation[] {
        let oRet: EtudAffectation[] = [];
        if ((this.currentPersons !== null) && (this.currentPersons.length > 0)) {
            for (let p of this.currentPersons) {
                let a = this.create_item();
                a.personid = p.personid;
                a.firstname = p.firstname;
                a.lastname = p.lastname;
                a.avatarid = p.avatarid;
                a.etudiantid = p.id;
                oRet.push(a);
            }// p
        }// persons
        return oRet;
    }// retrieve_add_items
}// class EtudAffViewModel
