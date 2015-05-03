//admin.ts
//
/// <reference path='../../../typings/aurelia/aurelia.d.ts' />
//
import {inject} from 'aurelia-framework';
//
//
import {IDataService, IPerson, IElementDesc} from '../../infodata.d';
import {BaseViewModel} from './baseviewmodel';
import {InfoRoot} from '../../inforoot';
import {UserInfo} from './userinfo';
//
export class Admin extends BaseViewModel {
	public static inject(){ return [UserInfo];}
    constructor(userinfo:UserInfo) {
        super(userinfo);
        this.title = 'Administration';
    }// constructor
    public canActivate(params?: any, config?: any, instruction?: any): any {
        let px = this.userInfo.person;
        return (px !== null) && px.is_super;
    }// activate
}// class Profil
