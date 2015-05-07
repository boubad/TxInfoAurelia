//groupes.ts
/// <reference path='../../../../typings/aurelia/aurelia-dependency-injection.d.ts' />
//
import {inject} from 'aurelia-dependency-injection';
//
import {UserInfo} from '../userinfo';
import {SigleNameViewModel} from './siglenameviewmodel';
import {Groupe} from '../../domain/groupe';
//
export class Groupes extends SigleNameViewModel<Groupe> {
    static inject() { return [UserInfo]; }
    constructor(userinfo: UserInfo) {
        super(userinfo);
        this.title = 'Groupes';
    }// constructor
    protected create_item(): Groupe {
        let p = new Groupe({ departementid: this.departementid });
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
}// class Groupes

