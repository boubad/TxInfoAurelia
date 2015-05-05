//annees.ts
/// <reference path='../../../../typings/aurelia/aurelia.d.ts' />
//
import {inject} from 'aurelia-framework';
//
import {UserInfo} from '../userinfo';
import {IntervalViewModel} from './depintervalmodel';
import {Annee} from '../../domain/annee';
//
export class Annees extends IntervalViewModel<Annee> {
    static inject() { return [UserInfo]; }
    constructor(userinfo: UserInfo) {
        super(userinfo);
        this.title = 'Années';
    }// constructor
    protected create_item(): Annee {
        let p = new Annee({ departementid: this.departementid });
        return p;
    }
    protected post_change_departement(): Promise<any> {
        let self = this;
        return super.post_change_departement().then((r) => {
            self.modelItem.departementid = self.departementid;
            self.refreshAll();
        });
    }// post_change_departement
}// class Annees

