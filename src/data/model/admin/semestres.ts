//semestres.ts
/// <reference path='../../../../typings/aurelia/aurelia-dependency-injection.d.ts' />
//
import {inject} from 'aurelia-dependency-injection';
import {UserInfo} from '../userinfo';
import {IntervalViewModel} from './depintervalmodel';
import {Semestre} from '../../domain/semestre';
import {Annee} from '../../domain/annee';
import {InfoRoot} from '../../../inforoot';
//
export class Semestres extends IntervalViewModel<Semestre> {
    //
    static inject() { return [UserInfo]; }
    constructor(userinfo: UserInfo) {
        super(userinfo);
        this.title = 'Semestres';
    }// constructor
    public get minAnneeDate(): string {
        return (this.annee !== null) ? InfoRoot.date_to_string(this.annee.startDate) : null;
    }
    public get maxAnneeDate(): string {
        return (this.annee !== null) ? InfoRoot.date_to_string(this.annee.endDate) : null;
    }
    protected create_item(): Semestre {
        let p = new Semestre({
            departementid: this.departementid,
            anneeid: this.anneeid
        });
        return p;
    }
    protected is_refresh(): boolean {
        return (this.modelItem.anneeid !== null);
    }
     protected post_change_annee(): Promise<any> {
        let self = this;
        return super.post_change_annee().then((r) => {
            self.modelItem.departementid = this.departementid;
            self.modelItem.anneeid = self.anneeid;
            self.refreshAll();
        });
    }// post_change_departement
}// class Semestres
