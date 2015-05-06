//admin-router.ts
/// <reference path='../../../../typings/aurelia/aurelia.d.ts' />
//
import {inject} from 'aurelia-framework';
import {IRouterConfig, Router} from 'aurelia-router';
import {BaseViewModel} from '../baseviewmodel';
import {UserInfo} from '../userinfo';
//
const NOT_IMPLEMENTED = '../not-implemented';
//
export class AdminRouter extends BaseViewModel {
    public router: Router;
    public heading: string = 'Administration';
    //
    static inject(){ return [UserInfo];}
    //
    constructor(userinfo:UserInfo){
      super(userinfo);
    }// constructor
    //
    public canActivate(params?: any, config?: any, instruction?: any): any {
        let px = this.userInfo.person;
        return (px !== null) && px.is_admin;
    }// activate
    //
    public configureRouter(config: IRouterConfig, router: Router) : any {
        config.map([
            { route: ['', 'home'], moduleId: '../home', nav: true, title: 'Accueil' },
            { route: 'affetuds', moduleId: './etudaffectations', nav: true, title:'Affectations étudiants' },
            { route: 'affprofs', moduleId: './profaffectations', nav: true, title:'Affectations enseignants' },
            { route: 'etudiants', moduleId: './etudiants', nav: true, title:'Etudiants' },
            { route: 'semestres', moduleId: './semestres', nav: true, title:'Semestres' },
            { route: 'enseignants', moduleId: './enseignants', nav: true, title:'Enseignants' },
            { route: 'annees', moduleId: './annees', nav: true, title:'Annees' },
            { route: 'matieres', moduleId: './matieres', nav: true, title:'Matières' },
            { route: 'unites', moduleId: './unites', nav: true, title:'Unités' },
            { route: 'groupes', moduleId: './groupes', nav: true, title:'Groupes' },
            { route: 'administrators', moduleId: './administrators', nav: true, title:'Opérateurs' },
            { route: 'departements', moduleId: './departements', nav: true, title:'Départements' }
        ]);
        this.router = router;
    }
}
