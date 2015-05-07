//administrators.ts
/// <reference path='../../../../typings/aurelia/aurelia-dependency-injection.d.ts' />
//
import {inject} from 'aurelia-dependency-injection';
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
    protected is_refresh():boolean{
        return (this.modelItem.departementid !== null);
    }
}// class Administrators

