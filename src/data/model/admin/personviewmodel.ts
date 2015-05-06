//personviewmodel.ts
//
//
import {UserInfo} from '../userinfo';
import {IPerson, IDepartementPerson, IWorkItem} from '../../../infodata.d';
import {InfoRoot} from '../../../inforoot';
import {BaseEditViewModel} from './baseeditmodel';
//
export class PersonViewModel<T extends IDepartementPerson, V extends IPerson>
    extends BaseEditViewModel<T> {
    //
    private _current_person: V;
    //
    constructor(userinfo: UserInfo) {
        super(userinfo);
        this._current_person = null;
    }// constructor
    //
    public activate(params?: any, config?: any, instruction?: any): any {
        let self = this;
        this._current_person = this.create_person();
        return super.activate(params, config, instruction).then((r) => {
            return self.refreshAll();
        });
    }// activate
    protected post_change_departement(): Promise<any> {
        let self = this;
        return super.post_change_departement().then((r) => {
            self.modelItem.departementid = self.departementid;
            self.refreshAll();
        });
    }// post_change_departement
    //
    protected create_person(): V {
        return null;
    }
    protected post_change_item(): Promise<any> {
        this.currentPerson = null;
        let self = this;
        let p = this.currentItem;
        let personid = (p !== null) ? p.personid : null;
        return super.post_change_item().then((r) => {
            if (personid !== null) {
                return self.dataService.find_item_by_id(personid);
            } else {
                return null;
            }
        }).then((pPers: V) => {
            self.currentPerson = pPers;
        });
    }// post_change_item
    public get currentPerson(): V {
        if ((this._current_person === undefined) || (this._current_person === null)) {
            this._current_person = this.create_person();
        }
        return this._current_person;
    }
    public set currentPerson(s: V) {
        this._current_person = s;
    }
    protected is_storeable(): boolean {
        let x = this.currentPerson;
        return (x !== null) && x.is_storeable() && (this.departementid !== null);
    }
    public get username(): string {
        let x = this.currentPerson;
        return (x !== null) ? x.username : null;
    }
    public set username(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.username = s;
        }
    }
    public get firstname(): string {
        let x = this.currentPerson;
        return (x !== null) ? x.firstname : null;
    }
    public set firstname(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.firstname = s;
        }
    }
    public get lastname(): string {
        let x = this.currentPerson;
        return (x !== null) ? x.lastname : null;
    }
    public set lastname(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.lastname = s;
        }
    }
    public get email(): string {
        let x = this.currentPerson;
        return (x !== null) ? x.email : null;
    }
    public set email(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.email = s;
        }
    }
    public get phone(): string {
        let x = this.currentPerson;
        return (x !== null) ? x.phone : null;
    }
    public set phone(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.phone = s;
        }
    }
    public get description(): string {
        let x = this.currentPerson;
        return (x !== null) ? x.description : null;
    }
    public set description(s: string) {
        let x = this.currentPerson;
        if (x !== null) {
            x.description = s;
        }
    }
    public save(): any {
        let pPers = this.currentPerson;
        if ((this.departementid === null) || (pPers === null)) {
            return;
        }
        if (!pPers.is_storeable()) {
            return;
        }
        let item = this.currentItem;
        if (item === null) {
            item = this.create_item();
            if (item === null) {
                return;
            }
        }
        if (pPers.id === null) {
            pPers.id = pPers.create_id();
        }
        item.lastname = pPers.lastname;
        item.firstname = pPers.firstname;
        item.personid = pPers.id;
        item.avatarid = pPers.avatarid;
        item.departementid = this.departementid;
        if (item.id === null){
            item.id = item.create_id();
        }
        var self = this;
        let bOld = (item.rev !== null);
        this.clear_error();
        let service = this.dataService;
        item.update_person(pPers);
        return service.maintains_item(pPers).then((px) => {
            return service.maintains_item(item);
        }).then((ox) => {
            if (bOld) {
                self.refresh();
            } else {
                self.refreshAll();
            }
            self.refreshAll();
        }).catch((err) => {
            self.set_error(err);
        });
    }// save
}// class PersonViewModel