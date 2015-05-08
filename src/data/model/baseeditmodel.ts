//baseeditmodel.ts
//
import {UserInfo} from './userinfo';
import {IBaseItem, IFileDesc} from '../../infodata.d';
import {InfoRoot} from '../../inforoot';
import {FileDesc} from '../domain/filedesc';
import {WorkViewModel} from './workviewmodel';
//
export class BaseEditViewModel<T extends IBaseItem> extends WorkViewModel {
    //
    public _items: T[] = null;
    //
    private _add_mode: boolean = false;
    private _page_size: number = 16;
    private _current_page: number = 0;
    private _pages_count: number = 16;
    private _data_ids: string[] = null;
    //
    private _current_item: T = null;
    private _old_item: T = null;
    private _item_model: T = null;
    protected  hasAvatars: boolean = false;
    private _pageStatus: string = null;
    private _fileDesc: IFileDesc = null;
    private _avatar_file: string = null;
    //
    constructor(userinfo: UserInfo) {
        super(userinfo);
    }// constructor
    //
    public get items(): T[] {
        if (this._items === null) {
            this._items = [];
        }
        return this._items;
    }
    public set items(s: T[]) {
        this._items = ((s !== undefined) && (s !== null)) ? s : [];
    }
    //
    public canActivate(params?: any, config?: any, instruction?: any): any {
        let px = this.userInfo.person;
        return (px !== null) && (px.is_admin || px.is_prof);
    }// activate
    //
    public activate(params?: any, config?: any, instruction?: any): any {
        let self = this;
        return super.activate(params, config, instruction).then((r) => {
            return self.initialize_data();
        }).then((xx) => {
            self.refreshAll();
        })
    }// activate
    protected get allIds(): string[] {
        if (this._data_ids === null) {
            this._data_ids = [];
        }
        return this._data_ids;
    }
    protected set allIds(s: string[]) {
        this._data_ids = ((s !== undefined) && (s !== null)) ? s : [];
    }
    //
    protected create_item(): T {
        return null;
    }
    //
    protected post_change_item(): Promise<any> {
        this.avatarUrl = null;
        let p = this.currentItem;
        if (p === null) {
            return Promise.resolve(true);
        }
        let id = p.avatardocid();
        let avatarid = p.avatarid;
        if ((id === null) || (avatarid === null)) {
            return Promise.resolve(true);
        }
        let self = this;
        return this.dataService.find_attachment(id, avatarid).then((blob) => {
            if ((blob !== undefined) && (blob !== null)) {
                self.avatarUrl = InfoRoot.createUrl(blob);
            }
            return true;
        });
    }// post_change_item
    protected is_storeable(): boolean {
        let x = this.currentItem;
        return (x !== null) && x.is_storeable();
    }
    //
    protected get fileDesc(): IFileDesc {
        if (this._fileDesc === null) {
            this._fileDesc = new FileDesc();
        }
        return this._fileDesc;
    }
    public get avatarUrl(): string {
        return (this._avatar_file !== null) ?
            this._avatar_file : null;
    }
    public set avatarUrl(s: string) {
        let old = this._avatar_file;
        if (old !== null) {
            InfoRoot.revokeUrl(old);
            this._avatar_file = s;
        }
    }
    public get hasAvatarUrl(): boolean {
        return (this.avatarUrl !== null);
    }
    public set hasAvatarUrl(s: boolean) { }
    public get canRemoveAvatar(): boolean {
        let p = this.currentItem;
        if ((p !== null) && (p.avatarid !== null) &&
            (p.id !== null) && (p.rev !== null)) {
            return (p.avatardocid() !== null);
        }
        return false;
    }
    public get cannotRemoveAvatar(): boolean {
        return (!this.canRemoveAvatar);
    }
    public get canSaveAvatar(): boolean {
        let x = this.fileDesc;
        let p = this.currentItem;
        return (x !== null) && x.is_storeable && (p !== null) &&
            (p.id !== null) && (p.rev !== null);
    }
    public get cannotSaveAvatar(): boolean {
        return (!this.canSaveAvatar);
    }
    public get workingUrl(): string {
        return this.fileDesc.url;
    }
    public get hasWorkingUrl(): boolean {
        return (this.workingUrl !== null);
    }
    public set hasWorkingUrl(s: boolean) { }
    public get isEditItem(): boolean {
        let p = this.currentItem;
        return (p !== null) && (p.id !== null) && (p.rev !== null);
    }
    public set isEditItem(s: boolean) { }
    public avatarFileChanged(event: any): any {
        this.fileDesc.changed(event);
    }// fileChanged
    public removeAvatar(): any {
        let p = this.currentItem;
        if (p === null) {
            return;
        }
        if ((p.id === null) || (p.rev === null)) {
            return;
        }
        let id = p.avatardocid();
        let avatarid = p.avatarid;
        if ((id === null) || (avatarid === null)) {
            return;
        }
        if (InfoRoot.confirm('Voulez-vous vraiment supprimer cet avatar?')) {
            let self = this;
            let service = this.dataService;
            let old = p;
            return service.remove_attachment(id, avatarid).then((r) => {
                p.avatarid = null;
                return service.maintains_item(p);
            }).then((x) => {
                old.avatarid = null;
                self.currentItem = old;
                self.fileDesc.clear();
                self.infoMessage = 'Avatar supprimé.';
            }).catch((err) => {
                self.set_error(err);
            });
        }
    }
    public saveAvatar(): any {
        let f = this.fileDesc;
        let p = this.currentItem;
        if ((f === null) || (p === null)) {
            return;
        }
        if ((p.id === null) || (p.rev === null) || (!f.is_storeable)) {
            return;
        }
        let id = p.avatardocid();
        if (id === null) {
            return;
        }
        let avatarid = f.name;
        let type = f.type;
        let data = f.data;
        if ((avatarid === null) || (type === null) || (data === null)) {
            return;
        }
        let service = this.dataService;
        this.clear_error();
        let self = this;
        return service.maintains_attachment(id, avatarid, data, type).then((r) => {
            p.avatarid = avatarid;
            return service.maintains_item(p);
        }).then((px) => {
            self.fileDesc.clear();
            self.infoMessage = 'Avatar modifié.';
        }).catch((err) => {
            self.set_error(err);
        });
    }// saveAvatar
    protected get oldItem(): T {
        return this._old_item;
    }
    protected set oldItem(s: T) {
        this._old_item = s;
    }
    protected get AddMode(): boolean {
        return this._add_mode;
    }
    protected set addMode(b: boolean) {
        this._add_mode = b;
    }
    public get canAdd(): boolean {
        return (!this.addMode);
    }
    public set canAdd(s: boolean) { }
    public addNew(): any {
        this.oldItem = this.currentItem;
        this.currentItem = this.create_item();
        this.addMode = true;
    }
    public get canCancel(): boolean {
        return this.addMode;
    }
    public cancel_add(): void {
        this.currentItem = this.oldItem;
        this.addMode = false;
    }
    public cancel(): void {
        this.cancel_add();
    }
    public get canRemove(): boolean {
        let x = this.currentItem;
        return (x !== null) && (x.id !== null) && (x.rev !== null);
    }
    public get canSave(): boolean {
        return this.is_storeable();
    }
    //
    public get modelItem(): T {
        if (this._item_model === null) {
            this._item_model = this.create_item();
        }
        return this._item_model;
    }
    public get currentItem(): T {
        if (this._current_item === null) {
            this._current_item = this.create_item();
        }
        return this._current_item;
    }
    public set currentItem(s: T) {
        this._current_item = (s !== undefined) ? s : this.create_item();
        this.fileDesc.clear();
        this.post_change_item();
    }
    public refresh(): Promise<any> {
        this.addMode = false;
        let model = this.modelItem;
        if (model === null) {
            this.warn('modelItem is NULL');
            return Promise.resolve(false);
        }
        let oldid = (this.currentItem !== null) ? this.currentItem.id : null;
        if (this.items.length > 0) {
            for (let elem of this.items) {
                let x = elem.url;
                if (x !== null) {
                    InfoRoot.revokeUrl(x);
                    elem.url = null;
                }
            }// elem
        }
        this.currentItem = null;
        this.items = null;
        let startKey = null;
        let endKey = null;
        let nbItems = this.allIds.length;
        let istart = this._current_page * this._page_size;
        if ((istart >= 0) && (istart < nbItems)) {
            startKey = this.allIds[istart];
        }
        let iend = istart + this._page_size - 1;
        if (iend >= nbItems) {
            iend = nbItems - 1;
        }
        if ((iend >= 0) && (iend < nbItems)) {
            endKey = this.allIds[iend];
        }
        if ((startKey === null) || (endKey === null)) {
           this.warn('REFRESH - null start or end keys');
            this.addNew();
            return Promise.resolve(true);
        }
        this.clear_error();
        var self = this;
        return this.dataService.get_items(model, startKey, endKey).then((rr) => {
            let rx = ((rr !== undefined) && (rr !== null)) ? rr : [];
            if (self.hasAvatars) {
                return self.retrieve_avatars(rx);
            } else {
                return rx;
            }
        }).then((dd: T[]) => {
            self.items = dd;
            let pSel = InfoRoot.sync_array(self.items, oldid);
            self.currentItem = pSel;
            return true;
        });
    }// refresh
    public get pageStatus(): string {
        let sRet: string = null;
        if (this.pagesCount > 1) {
            sRet = 'Page ' + this.currentPage + ' sur ' + this.pagesCount;
        }
        return sRet;
    }
    protected prepare_refresh(): void {
        this._data_ids = [];
        this._pages_count = 0;
        this._current_page = 0;
        this._current_item = this.create_item();
        this._items = [];
    }
    protected is_refresh(): boolean {
        return true;
    }
    public refreshAll(): Promise<any> {
        this.prepare_refresh();
        if (!this.is_refresh()) {
            return Promise.resolve(true);
        }
        let model = this.modelItem;
        let startKey = model.start_key();
        let endKey = model.end_key();
        let nc = this.itemsPerPage;
        let self = this;
        return this.dataService.get_ids(startKey, endKey).then((ids) => {
            self.allIds = ids;
            let nt = self.allIds.length;
            let np = Math.floor(nt / nc);
            if ((np * nc) < nt) {
                ++np;
                self.pagesCount = np;
            }
            self.update_title();
            return self.refresh();
        });
    }// refreshAll
    public save(): any {
        let item = this.currentItem;
        if (item === null) {
            return false;
        }
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
    public get hasItems(): boolean {
        return ((this._data_ids !== null) && (this._data_ids.length > 0));
    }
    public set hasItems(s: boolean) { }
    public get hasPages(): boolean {
        return (this.pagesCount > 1);
    }
    public set hasPages(s: boolean) { }
    public get pagesCount(): number {
        return this._pages_count;
    }
    public set pagesCount(s: number) {
        this._pages_count = ((s !== undefined) && (s !== null) && (s >= 0)) ? s : 0;
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
}// class BaseEditViewModel
