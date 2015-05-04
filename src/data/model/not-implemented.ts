//not-implemented.ts
/// <reference path='../../../typings/aurelia/aurelia.d.ts' />
//
import {inject} from 'aurelia-framework';
//
//
import {BaseViewModel} from './baseviewmodel';
import {UserInfo} from './userinfo';
//
export class NotImplemented extends BaseViewModel {
    public static inject() { return [UserInfo]; }
    constructor(userinfo: UserInfo) {
        super(userinfo);
        this.title = 'NotImplemented';
    }
}// class NotImplemented
