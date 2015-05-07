//not-implemented.ts
/// <reference path='../../../typings/aurelia/aurelia-dependency-injection.d.ts' />
//
import {inject} from 'aurelia-dependency-injection';
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
