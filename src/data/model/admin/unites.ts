//unites.ts
/// <reference path='../../../../typings/aurelia/aurelia.d.ts' />
//
import {inject} from 'aurelia-framework';
//
import {UserInfo} from '../userinfo';
import {DepPagedViewModel} from './deppagedviewmodel';
import {Unite} from '../../domain/unite';
//
export class Unites extends DepPagedViewModel<Unite> {
    static inject() { return [UserInfo]; }
    constructor(userinfo: UserInfo) {
        super(userinfo, new Unite());
        this.title = 'Unités';
    }// constructor
    protected create_item(): Unite {
        let p = new Unite({ departementid: this.departementid });
        p.departementid = this.departementid;
        return p;
    }
}// class Unites
