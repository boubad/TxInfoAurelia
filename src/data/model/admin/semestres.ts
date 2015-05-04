//semestres.ts
/// <reference path='../../../../typings/aurelia/aurelia.d.ts' />
//
import {inject} from 'aurelia-framework';
//
import {UserInfo} from '../userinfo';
import {IntervalViewModel} from './depintervalmodel';
import {Semestre} from '../../domain/semestre';
import {Annee} from '../../domain/annee';
import {InfoRoot} from '../../../inforoot';
//
export class Semestres extends IntervalViewModel<Semestre> {
    //
    public annees: Annee[];
    private _annee: Annee;
    //
    static inject() { return [UserInfo]; }
    constructor(userinfo: UserInfo) {
        super(userinfo, new Semestre());
        this.title = 'Semestres';
    }// constructor
    protected refresh_data(): any {
        let self = this;
        let userinfo = this.userInfo;
        return super.refresh_data().then((r) => {
            return userinfo.annees;
        }).then((aa: Annee[]) => {
            self.annees = aa;
            return userinfo.annee;
        }).then((a: Annee) => {
            self._annee = a;
            return true;
        });
    }// refresh_data
    public get annee(): Annee {
        return ((this._annee !== null) && (this._annee.id !== null)) ?
            this._annee : null;
    }
    public set annee(s: Annee) {
        let self = this;
        this._annee = ((s !== undefined) && (s !== null) && (s.id !== null)) ? s : null;
        let id = (this._annee !== null) ? this._annee.id : null;
        this.userInfo.anneeid = id;
        this.userInfo.annee.then((d: Annee) => {
            self._annee = d;
            self._item_model = self.create_item();
            self.refreshAll();
        });
    }
    public get anneeid(): string {
        return (this.annee !== null) ? this.annee.id : null;
    }
    public get minDate(): string {
        return (this.annee !== null) ? InfoRoot.date_to_string(this.annee.startDate) : null;
    }
    public get maxDate(): string {
        return (this.annee !== null) ? InfoRoot.date_to_string(this.annee.endDate) : null;
    }
    protected create_item(): Semestre {
        let p = new Semestre({
            departementid: this.departementid,
            anneeid: this.anneeid
        });
        return p;
    }
}// class Semestres

