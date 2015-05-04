//matieres.ts
/// <reference path='../../../../typings/aurelia/aurelia.d.ts' />
//
import {inject} from 'aurelia-framework';
//
import {UserInfo} from '../userinfo';
import {DepPagedViewModel} from './deppagedviewmodel';
import {Matiere} from '../../domain/matiere';
import {Unite} from '../../domain/unite';
import {InfoRoot} from '../../../inforoot';
//
export class Matieres extends DepPagedViewModel<Matiere> {
    //
    public unites: Unite[];
    private _unite: Unite;
    //
    private _genre: string;
    private _mat_module: string;
    private _coef: number;
    private _ecs: number;
    //
    static inject() { return [UserInfo]; }
    constructor(userinfo: UserInfo) {
        super(userinfo, new Matiere());
        this.title = 'Matières';
        this._unite = null;
        this._genre = null;
        this._mat_module = null;
        this._coef = null;
        this._ecs = null;
    }// constructor
    protected refresh_data(): any {
        let self = this;
        let userinfo = this.userInfo;
        return super.refresh_data().then((r) => {
            return userinfo.unites;
        }).then((aa: Unite[]) => {
            self.unites = aa;
            return true;
        });
    }// refresh_data
    public get unite(): Unite {
        return ((this._unite !== null) && (this._unite.id !== null)) ?
            this._unite : null;
    }
    public set unite(s: Unite) {
        let self = this;
        this._unite = ((s !== undefined) && (s !== null) && (s.id !== null)) ? s : null;
        let id = (this._unite !== null) ? this._unite.id : null;
        this.userInfo.uniteid = id;
        this._item_model.uniteid = id;
        this.refreshAll();
    }
    public get uniteid(): string {
        return (this.unite !== null) ? this.unite.id : null;
    }
    protected create_item(): Matiere {
        let p = new Matiere({
            departementid: this.departementid,
            uniteid: this.uniteid
        });
        return p;
    }
    public get genre(): string {
        return this._genre;
    }
    public set genre(s: string) {
        this._genre = s;
    }
    public get mat_module(): string {
        return this._mat_module;
    }
    public set mat_module(s: string) {
        this._mat_module = s;
    }
    public get coefficient(): string {
        return InfoRoot.number_to_string(this._coef);
    }
    public set coefficient(s: string) {
        let d = InfoRoot.string_to_number(s);
        this._coef = ((d !== null) && (d > 0)) ? d : null;
    }
    public get ecs(): string {
        return InfoRoot.number_to_string(this._ecs);
    }
    public set ecs(s: string) {
        let d = InfoRoot.string_to_number(s);
        this._ecs = ((d !== null) && (d > 0)) ? d : null;
    }
     protected is_storeable():boolean {
      return super.is_storeable() && (this.uniteid !== null);
    }
    protected retrieve_item(): Matiere {
      let x = super.retrieve_item();
      x.uniteid = this.uniteid;
      x.genre = this.genre;
      x.mat_module = this.mat_module;
      x.coefficient = this._ecs;
      x.ecs = this._ecs;
      return x;
    }
}// class Semestres

