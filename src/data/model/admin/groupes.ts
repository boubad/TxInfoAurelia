//groupes.ts
/// <reference path='../../../../typings/aurelia/aurelia.d.ts' />
//
import {inject} from 'aurelia-framework';
//
import {UserInfo} from '../userinfo';
import {DepPagedViewModel} from './deppagedviewmodel';
import {Groupe} from '../../domain/groupe';
//
export class Groupes extends DepPagedViewModel<Groupe> {
    static inject() { return [UserInfo]; }
    constructor(userinfo: UserInfo) {
        super(userinfo, new Groupe());
        this.title = 'Groupes';
    }// constructor
    protected create_item(): Groupe {
        let p = new Groupe({ departementid: this.departementid });
        return p;
    }
}// class Groupes

