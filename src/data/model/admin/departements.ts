//departements.ts
/// <reference path='../../../../typings/aurelia/aurelia.d.ts' />
//
import {inject} from 'aurelia-framework';
//
import {IDepartement} from '../../../infodata.d';
import {UserInfo} from '../userinfo';
import {SigleNameViewModel} from './siglenameviewmodel';
import {Departement} from '../../domain/departement';
import {InfoRoot} from '../../../inforoot';
//
export class Departements extends SigleNameViewModel<Departement> {
    static inject() { return [UserInfo]; }
    constructor(userinfo: UserInfo) {
        super(userinfo);
        this.title = 'Départements';
    }// constructor
    protected initialize_data(): any {
        return Promise.resolve(true);
    }// initialize_data
    public canActivate(params?: any, config?: any, instruction?: any): any {
        let px = this.userInfo.person;
        return (px !== null) && px.is_admin;
    }// activate
    protected create_item(): Departement {
        return new Departement();
    }
    public get canAdd(): boolean {
        let userinfo = this.userInfo;
        let pPers = userinfo.person;
        if (pPers === null) {
            return false;
        }
        if (pPers.is_super) {
            return (!this._add_mode);
        }
        return false;
    }
    public set canAdd(s: boolean) { }
    public refreshAll(): any {
        let userinfo = this.userInfo;
        let pPers = userinfo.person;
        if (pPers === null) {
            return true;
        }
        if (pPers.is_super) {
            return super.refreshAll();
        }
        this._data_ids = [];
        this._pages_count = 0;
        this._current_page = 0;
        let self = this;
        userinfo.departements.then((dd) => {
            let ii: string[] = [];
            if ((dd !== undefined) && (dd !== null) && (dd.length > 0)) {
                self._page_size = dd.length;
                for (let x of dd) {
                    ii.push(x.id);
                }// x
            }// dd
            self._data_ids = ii;
            self._pages_count = (ii.length > 0) ? 1 : 0;
            return true;
        });
    }// refreshAll
    public refresh(): any {
        this._add_mode = false;
        let userinfo = this.userInfo;
        let pPers = userinfo.person;
        if (pPers === null) {
            return true;
        }
        if (pPers.is_super) {
            return super.refresh();
        }
        let self = this;
        this.items = [];
        this.currentItem = null;
        let oldid = (this.currentItem !== null) ? this.currentItem.id : null;
        userinfo.departements.then((dd: Departement[]) => {
            self.items = ((dd !== undefined) && (dd !== null)) ? dd : [];
            let pSel = InfoRoot.sync_array(self.items, oldid);
            self.currentItem = pSel;
            return true;
        });
    }// refresh
}// class Departements
