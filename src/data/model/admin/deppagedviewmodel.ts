//deppagedviewmodel.ts
//
//
import {UserInfo} from '../userinfo';
import {IDataService, IPerson, IDepSigleNameItem} from '../../../infodata.d';
import {DataService} from '../../services/dataservice';
import {Departement} from '../../domain/departement';
import {InfoRoot} from '../../../inforoot';
import {PagedViewModel} from './pagedviewmodel';
//
export class DepPagedViewModel<T extends IDepSigleNameItem> extends PagedViewModel<T> {
    //
    public departements: Departement[];
    protected _departement: Departement;
    //
    constructor(userinfo: UserInfo, model: T) {
        super(userinfo, model);
        this.departements = [];
        this._departement = null;
    }// constructor
    protected refresh_data(): any {
        let self = this;
        let userinfo = this.userInfo;
        return userinfo.departements.then((dd: Departement[]) => {
            self.departements = dd;
            return userinfo.departement;
        }).then((d:Departement) => {
            self._departement = d;
            return true;
        });
    }// refresh_data
    //
    public activate(params?: any, config?: any, instruction?: any): any {
        let self = this;
        this._item_model = this.create_item();
        return super.activate(params, config, instruction).then((r) => {
            return self.refresh_data();
        }).then((r) => {
            self._item_model = self.create_item();
            return self.refreshAll();
        });
    }// activate
    public get departement(): Departement {
        return this._departement;
    }
    public set departement(s: Departement) {
        this._departement = s;
        let id = (this._departement !== null) ? this._departement.id : null;
        this.userInfo.departementid = id;
        this._item_model.departementid = id;
        this.refreshAll();
    }
    public get departementid(): string {
      let id =  this.userInfo.departementid;
      if (id === null){
        id = (this.departement !== null) ? this.departement.id : null;
      }
      return id;
    }
    protected is_storeable():boolean {
      return super.is_storeable() && (this.departementid !== null);
    }
    protected retrieve_item(): T {
      let x = super.retrieve_item();
      x.departementid = this.departementid;
      return x;
    }
}// class Dep PagedViewModel
