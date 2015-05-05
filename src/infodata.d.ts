// infodata.d.ts
//
export interface IAttachedDoc {
    id: string;
    name: string;
    mime_type?: string;
    data?: Blob;
    description?: string;
    keywords?: string[];
    text: string;
    //
    is_storeable: () => boolean;
} // interface IAttachedDoc
//
export interface IElementDesc {
    id: string;
    text: string;
    rev?: string;
    avatarid?: string;
    url?: string;
    isSelected?: boolean;
    description?: string;
    //
    is_storeable: () => boolean;
    to_map: (oMap: any) => void;
    toString: () => string;
    sort_func: (p1: IElementDesc, p2: IElementDesc) => number;
}// interface IElementDesc
//
export interface IBaseItem extends IElementDesc {
    type: () => string;
    base_prefix: () => string;
    start_key: () => string;
    end_key: () => string;
    create_id: () => string;
    //
    attachedDocs?: IAttachedDoc[];
    attachments?: any;
    avatardocid?: () => string;
}// interface IBaseItem
export interface IPerson extends IBaseItem {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    email?: string;
    phone?: string;
    roles: string[];
    //
    departementids?: string[];
    anneeids?: string[];
    semestreids?: string[];
    uniteids?: string[];
    matiereids?: string[];
    groupeids?: string[];
    enseignantids?: string[];
    etudiantids?: string[];
    affectationids?: string[];
    eventids?: string[];
    //
    reset_password: () => void;
    change_password: (ct: string) => void;
    check_password: (ct: string) => boolean;
    has_role: (r: string) => boolean;
    is_super: boolean;
    is_admin: boolean;
    is_prof: boolean;
    is_etud: boolean;
    //
    fullname: string;
} // interface IPerson
export interface IEtudiantPerson extends IPerson {
    dossier?: string;
    sexe?: string;
    birthDate?: Date;
    ville?: string;
    etablissement?: string;
    serieBac?: string;
    optionBac?: string;
    mentionBac?: string;
    etudesSuperieures?: string;
    //
    isMale?: boolean;
    isFeminin?: boolean;
}// interface IEtudiantPerson
export interface ISigleNameItem extends IBaseItem {
    sigle: string;
    name?: string;
}//interface ISigleNameItem
export interface IDepartement extends ISigleNameItem {

}// interface IDepartement
export interface IDepSigleNameItem extends ISigleNameItem {
    departementid: string;
}// interface IDepSigleNameItem
export interface IDepartementChildItem extends IBaseItem {
    departementid: string;
} // IDepartementChildItem
export interface IDepartementPerson extends IDepartementChildItem {
    personid: string;
    firstname: string;
    lastname: string;
    fullname: string;
    update_person: (pPers: IPerson) => void;
} // interface IDepartementPerson
export interface IEnseignant extends IDepartementPerson {

}// interface IEnseignant
export interface IAdministrator extends IDepartementPerson {

}// interface IAdministrator
export interface IEtudiant extends IDepartementPerson {

}// interface IEtudiant
export interface IGroupe extends IDepSigleNameItem {

}// interface IGroupe
export interface IUnite extends IDepSigleNameItem {

}// interface IUnite
export interface IMatiere extends IDepSigleNameItem {
    uniteid: string;
    genre?: string;
    mat_module?: string;
    coefficient?: number;
    ecs?: number;
} // interface IMatiere
export interface IIntervalItem extends IDepSigleNameItem {
    startDate: Date;
    endDate: Date;
} // interface IIntervalItem
export interface IAnnee extends IIntervalItem {

}// interface IAnnee
export interface ISemestre extends IIntervalItem {
    anneeid: string;
} // interface ISemestre
export interface IWorkItem extends IDepartementPerson {
    anneeid: string;
    semestreid: string;
    groupeid: string;
    eventDate?: Date;
    status?: string;
    genre?: string;
} // interface IWorkItem
export interface IAffectation extends IWorkItem {
    startDate?: Date;
    endDate?: Date;
}// IAffectationItem
export interface IProfAffectation extends IAffectation {
    enseignantid: string;
    uniteid: string;
    matiereid: string;
}// IProfAffectationItem
export interface IEtudAffectation extends IAffectation {
    etudiantid: string;
} // IEtudAffectation
export interface IGroupeEvent extends IWorkItem {
    profaffectationid: string;
    matiereid: string;
    name: string;
    location?: string;
    startTime?: Date;
    endTime?: Date;
    coefficient?: number;
} // IGroupeEvent
export interface IEtudEvent extends IWorkItem {
    groupeeventid: string;
    note: number;
}
export interface IItemFactory {
    create: (oMap: any) => IBaseItem;
}// interface IItemFcatory
//
export interface IObjectStore {
    get_value: (key: string) => string;
    store_value: (key: string, value: string) => any;
    remove_value: (key: string) => any;
}// interface IObjectStore
//
export interface IDatabaseManager {
    isOnline: () => Promise<boolean>;
    check_admin: () => Promise<any>;
    find_item_by_id: (id: string, bAttach?: boolean) => Promise<IBaseItem>;
    find_items_array: (ids: string[]) => Promise<IBaseItem[]>;
    maintains_item: (item: IBaseItem) => Promise<IBaseItem>;
    maintains_items: (items: IBaseItem[]) => Promise<IBaseItem[]>;
    remove_item: (item: IBaseItem) => Promise<any>;
    find_attachment: (docid: string, attachmentId: string) => Promise<Blob>;
    maintains_attachment: (docid: string, attachmentId: string,
    attachmentData: Blob, attachmentType: string) => Promise<any>;
    remove_attachment: (docid: string, attachmentId: string) => Promise<any>;
    get_all_items: (item: IBaseItem) => Promise<IBaseItem[]>;
    get_items: (item: IBaseItem, startKey?: string, endKey?: string) => Promise<IBaseItem[]>;
    get_ids: (startkey: string, endKey: string) => Promise<string[]>;
    maintains_workitem: (item: IWorkItem) => Promise<IBaseItem>;
    remove_all_items: (startKey: string, endKey: string) => Promise<any>;
}// IDatabaseManager
export interface IDataService extends IDatabaseManager {
    get_all_departements: () => Promise<IDepartement[]>;
    get_annee_semestres: (anneeid: string) => Promise<ISemestre[]>;
    get_unite_matieres: (uniteid: string) => Promise<IMatiere[]>;
    get_departement_annees: (depid: string) => Promise<IAnnee[]>;
    get_departement_unites: (depid: string) => Promise<IUnite[]>;
    get_departement_groupes: (depid: string) => Promise<IGroupe[]>;
    get_person_departements: (personid: string) => Promise<IDepartement[]>;
    find_person_by_username: (username: string) => Promise<IPerson>;
    get_etudaffectations: (semestreid: string, groupeid: string) => Promise<IEtudAffectation[]>;
    get_groupeevent_evts: (grpeventid: string, bNote?: boolean) => Promise<IEtudEvent[]>;
    get_groupeevent_all_notes: (grpeventid: string) => Promise<IEtudEvent[]>;
}
export interface IFileDesc {
    name: string;
    type: string;
    data: Blob;
    url: string;
    //
    is_storeable:boolean;
    clear: () => void;
    changed : (evt:any) => any;
}// interface IFileDesc
