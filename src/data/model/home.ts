//home.ts
//
import {IDataService, IPerson, IElementDesc} from '../../infodata.d';
import {BaseViewModel} from './baseviewmodel';
import {InfoRoot} from '../../inforoot';
//
export class Home extends BaseViewModel {
    public username: string;
    public password: string;
    public menu: IElementDesc[];
    constructor() {
        super();
        this.username = null;
        this.password = null;
        this.menu = [];
    }// constructor
    public activate(params?: any, config?: any, instruction?: any): any {
        if (this.isConnected) {
            this.title = 'Accueil';
            return Promise.resolve(true);
        } else {
          this.title = 'Connexion';
          this.menu = [];
          return this.dataService.check_admin();
        }
    }// activate
    public get canConnect(): boolean {
        return (this.username !== null) && (this.username.trim().length > 0) &&
            (this.password !== null) && (this.password.trim().length > 0);
    }// canConnect
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
                    self.username = null;
                    self.password = null;
                    self.userInfo.person = pPers;
                }
            }
        }).catch((err) => {
            self.set_error(err);
        });
    }// canConnect
    public disconnect(): any {
        if (InfoRoot.confirm('Voulez-vous vraiment quitter?')) {
            this.userInfo.person = null;
        }
    }// disconnect
}// class Home
