//administrators.ts
/// <reference path='../../../../typings/aurelia/aurelia.d.ts' />
//
import {inject} from 'aurelia-framework';
//
import {UserInfo} from '../userinfo';
import {PersonViewModel} from './personviewmodel';
import {Administrator} from '../../domain/administrator';
import {Person} from '../../domain/person';
//
export class Administrators extends PersonViewModel<Administrator, Person> {
    static inject() { return [UserInfo]; }
    constructor(userinfo: UserInfo) {
        super(userinfo);
        this.title = 'Opérateurs';
    }// constructor
    protected create_person(): Person {
        let p = new Person({ roles: ['admin'] });
        return p;
    }
    protected create_item(): Administrator {
        let p = new Administrator({ departementid: this.departementid });
        return p;
    }
}// class Administrators

