//unites.ts
/// <reference path='../../../../typings/aurelia/aurelia-dependency-injection.d.ts' />
//
import {inject} from 'aurelia-dependency-injection';
//
import {UserInfo} from '../userinfo';
import {SigleNameViewModel} from './siglenameviewmodel';
import {Unite} from '../../domain/unite';
//
export class Unites extends SigleNameViewModel<Unite> {
    static inject() { return [UserInfo]; }
    constructor(userinfo: UserInfo) {
        super(userinfo);
        this.title = 'Unités';
    }// constructor
    protected create_item(): Unite {
        let p = new Unite({ departementid: this.departementid });
        p.departementid = this.departementid;
        return p;
    }
    protected is_refresh(): boolean {
        return (this.modelItem.departementid !== null);
    }
    protected post_change_departement(): Promise<any> {
        let self = this;
        return super.post_change_departement().then((r) => {
            self.modelItem.departementid = self.departementid;
            self.refreshAll();
        });
    }// post_change_departement
}// class Unites
