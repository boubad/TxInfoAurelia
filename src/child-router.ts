//child-router.ts
/// <reference path='../typings/aurelia/aurelia.d.ts' />
//
import {IRouterConfig,Router} from 'aurelia-router';
//
export class ChildRouter{
	public router:Router;
  	public heading:string = 'Child Router';

  configureRouter(config:IRouterConfig, router:Router){
    config.map([
      { route: ['','welcome'],  moduleId: './welcome',      nav: true, title:'Welcome' },
      { route: 'flickr',        moduleId: './flickr',       nav: true },
      { route: 'child-router',  moduleId: './child-router', nav: true, title:'Child Router' }
    ]);

    this.router = router;
  }
}
