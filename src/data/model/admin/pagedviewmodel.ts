//pagedviewmodel.ts
//
//
import {UserInfo} from '../userinfo';
import {IDataService, IPerson, ISigleNameItem} from '../../../infodata.d';
import {DataService} from '../../services/dataservice';
import {InfoRoot} from '../../../inforoot';
import {BaseViewModel} from '../baseviewmodel';
//
export class PagedViewModel<T extends ISigleNameItem> extends BaseViewModel {
    //
    protected _add_mode: boolean;
    protected _page_size: number;
    protected _current_page: number;
    protected _pages_count: number;
    protected _data_ids: string[];
    protected _current_item: T;
    protected _old_item: T;
    protected _item_model: T;
    public hasAvatars: boolean;
    public _pageStatus: string;
    //
    private _sigle:string;
    private _name:string;
    private _desc:string;
    //
    public items: T[];
    //
    constructor(userinfo: UserInfo, model: T) {
        super(userinfo);
        this._item_model = model;
        this._add_mode = false;
        this._page_size = 16;
        this._current_page = 0;
        this._pages_count = 0;
        this._data_ids = [];
        this._old_item = null;
        this._current_item = null;
        this.items = [];
        this.hasAvatars = false;
        this._pageStatus = null;
        this._old_item = null;
        this._sigle = null;
        this._name = null;
        this._desc = null;
    }// constructor
    //
    protected create_item(): T {
        return null;
    }
    public get canAdd(): boolean {
        return (!this._add_mode);
    }
    public addNew(): any {
        this._old_item = this._current_item;
        this.currentItem = this.create_item();
        this._add_mode = true;
    }
    public get canCancel(): boolean {
        return this._add_mode;
    }
    public cancel_add(): void {
      this._add_mode = false;
      this.currentItem = this._old_item;
    }
    public cancel(): void {
      this.cancel_add();
    }
    public get canRemove(): boolean {
        let x = this.currentItem;
        return (x !== null) && (x.id !== null) && (x.rev !== null);
    }
    protected is_storeable():boolean {
      return (this.sigle !== null);
    }
    protected retrieve_item(): T {
      let x = this.currentItem;
      x.sigle = this.sigle;
      x.name = this.name;
      x.description = this.description;
      return x;
    }
    protected post_change_item(): any {
        let x = this.currentItem;
        this.sigle = (x !== null) ? x.sigle : null;
        this.name = (x !== null) ? x.name : null;
        this.description = (x !== null) ? x.description : null;
    }// post_change_item
    public get canSave(): boolean {
        return this.is_storeable();
    }
    //
    public get currentItem(): T {
       if ((this._current_item === undefined) || (this._current_item === null)){
         this._current_item = this.create_item();
       }
        return this._current_item;
    }
    public set currentItem(s: T) {
        this._current_item = (s !== undefined) ? s : null;
        this.post_change_item();
    }
    public get sigle(): string {
      return this._sigle;
    }
    public set sigle(s: string) {
        this._sigle = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
        s.trim().toUpperCase() : null;
    }
    public get name(): string {
        return this._name;
    }
    public set name(s: string) {
      this._name = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
      s.trim() : null;
    }
    public get description(): string {
      return this._desc;
    }
    public set description(s: string) {
      this._desc = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
      s.trim() : null;
    }
    public refresh(): any {
        if (this._item_model === null) {
            return true;
        }
        for (let elem of this.items) {
            let x = elem.url;
            if (x !== null) {
                InfoRoot.revokeUrl(x);
                elem.url = null;
            }
        }// elem
        let startKey = null;
        let endKey = null;
        let nbItems = this._data_ids.length;
        let istart = this._current_page * this._page_size;
        if ((istart >= 0) && (istart < nbItems)) {
            startKey = this._data_ids[istart];
        }
        let iend = istart + this._page_size - 1;
        if (iend >= nbItems) {
            iend = nbItems - 1;
        }
        if ((iend >= 0) && (iend < nbItems)) {
            endKey = this._data_ids[iend];
        }
        if ((startKey === null) || (endKey === null)) {
            this.items = [];
            this.addNew();
            return true;
        }
        this.items = [];
        let model = this._item_model;
        this.clear_error();
        let oldid = (this.currentItem !== null) ? this.currentItem.id : null;
        var self = this;
        return this.dataService.get_items(model, startKey, endKey).then((rr) => {
            self._add_mode = false;
            if (self.hasAvatars) {
                return self.retrieve_avatars(rr);
            } else {
                return rr;
            }
        }).then((dd: T[]) => {
            let pSel: T = null;
            if ((dd !== undefined) && (dd !== null)) {
                self.items = dd;
                if (oldid !== null) {
                    let n = dd.length;
                    for (let i = 0; i < n; ++i) {
                        let x = dd[i];
                        if (x.id == oldid) {
                            pSel = x;
                            break;
                        }
                    }// i
                }// old
            }
            if ((pSel === null) && (self.items.length > 0)) {
                pSel = self.items[0];
            }
            self.currentItem = pSel;
            if (self.items.length < 1) {
                self.addNew();
            }
            return true;
        });
    }// refresh
    public get pageStatus():string {
        let sRet: string = null;
        if (this.pagesCount > 1) {
            sRet = 'Page ' + this.currentPage + ' sur ' + this.pagesCount;
        }
        return sRet;
    }
    public refreshAll(): any {
        this._data_ids = [];
        this._pages_count = 0;
        this._current_page = 0;
        this._current_item = null;
        let model = this._item_model;
        if (model === null) {
            return;
        }
        let startKey = model.start_key();
        let endKey = model.end_key();
        let nc = this._page_size;
        let self = this;
        return this.dataService.get_ids(startKey, endKey).then((ids) => {
        //   console.log('TOTAL COUNT: ' + ids.length);
            if ((ids !== undefined) && (ids !== null)) {
                self._data_ids = ids;
                let nt = ids.length;
                let np = Math.floor(nt / nc);
                if ((np * nc) < nt) {
                    ++np;
                }
                self._pages_count = np;
            }
            self.update_title();
            return self.refresh();
        });
    }// refreshAll
    public save(): any {
        let item = this.retrieve_item();
        if (item === null) {
            return false;
        }
        let xx:any = {};
        item.to_map(xx);
        console.log(JSON.stringify(xx));
        if (!item.is_storeable()) {
            return false;
        }
        var self = this;
        return this.dataService.maintains_item(item).then((r) => {
            if (item.rev !== null) {
                return self.refresh();
            } else {
                return self.refreshAll();
            }
        }, (err) => {
                self._add_mode = false;
                self.set_error(err);
                return false;
            });
    }// save
    public remove(): any {
        let item = this.currentItem;
        if (item === null) {
            return false;
        }
        if ((item.id === null) || (item.rev === null)) {
            return false;
        }
        if (InfoRoot.confirm('Voulez-vous vraiment supprimer ' + item.id + '?')) {
            let self = this;
            return this.dataService.remove_item(item).then((r) => {
                self.refreshAll();
            }, (err) => {
                    self.set_error(err);
                });
        }
    }// remove
    public get hasItems():boolean {
        return (this._data_ids.length > 0);
    }
    public set hasItems(s:boolean){}
    public get hasPages():boolean {
        return (this.pagesCount > 1);
    }
    public set hasPages(s:boolean){}
    public get pagesCount(): number {
        return this._pages_count;
    }
    public get itemsPerPage(): number {
        return this._page_size;
    }
    public set itemsPerPage(s: number) {
        let n = InfoRoot.check_number(s);
        if ((n !== null) && (n > 0) && (n != this._page_size)) {
            this._page_size = n;
            this.refreshAll();
        }
    }
    public get currentPage(): number {
        return (this._current_page + 1);
    }
    public set currentPage(s: number) {
        let n = InfoRoot.check_number(s);
        if ((n !== null) && (n > 0)) {
            --n;
            if ((n >= 0) && (n != this._current_page)) {
                this._current_page = n;
                this.refresh();
            }
        }// n
    }// set currentPage
    public get canPrevPage(): boolean {
        return (this._current_page > 0);
    }
    public get canNextPage(): boolean {
        let n = this._current_page + 1;
        return (n < this._pages_count);
    }
    public firstPage(): void {
        if (this.currentPage > 1) {
            this.currentPage = 1;
        }
    }
    public prevPage(): void {
        if (this.currentPage > 1) {
            let n = this.currentPage - 1;
            this.currentPage = n;
        }
    }
    public nextPage(): void {
        let n = this.currentPage;
        if (n < this._pages_count) {
            this.currentPage = n + 1;
        }
    }// nextPage
    public lastPage(): void {
        let n = this.currentPage;
        if (n < this._pages_count) {
            this.currentPage = this._pages_count;
        }
    }
}// class PagedViewModel
