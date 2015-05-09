//animation-main.ts
/// <reference path='../typings/aurelia/aurelia-framework.d.ts' />
import {Aurelia} from 'aurelia-framework';
//
export function configure(aurelia:Aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-animator-css');

  aurelia.start().then(a => a.setRoot());
}
