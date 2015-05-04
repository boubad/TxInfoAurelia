//baseviewmodel.ts
//
import {UserInfo} from './userinfo';
import {IBaseItem, IDataService, IPerson} from '../../infodata.d';
import {DataService} from '../services/dataservice';
import {InfoRoot} from '../../inforoot';
//
export class BaseViewModel {
    //
    private _user: UserInfo;
    public title: string;
    public errorMessage: string;
    public infoMessage: string;
    private _photoUrl: string;
    private _photoData: Blob;
    //
    constructor(userinfo: UserInfo) {
        this._user = userinfo;
        this.title = null;
        this.errorMessage = null;
        this.infoMessage = null;
        this._photoUrl = null;
        this._photoData = null;
    }// constructor
    public get userInfo(): UserInfo {
        if (this._user === null) {
            this._user = new UserInfo(new DataService());
        }
        return this._user;
    }// get userInfo
    public get dataService(): IDataService {
        return this.userInfo.dataService;
    }
    public get person(): IPerson {
        return this.userInfo.person;
    }
    public get isConnected(): boolean {
        let x = this.person;
        return (x !== null) && (x.id !== null);
    }// isConnected
    public set isConnected(s: boolean) {
    }
    public get isNotConnected(): boolean {
        return (!this.isConnected);
    }
    public set isNotConnected(s: boolean) {
    }
    public activate(params?: any, config?: any, instruction?: any): any {
        let x = this.userInfo.person;
        let self = this;
        this._photoData = null;
        if ((x !== null) && (x.id !== null) && (x.avatarid !== null)) {
            return this.dataService.find_attachment(x.id, x.avatarid).then((blob) => {
                if (blob !== null) {
                    self._photoData = blob;
                }
                return true;
            });
        } else {
            this.update_title();
            return Promise.resolve(true);
        }
    }// activate
    public deactivate(): any {
        if (this._photoUrl !== null) {
            InfoRoot.revokeUrl(this._photoUrl);
            this._photoUrl = null;
        }
    }
    protected update_title(): any {
    } // update_title
    public get hasErrorMessage(): boolean {
        return (this.errorMessage !== null) && (this.errorMessage.trim().length > 0);
    }
    public set hasErrorMessage(b: boolean) {
    }
    public get hasInfoMessage(): boolean {
        return (this.infoMessage !== null) && (this.infoMessage.trim().length > 0);
    }
    public set hasInfoMessage(b: boolean) {
    }
    public clear_error(): void {
        this.errorMessage = null;
        this.hasInfoMessage = null;
    }
    public set_error(err: any): void {
        if ((err !== undefined) && (err !== null)) {
            if ((err.message !== undefined) && (err.message !== null)) {
                this.errorMessage = (err.message.length > 0) ? err.message : 'Erreur inconnue...';
            } else if ((err.msg !== undefined) && (err.msg !== null)) {
                this.errorMessage = (err.msg.length > 0) ? err.msg : 'Erreur inconnue...';
            } else if ((err.reason !== undefined) && (err.reason !== null)) {
                this.errorMessage = err.reason;
            } else {
                this.errorMessage = JSON.stringify(err);
            }
        } else {
            this.errorMessage = 'Erreur inconnue...';
        }
    } // set_error
    public get fullname(): string {
        let x = this.person;
        return (x !== null) ? x.fullname : null;
    }
    public get photoUrl(): string {
        if ((this._photoUrl === null) && (this._photoData !== null)) {
            this._photoUrl = InfoRoot.createUrl(this._photoData);
        }
        return this._photoUrl;
    }
    public get hasPhoto(): boolean {
        let x = this.photoUrl;
        return (x !== null);
    }
    public set hasPhoto(s: boolean) { }
    public get isSuper(): boolean {
        let x = this.person;
        return (x !== null) && x.is_super;
    }
    public set isSuper(b: boolean) { }
    public get isAdmin(): boolean {
        let x = this.person;
        return (x !== null) && x.is_admin;
    }
    public set isAdmin(b: boolean) { }
    public get isProf(): boolean {
        let x = this.person;
        return (x !== null) && x.is_prof;
    }
    public set isProf(b: boolean) { }
    public get isEtud(): boolean {
        let x = this.person;
        return (x !== null) && x.is_etud;
    }
    public set isEtud(b: boolean) { }
    protected retrieve_one_avatar(item: IBaseItem): Promise<IBaseItem> {
        if ((item === undefined) || (item === null)) {
            return Promise.resolve(null);
        }
        if (item.url !== null) {
            InfoRoot.revokeUrl(item.url);
            item.url = null;
        }
        let id = item.avatardocid();
        let avatarid = item.avatarid;
        if ((id === null) || (avatarid === null)) {
            return Promise.resolve(item);
        }
        return this.dataService.find_attachment(id, avatarid).then((blob) => {
            item.url = InfoRoot.createUrl(blob);
            return item;
        });
    }// rerieve_one_avatar
    protected retrieve_avatars(items: IBaseItem[]): Promise<IBaseItem[]> {
        if ((items === undefined) || (items === null)) {
            return Promise.resolve([]);
        }
        if (items.length < 1) {
            return Promise.resolve([]);
        }
        let pp: Promise<IBaseItem>[] = [];
        for (let p of items) {
            let x = this.retrieve_one_avatar(p);
            pp.push(x);
        }// p
        return Promise.all(pp);
    }// retrive_avatars
}// class BaseViewModel