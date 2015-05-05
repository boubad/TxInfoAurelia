//enseignants.ts
/// <reference path='../../../../typings/aurelia/aurelia.d.ts' />
//
import {inject} from 'aurelia-framework';
//
import {UserInfo} from '../userinfo';
import {PersonViewModel} from './personviewmodel';
import {Enseignant} from '../../domain/enseignant';
import {Person} from '../../domain/person';
//
export class Enseignants extends PersonViewModel<Enseignant, Person> {
    static inject() { return [UserInfo]; }
    constructor(userinfo: UserInfo) {
        super(userinfo);
        this.title = 'Enseignants';
    }// constructor
    protected create_person(): Person {
        let p = new Person({ roles: ['prof'] });
        return p;
    }
    protected create_item(): Enseignant {
        let p = new Enseignant({ departementid: this.departementid });
        return p;
    }
}// class Etudiants

