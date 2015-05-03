//profil.ts
//
/// <reference path='../../../typings/aurelia/aurelia.d.ts' />
//
import {inject} from 'aurelia-framework';
//
//
import {IDataService, IPerson, IElementDesc, IFileDesc} from '../../infodata.d';
import {BaseViewModel} from './baseviewmodel';
import {InfoRoot} from '../../inforoot';
import {FileDesc} from '../domain/filedesc';
import {UserInfo} from './userinfo';
//
export class Profil extends BaseViewModel {
    //
    private fileDesc: IFileDesc;
    //
    public profilMode: boolean;
    public passwordMode: boolean;
    public avatarMode: boolean;
    public newPassword: string;
    public confirmPassword: string;
    //
    public firstname: string;
    public lastname: string;
    public email: string;
    public phone: string;
    public description: string;
    //
    public static inject() { return [UserInfo]; }
    constructor(userinfo: UserInfo) {
        super(userinfo);
        this.title = 'Profil';
        this.hasUrl = false;
        this.profilMode = true;
        this.passwordMode = false;
        this.avatarMode = false;
        this.newPassword = null;
        this.confirmPassword = null;
        this.fileDesc = new FileDesc();
        this.firstname = null;
        this.lastname = null;
        this.email = null;
        this.phone = null;
        this.description = null;
    }// constructor
    public canActivate(params?: any, config?: any, instruction?: any): any {
        let px = this.userInfo.person;
        return (px !== null) && (px.id !== null);
    }// canActivate
    public activate(params?: any, config?: any, instruction?: any): any {
        let px = this.userInfo.person;
        this.fileDesc.clear();
        this.newPassword = null;
        this.confirmPassword = null;
        if (px !== null) {
            this.firstname = px.firstname;
            this.lastname = px.lastname;
            this.email = px.email;
            this.phone = px.phone;
            this.description = px.description;
        }// px
        return super.activate(params,config,instruction);
    }// activate
    public get oldUrl(): string {
        return this.photoUrl;
    }
    public get hasOldUrl(): boolean {
        return this.hasPhoto;
    }
    public set hasOldUrl(s:boolean){}
    public set_profil(): any {
        this.profilMode = true;
        this.passwordMode = false;
        this.avatarMode = false;
    }
    public set_password(): any {
        this.profilMode = false;
        this.passwordMode = true;
        this.avatarMode = false;
    }
    public set_avatar(): any {
        this.profilMode = false;
        this.passwordMode = false;
        this.avatarMode = true;
    }
    public get canChangePwd(): boolean {
        return (this.newPassword !== null) && (this.confirmPassword !== null) &&
            (this.newPassword == this.confirmPassword) &&
            (this.newPassword.trim().length > 0);
    }
    public changePwd(): any {
        let pPers = this.userInfo.person;
        if (pPers === null) {
            return;
        }
        let self = this;
        pPers.change_password(this.newPassword);
        this.clear_error();
        return this.dataService.maintains_item(pPers).then((r) => {
            self.infoMessage = 'Mot de passe modifié!';
            self.newPassword = null;
            self.confirmPassword = null;
        }, (err) => {
                self.set_error(err);
            });
    }
    public get canSaveData(): boolean {
        return (this.firstname !== null) && (this.firstname.trim().length > 0) &&
            (this.lastname !== null) && (this.lastname.trim().length > 0);
    }
    public saveData(): any {
        let pPers = this.userInfo.person;
        if (pPers === null) {
            return;
        }
        pPers.firstname = this.firstname;
        pPers.lastname = this.lastname;
        pPers.email = this.email;
        pPers.phone = this.phone;
        pPers.description = this.description;
        let self = this;
        this.clear_error();
        return this.dataService.maintains_item(pPers).then((r) => {
            self.infoMessage = 'Informations enregistrées!';
        }, (err) => {
                self.set_error(err);
            });
    }// saveData
    public get url(): string {
        return this.fileDesc.url;
    }
    public get hasUrl(): boolean {
        return (this.fileDesc.url !== null);
    }
    public set hasUrl(s:boolean){}
    public get canRemove(): boolean {
        return this.hasOldUrl;
    }
    public get canSave(): boolean {
        return this.fileDesc.is_storeable;
    }
    public fileChanged(event: any): any {
        this.fileDesc.changed(event);
    }// fileChanged
    public remove(): any {
        let pPers = this.userInfo.person;
        if (pPers === null) {
            return;
        }
        let id = pPers.id;
        let avatarid = pPers.avatarid;
        if ((id === null) || (avatarid === null)) {
            return;
        }
        if (InfoRoot.confirm('Voulez-vous vraiment supprimer cet avatar?')) {
            let self = this;
            return this.dataService.remove_attachment(id, avatarid).then((r) => {
                self.infoMessage = 'Avatar supprimé. Veuillez vous reconnecter.';
            }, (err) => {
                    self.set_error(err);
                });
        }
    }
    public save(): any {
        let pPers = this.userInfo.person;
        if (pPers === null) {
            return;
        }
        let id = pPers.id;
        if (id === null) {
            return;
        }
        let avatarid = this.fileDesc.name;
        let type = this.fileDesc.type;
        let data = this.fileDesc.data;
        if ((avatarid === null) || (type === null) || (data === null)) {
            return;
        }
        let service = this.dataService;
        this.clear_error();
        let self = this;
        return service.maintains_attachment(id, avatarid, data, type).then((r) => {
            pPers.avatarid = avatarid;
            return service.maintains_item(pPers);
        }).then((p: IPerson) => {
            self.infoMessage = 'Avatar modifié. Veuillez vous reconnecter.';
        });
    }// save
}// class Profil
