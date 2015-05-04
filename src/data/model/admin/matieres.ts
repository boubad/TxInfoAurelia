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
    static inject() { return [UserInfo]; }
    constructor(userinfo: UserInfo) {
        super(userinfo, new Matiere());
        this.title = 'Matières';
    }// constructor
    protected refresh_data(): any {
        let self = this;
        let userinfo = this.userInfo;
        return super.refresh_data().then((r) => {
            return userinfo.unites;
        }).then((aa: Unite[]) => {
            self.unites = aa;
            return userinfo.unite;
        }).then((a: Unite) => {
            self._unite = a;
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
        this.userInfo.unite.then((d: Unite) => {
            self._unite = d;
            self._item_model = self.create_item();
            self.refreshAll();
        });
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
        let x = this.currentItem;
        return (x !== null) ? x.genre : null;
    }
    public set genre(s: string) {
        let x = this.currentItem;
        if (x !== null) {
            x.genre = s;
        }
    }
    public get mat_module(): string {
        let x = this.currentItem;
        return (x !== null) ? x.mat_module : null;
    }
    public set mat_module(s: string) {
        let x = this.currentItem;
        if (x !== null) {
            x.mat_module = s;
        }
    }
    public get coefficient(): string {
        let x = this.currentItem;
        return (x !== null) ? InfoRoot.number_to_string(x.coefficient) : null;
    }
    public set coefficient(s: string) {
        let x = this.currentItem;
        if (x !== null) {
            x.coefficient = InfoRoot.string_to_number(s);
        }
    }
    public get ecs(): string {
        let x = this.currentItem;
        return (x !== null) ? InfoRoot.number_to_string(x.ecs) : null;
    }
    public set ecs(s: string) {
        let x = this.currentItem;
        if (x !== null) {
            x.ecs = InfoRoot.string_to_number(s);
        }
    }
}// class Semestres

