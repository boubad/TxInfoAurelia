//home.ts
/// <reference path='../../../typings/aurelia/aurelia-dependency-injection.d.ts' />
//
import {inject} from 'aurelia-dependency-injection';
//
import {IDataService, IPerson} from '../../infodata.d';
import {BaseViewModel} from './baseviewmodel';
import {InfoRoot, EMPTY_STRING} from '../../inforoot';
import {UserInfo} from './userinfo';
//
export class Home extends BaseViewModel {
    public username: string = null;
    public password: string = null;
    //
    public static inject() { return [UserInfo]; }
    //
    constructor(userinfo: UserInfo) {
        super(userinfo);
    }// constructor
    public activate(params?: any, config?: any, instruction?: any): any {
        this.username = EMPTY_STRING;
        this.password = EMPTY_STRING;
        if (this.isConnected) {
            this.title = 'Accueil';
            return super.activate(params, config, instruction);
        } else {
            this.title = 'Connexion';
            return this.dataService.check_admin();
        }
    }// activate
    public get canConnect(): boolean {
        return (this.username !== null) && (this.username.trim().length > 0) &&
            (this.password !== null) && (this.password.trim().length > 0);
    }// canConnect
    public get cannotConnect(): boolean {
        return (!this.canConnect);
    }
    public connect(): any {
        if (!this.canConnect) {
            return;
        }
        let self = this;
        this.clear_error();
        let spass = this.password;
        return this.dataService.find_person_by_username(this.username).then((pPers) => {
            if (pPers === null) {
                self.errorMessage = 'Utilisateur inconnu';
            } else {
                if (!pPers.check_password(spass)) {
                    self.errorMessage = 'Utilisateur inconnu';
                } else {
                    self.username = EMPTY_STRING;
                    self.password = EMPTY_STRING;
                    self.userInfo.person = pPers;
                }
            }
        }).catch((err) => {
            self.set_error(err);
        });
    }// canConnect
}// class Home
