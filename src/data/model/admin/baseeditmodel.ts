//baseeditmodel.ts
//
//
import {UserInfo} from '../userinfo';
import {IBaseItem, IFileDesc, IDepartement, IAnnee, IUnite,
ISemestre, IMatiere, IGroupe} from '../../../infodata.d';
import {InfoRoot} from '../../../inforoot';
import {FileDesc} from '../../domain/filedesc';
import {BaseViewModel} from '../baseviewmodel';
//
export class BaseEditViewModel<T extends IBaseItem> extends BaseViewModel {
    //
    public items: T[];
    //
    protected _add_mode: boolean;
    protected _page_size: number;
    protected _current_page: number;
    protected _pages_count: number;
    protected _data_ids: string[];
    private _current_item: T;
    private _old_item: T;
    private _item_model: T;
    protected  hasAvatars: boolean;
    private _pageStatus: string;
    private _fileDesc: IFileDesc;
    private _avatar_file: string;
    //
    private _departements: IDepartement[];
    private _departement: IDepartement;
    private _annees: IAnnee[];
    private _annee: IAnnee;
    private _unites: IUnite[];
    private _unite: IUnite;
    private _semestres: ISemestre[];
    private _semestre: ISemestre;
    private _matieres: IMatiere[];
    private _matiere: IMatiere;
    private _groupes: IGroupe[];
    private _groupe: IGroupe;
    //
    constructor(userinfo: UserInfo) {
        super(userinfo);
        this._item_model = null;
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
        this._fileDesc = null;
        //
        this._departements = null;
        this._departement = null;
        this._unites = null;
        this._unite = null;
        this._matieres = null;
        this._matiere = null;
        this._annees = null;
        this._annee = null;
        this._semestres = null;
        this._semestre = null;
        this._groupes = null;
        this._groupe = null;
    }// constructor
    //
    public canActivate(params?: any, config?: any, instruction?: any): any {
        let px = this.userInfo.person;
        return (px !== null) && px.is_admin;
    }// activate
    //
    public activate(params?: any, config?: any, instruction?: any): any {
        let self = this;
        if ((this._item_model === undefined) || (this._item_model === null)) {
            this._item_model = this.create_item();
        }
        return super.activate(params, config, instruction).then((r) => {
            return self.initialize_data();
        }).then((xx) => {
            self.refreshAll();
        })
    }// activate
    //
    protected initialize_data(): Promise<any> {
        let self = this;
        let userinfo = this.userInfo;
        return userinfo.departements.then((dd) => {
            self._departements = ((dd !== undefined) && (dd !== null)) ? dd : [];
            let id = self.userInfo.departementid;
            let p = InfoRoot.sync_array(self.departements, id);
            self.departement = p;
            return true;
        });
    }// initialize_data
    protected create_item(): T {
        return null;
    }
    protected post_change_departement(): Promise<any> {
        return Promise.resolve(true);
    }
    protected post_change_unite(): Promise<any> {
        return Promise.resolve(true);
    }
    protected post_change_annee(): Promise<any> {
        return Promise.resolve(true);
    }
    protected post_change_groupe(): Promise<any> {
        return Promise.resolve(true);
    }
    protected post_change_semestre(): Promise<any> {
        return Promise.resolve(true);
    }
    protected post_change_matiere(): Promise<any> {
        return Promise.resolve(true);
    }
    //
    public get departements(): IDepartement[] {
        return (this._departements !== null) ? this._departements : [];
    }
    public get departement(): IDepartement {
        return this._departement;
    }
    public set departement(s: IDepartement) {
        this._departement = (s !== undefined) ? s : null;
        let id = (this.departement !== null) ? this.departement.id : null;
        this.userInfo.departementid = id;
        this._unites = null;
        this._unite = null;
        this._groupes = null;
        this._groupe = null;
        this._annees = null;
        this._annee = null;
        this._semestres = null;
        this._semestre = null;
        this._matieres = null;
        this._matiere = null;
        let self = this;
        let userinfo = this.userInfo;
        userinfo.annees.then((aa) => {
            self._annees = ((aa !== undefined) && (aa !== null)) ? aa : [];
            return userinfo.unites;
        }).then((uu) => {
            self._unites = ((uu !== undefined) && (uu !== null)) ? uu : [];
            return userinfo.groupes;
        }).then((gg) => {
            self._groupes = ((gg !== undefined) && (gg !== null)) ? gg : [];
            return self.post_change_departement();
        });
    }
    public get departementid(): string {
        return (this.departement !== null) ? this.departement.id : null;
    }
    //
    public get annees(): IAnnee[] {
        return (this._annees !== null) ? this._annees : [];
    }
    public get annee(): IAnnee {
        return this._annee;
    }
    public set annee(s: IAnnee) {
        this._annee = (s !== undefined) ? s : null;
        let id = (this.annee !== null) ? this.annee.id : null;
        this.userInfo.anneeid = id;
        this._semestres = null;
        this._semestre = null;
        let self = this;
        let userinfo = this.userInfo;
        userinfo.semestres.then((mm) => {
            self._semestres = ((mm !== undefined) && (mm !== null)) ? mm : [];
            return self.post_change_annee();
        });
    }
    public get anneeid(): string {
        return (this.annee !== null) ? this.annee.id : null;
    }
    //
    public get unites(): IUnite[] {
        return (this._unites !== null) ? this._unites : [];
    }
    public get unite(): IUnite {
        return this._unite;
    }
    public set unite(s: IUnite) {
        this._unite = (s !== undefined) ? s : null;
        let id = (this.unite !== null) ? this.unite.id : null;
        this.userInfo.uniteid = id;
        this._matieres = null;
        this._matiere = null;
        let self = this;
        let userinfo = this.userInfo;
        userinfo.matieres.then((mm) => {
            self._matieres = ((mm !== undefined) && (mm !== null)) ? mm : [];
            return self.post_change_unite();
        });
    }
    public get uniteid(): string {
        return (this.unite !== null) ? this.unite.id : null;
    }
    //
    public get semestres(): ISemestre[] {
        return (this._semestres !== null) ? this._semestres : [];
    }
    public get semestre(): ISemestre {
        return this._semestre;
    }
    public set semestre(s: ISemestre) {
        this._semestre = (s !== undefined) ? s : null;
        let id = (this.semestre !== null) ? this.semestre.id : null;
        this.userInfo.semestreid = id;
        this.post_change_semestre();
    }
    public get semestreid(): string {
        return (this.semestre !== null) ? this.semestre.id : null;
    }
    //
    public get groupes(): IGroupe[] {
        return (this._groupes !== null) ? this._groupes : [];
    }
    public get groupe(): IGroupe {
        return this._groupe;
    }
    public set groupe(s: IGroupe) {
        this._groupe = (s !== undefined) ? s : null;
        let id = (this.groupe !== null) ? this.groupe.id : null;
        this.userInfo.groupeid = id;
        this.post_change_groupe();
    }
    public get groupeid(): string {
        return (this.groupe !== null) ? this.groupe.id : null;
    }
    //
    public get matieres(): IMatiere[] {
        return (this._matieres !== null) ? this._matieres : [];
    }
    public get matiere(): IMatiere {
        return this._matiere;
    }
    public set matiere(s: IMatiere) {
        this._matiere = (s !== undefined) ? s : null;
        let id = (this.matiere !== null) ? this.matiere.id : null;
        this.userInfo.matiereid = id;
        this.post_change_matiere();
    }
    public get matiereid(): string {
        return (this.matiere !== null) ? this.matiere.id : null;
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
        if ((this._fileDesc === undefined) || (this._fileDesc === null)) {
            this._fileDesc = new FileDesc();
        }
        return this._fileDesc;
    }
    public get avatarUrl(): string {
        return ((this._avatar_file !== undefined) || (this._avatar_file !== null)) ?
            this._avatar_file : null;
    }
    public set avatarUrl(s: string) {
        let old = ((this._avatar_file !== undefined) || (this._avatar_file !== null)) ?
            this._avatar_file : null;
        if (old !== null) {
            InfoRoot.revokeUrl(old);
        }
        this._avatar_file = s;
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
    public get canSaveAvatar(): boolean {
        let x = this.fileDesc;
        let p = this.currentItem;
        return (x !== null) && x.is_storeable && (p !== null) &&
            (p.id !== null) && (p.rev !== null);
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
    public get canAdd(): boolean {
        return (!this._add_mode);
    }
    public set canAdd(s: boolean) { }
    public addNew(): any {
        this._old_item = this.currentItem;
        this.currentItem = this.create_item();
        this._add_mode = true;
    }
    public get canCancel(): boolean {
        return this._add_mode;
    }
    public cancel_add(): void {
        this.currentItem = this._old_item;
        this._add_mode = false;
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
        if ((this._item_model === undefined) || (this._item_model === null)) {
            this._item_model = this.create_item();
        }
        return this._item_model;
    }
    public get currentItem(): T {
        if ((this._current_item === undefined) || (this._current_item === null)) {
            this._current_item = this.create_item();
        }
        return this._current_item;
    }
    public set currentItem(s: T) {
        this._current_item = s;
        this.fileDesc.clear();
        this.post_change_item();
    }
    public refresh(): Promise<any> {
        let model = this.modelItem;
        if (model === null) {
            return Promise.resolve(false);
        }
        let oldid = (this.currentItem !== null) ? this.currentItem.id : null;
        if ((this.items === undefined) || (this.items === null)) {
            this.items = [];
        }
        if (this.items.length > 0) {
            for (let elem of this.items) {
                let x = elem.url;
                if (x !== null) {
                    InfoRoot.revokeUrl(x);
                    elem.url = null;
                }
            }// elem
        }
        this.items = [];
        this.currentItem = null;
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
            this.addNew();
            return Promise.resolve(true);
        }
        this.clear_error();
        var self = this;
        // console.log('REFRESH STARTKEY: ' + startKey + " ENDKEY: " + endKey);
        return this.dataService.get_items(model, startKey, endKey).then((rr) => {
            let rx = ((rr !== undefined) && (rr !== null)) ? rr : [];
            //    console.log('LENGTH 0: ' + rx.length);
            self._add_mode = false;
            if (self.hasAvatars) {
                return self.retrieve_avatars(rx);
            } else {
                return rx;
            }
        }).then((dd: T[]) => {
            self.items = ((dd !== undefined) && (dd !== null)) ? dd : [];
            //  console.log('LENGTH: ' + self.items.length);
            let pSel = InfoRoot.sync_array(self.items, oldid);
            self.currentItem = pSel;
            /*
                if (pSel !== null){
                let oMap: any = {};
                pSel.to_map(oMap);
                console.log('SELECTED: ' + JSON.stringify(oMap));
                } else {
                    console.log('SELECTED: NULL');
                }
                */
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
    public refreshAll(): Promise<any> {
        this._data_ids = [];
        this._pages_count = 0;
        this._current_page = 0;
        this._current_item = null;
        let model = this.modelItem;
        if (model === null) {
            return Promise.resolve(false);
        }
        this._data_ids = [];
        let startKey = model.start_key();
        let endKey = model.end_key();
        let nc = this._page_size;
        let self = this;
        // console.log('REFRESH_ALL STARTKEY: ' + startKey + " ENDKEY: " + endKey);
        return this.dataService.get_ids(startKey, endKey).then((ids) => {
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
    public get hasItems(): boolean {
        return (this._data_ids.length > 0);
    }
    public set hasItems(s: boolean) { }
    public get hasPages(): boolean {
        return (this.pagesCount > 1);
    }
    public set hasPages(s: boolean) { }
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
}// class BaseEditViewModel
