//app.ts
/// <reference path='../typings/aurelia/aurelia-router.d.ts' />

import {RouterConfiguration, Router} from 'aurelia-router';
//
import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';

export class App {
	public router:Router; 
	 configureRouter(config:RouterConfiguration, router:Router){
    config.title = 'InfoApp';
    config.map([
      { route: ['','home'],  moduleId: './data/model/home', nav: true, title:'Accueil' },
      { route: 'profil',  moduleId: './data/model/profil', nav: true, title:'Profil' },
      { route: 'prof-router',  moduleId: './data/model/prof/prof-router', nav: true, title:'Contrôles' },
      { route: 'admin-router',  moduleId: './data/model/admin/admin-router', nav: true, title:'Administration' }
    ]);

    this.router = router;
  }
}
