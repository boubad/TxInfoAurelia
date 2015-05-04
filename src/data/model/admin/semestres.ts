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
        this._annee = null;
    }// constructor
    protected refresh_data(): any {
        let self = this;
        let userinfo = this.userInfo;
        return super.refresh_data().then((r) => {
            return userinfo.annees;
        }).then((aa: Annee[]) => {
            self.annees = aa;
            return true;
        });
    }// refresh_data
    public get annee(): Annee {
        return ((this._annee !== undefined) && (this._annee !== null) 
          && (this._annee.id !== null)) ?
            this._annee : null;
    }
    public set annee(s: Annee) {
        let self = this;
        this._annee = ((s !== undefined) && (s !== null) && (s.id !== null)) ? s : null;
        let id = (this._annee !== null) ? this._annee.id : null;
        this.userInfo.anneeid = id;
        this._item_model.anneeid = id;
        this.refreshAll();
    }
    public get anneeid(): string {
        return (this._annee !== null) ? this._annee.id : null;
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
    protected is_storeable():boolean {
      if (!super.is_storeable()){
        return false;
      }
      if (this.annee === null){
        return false;
      }
      let anneeid = this.annee.id;
      if (anneeid === null){
        return false;
      }
      let d01 = this.annee.startDate;
      let d02 = this.annee.endDate;
      if ((d01 === null) || (d02 === null)){
        return false;
      }
      let t01 = Date.parse(d01.toString());
      let t02 = Date.parse(d02.toString());
      if (isNaN(t01) || isNaN(t02)){
        return false;
      }
      let d1 = InfoRoot.string_to_date(this.startDate);
      let d2 = InfoRoot.string_to_date(this.endDate);
      if ((d1 === null) || (d2 === null)){
        return false;
      }
      let t1 = Date.parse(d1.toString());
      let t2 = Date.parse(d2.toString());
      if (isNaN(t1) || isNaN(t2)){
        return false;
      }
      return (t1 <= t2) && (t1 >= t01) && (t1 <= t02) &&
       (t2 >= t01) && (t2 <= t02);
    }
    protected retrieve_item(): Semestre {
      let x = super.retrieve_item();
      x.anneeid = this.anneeid;
      return x;
    }
}// class Semestres
