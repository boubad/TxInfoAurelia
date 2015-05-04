//departements.ts
/// <reference path='../../../../typings/aurelia/aurelia.d.ts' />
//
import {inject} from 'aurelia-framework';
//
import {IDepartement} from '../../../infodata.d';
import {UserInfo} from '../userinfo';
import {PagedViewModel} from './pagedviewmodel';
import {Departement} from '../../domain/departement';
//
export class Departements extends PagedViewModel<Departement> {
    static inject() { return [UserInfo]; }
    constructor(userinfo: UserInfo) {
        super(userinfo, new Departement());
        this.title = 'Départements';
    }// constructor
    public canActivate(params?: any, config?: any, instruction?: any): any {
        let px = this.userInfo.person;
        return (px !== null) && px.is_admin;
    }// activate
    public activate(params?: any, config?: any, instruction?: any): any {
        let self = this;
        return super.activate(params, config, instruction).then((r) => {
            return self.refreshAll();
        });
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
    public refreshAll(): any {
        this._add_mode = false;
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
        this._current_item = null;
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
        let oldid = (this.currentItem !== null) ? this.currentItem.id : null;
        userinfo.departements.then((dd: Departement[]) => {
            self.items = dd;
            let pSel = null;
            if ((dd !== undefined) && (dd !== null)) {
                if (oldid !== null) {
                    let n = dd.length;
                    for (let i = 0; i < n; ++i) {
                        let x = dd[i];
                        if (x.id == oldid) {
                            pSel = x;
                            break;
                        }
                    }// i
                }// old
            }
            if ((pSel === null) && (self.items.length > 0)) {
                pSel = self.items[0];
            }
            self.currentItem = pSel;
            if (self.items.length < 1) {
                self.addNew();
            }
            self._add_mode = false;
            return true;
        });
    }// refresh
}// class Departements

