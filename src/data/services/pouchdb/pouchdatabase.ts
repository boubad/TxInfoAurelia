//pouchdatabase.ts
//
/// <reference path='../../../../typings/pouchdb/pouchdb.d.ts' />
/// <reference path='../../../infodata.d.ts' />
//
import {IBaseItem, IPerson, IWorkItem, IProfAffectation, IEtudAffectation,
IGroupeEvent, IEtudEvent, IItemFactory, IDatabaseManager} from '../../../infodata.d';
import {Person} from '../../domain/person';
import {EtudAffectation} from '../../domain/etudaffectation';
import {EtudEvent} from '../../domain/etudevent';
import {GroupeEvent} from '../../domain/groupeevent';
import {EtudiantPerson} from '../../domain/etudperson';
import {ItemFactory} from '../../domain/itemfactory';
import {DATABASE_NAME, PERSON_KEY, SUPER_USERNAME, SUPER_LASTNAME,
SUPER_FIRSTNAME, ROLE_SUPER, ROLE_ADMIN} from '../../../infoconstants';
//
declare var PouchDB: any;
//
const HAS_POUCHDB = (PouchDB !== undefined) && (PouchDB !== null);
//
export class PouchDatabase implements IDatabaseManager {
    private _gen: IItemFactory;
    private _db: PouchDB;
    public _url: string;
    //
    constructor(name?: string) {
        this._gen = new ItemFactory();
        this._db = null;
        this._url = ((name !== undefined) && (name !== null)) ? name : DATABASE_NAME;
    }// constructor
    public get url(): string {
        return this._url;
    }
    public set url(name: string) {
        this._db = null;
        this._url = ((name !== undefined) && (name !== null)) ? name : null;
    }
    protected get db(): Promise<PouchDB> {
        let self = this;
        return new Promise((resolve, reject) => {
            if (self._db !== null) {
                resolve(self._db);
            }
            else if (!HAS_POUCHDB) {
                reject(new Error('PouchDB is undefined.'));
            }
            else if (this.url === null) {
                reject(new Error('Null database uri'));
            } else {
                let xx = new PouchDB(self.url, (err, xdb) => {
                    if ((err !== undefined) && (err !== null)) {
                        reject(new Error(err.reason));
                    } else {
                        if ((xdb !== undefined) && (xdb !== null)) {
                            self._db = xdb;
                            resolve(xdb);
                        } else {
                            reject(new Error("Undefined database handle."));
                        }
                    }
                });
            }
        });
    }// db
    public isOnline(): Promise<boolean> {
        let self = this;
        return this.db.then((xdb) => {
            return ((xdb !== undefined) && (xdb !== null));
        });
    }// isOnline
    protected maintains_doc(doc: any): Promise<PouchUpdateResponse> {
        let xdb: PouchDB = null;
        return this.db.then((dx) => {
            xdb = dx;
            return xdb.get(doc._id, { attachments: true });
        }).then((pOld) => {
            doc._rev = pOld._rev;
            if ((pOld._attachments !== undefined) && (pOld._attachments !== null)) {
                doc._attachments = pOld._attachments;
            }
            return xdb.put(doc);
        }, (ex) => {
                if (ex.status == 404) {
                    return xdb.put(doc);
                } else {
                    throw new Error(ex.reason);
                }
            });
    }// maintains_doc
    public check_admin(): Promise<any> {
        let xdb: PouchDB = null;
        let pPers = new Person({
            username: SUPER_USERNAME,
            firstname: SUPER_FIRSTNAME,
            lastname: SUPER_LASTNAME,
            type: PERSON_KEY,
            roles: [ROLE_SUPER, ROLE_ADMIN]
        }
            );
        pPers.reset_password();
        let id = pPers.create_id();
        pPers.id = id;
        return this.db.then((dx) => {
            xdb = dx;
            return xdb.get(id);
        }).then((pOld) => {
            return { ok: true, id: pOld._id, rev: pOld._rev };
        }, (ex) => {
                if (ex.status != 404) {
                    throw new Error(ex.reason);
                }
                let oMap: any = {};
                pPers.to_map(oMap);
                return xdb.put(oMap);
            });
    }// check_admin
    public find_item_by_id(id: string, bAttach?: boolean): Promise<IBaseItem> {
        let options: PouchGetOptions = {};
        if ((bAttach !== undefined) && (bAttach !== null) && (bAttach == true)) {
            options.attachments = true;
        }
        let gen = this._gen;
        return this.db.then((dx) => {
            return dx.get(id);
        }).then((pOld) => {
            return gen.create(pOld);
        }, (err) => {
                if (err.status == 404) {
                    return null;
                } else {
                    throw new Error(err.reason);
                }
            });
    }//find_item_by_id
    public find_items_array(ids: string[]): Promise<IBaseItem[]> {
        let generator = this._gen;
        let options: PouchAllDocsOptions = { keys: ids, include_doc: true };
        return this.db.then((xdb) => {
            return xdb.allDocs(options).then((rr) => {
                let oRet: IBaseItem[] = [];
                if ((rr !== undefined) && (rr !== null)) {
                    let data = rr.rows;
                    if ((data !== undefined) && (data !== null)) {
                        for (let r of data) {
                            let val = r.value;
                            if ((val !== undefined) && (val !== null)) {
                                if ((val.deleted === undefined) && ((val.error === undefined) || (val.error === null))) {
                                    let x = generator.create(r.doc);
                                    if (x !== null) {
                                        oRet.push(x);
                                    }
                                }
                            }// val
                        }// r
                    }// data
                }// rr
                return oRet;
            });
        });
    }//get_items_array    
    public get_items(item: IBaseItem, startKey?: any, endKey?: any): Promise<IBaseItem[]> {
        let options: PouchGetOptions = { include_docs: true };
        if ((startKey !== undefined) && (startKey !== null)) {
            options.startkey = startKey;
        } else {
            options.startkey = item.start_key();
        }
        if ((endKey !== undefined) && (endKey !== null)) {
            options.endkey = endKey;
        } else {
            options.endkey = item.end_key();
        }
        let generator = this._gen;
        return this.db.then((xdb) => {
            return xdb.allDocs(options).then((rr) => {
                let oRet: IBaseItem[] = [];
                if ((rr !== undefined) && (rr !== null)) {
                    let data = rr.rows;
                    if ((data !== undefined) && (data !== null)) {
                        for (let r of data) {
                            let val = r.value;
                            if ((val !== undefined) && (val !== null)) {
                                let x = generator.create(r.doc);
                                if (x !== null) {
                                    oRet.push(x);
                                }
                            }// val
                        }// r
                    }// data
                }// rr
                if (oRet.length > 1) {
                    let x = oRet[0];
                    let func = x.sort_func;
                    oRet.sort(func);
                }
                return oRet;
            });
        });
    }// get_items
    public get_all_items(item: IBaseItem): Promise<IBaseItem[]> {
        let options: PouchGetOptions = {
            include_docs: true, startkey: item.start_key(), endkey: item.end_key()
        };
        let generator = this._gen;
        return this.db.then((xdb) => {
            return xdb.allDocs(options).then((rr) => {
                let oRet: IBaseItem[] = [];
                if ((rr !== undefined) && (rr !== null)) {
                    let data = rr.rows;
                    if ((data !== undefined) && (data !== null)) {
                        for (let r of data) {
                            let val = r.value;
                            if ((val !== undefined) && (val !== null)) {
                                let x = generator.create(r.doc);
                                if (x !== null) {
                                    oRet.push(x);
                                }
                            }// val
                        }// r
                    }// data
                }// rr
                if (oRet.length > 1) {
                    let x = oRet[0];
                    let func = x.sort_func;
                    oRet.sort(func);
                }
                return oRet;
            });
        });
    }// get_all_items
    public get_ids(startKey: string, endKey: string): Promise<string[]> {
        let options: PouchGetOptions = {
            startkey: startKey, endkey: endKey
        };
        return this.db.then((xdb) => {
            return xdb.allDocs(options).then((rr) => {
                let oRet: string[] = [];
                for (let r of rr.rows) {
                    let id = r.id;
                    oRet.push(id);
                }// r
                return oRet;
            });
        });
    }//get_ids
    public remove_all_items(startKey: string, endKey: string): Promise<any> {
        let self = this;
        let docs: any[] = [];
        let options: PouchGetOptions = {
            startkey: startKey, endkey: endKey, include_docs: true
        };
        let rdb: PouchDB = null;
        return this.db.then((xdb) => {
            rdb = xdb;
            return rdb.allDocs(options);
        }).then((dd) => {
            for (let x of dd.rows) {
                let d = x.doc;
                docs.push(d);
            }// x
            if (docs.length > 0) {
                return rdb.bulkDocs(docs);
            } else {
                return [];
            }
        });
    }//remove_all_items
    protected internal_maintains_one_item(xdb: PouchDB, item: IBaseItem): Promise<IBaseItem> {
        let oMap: any = {};
        item.to_map(oMap);
        if ((item.id === undefined) || (item.id === null)) {
            oMap._id = item.create_id();
        }
        let id = oMap._id;
        let generator = this._gen;
        return xdb.get(id, { attachments: true }).then((p) => {
            oMap._rev = p._rev;
            if ((p._attachments !== undefined) && (p._attachments !== null)) {
                oMap._attachments = p._attachments;
            }
            return xdb.put(oMap);
        }, (err) => {
                if (err.status != 404) {
                    throw new Error(err.reason);
                }
                return xdb.put(oMap);
            }).then((z) => {
            return xdb.get(id, { attachments: true });
        }).then((pk) => {
            return generator.create(pk);
        });
    }// maintains_one_item
    public maintains_item(item: IBaseItem): Promise<IBaseItem> {
        if (!item.is_storeable()){
            Promise.reject(new Error('Not storeable item.'));
        }
        let generator = this._gen;
        let xdb:PouchDB = null;
        let oMap:any = {};
        let id:string = null;
        return this.db.then((rdb)=>{
            xdb = rdb;
            item.to_map(oMap);
            if ((item.id === undefined) || (item.id === null)) {
                oMap._id = item.create_id();
            }
            id = oMap._id;
            return xdb.get(id,{attachments:true});
            }).then((p)=>{
                 oMap._rev = p._rev;
                if ((p._attachments !== undefined) && (p._attachments !== null)) {
                    oMap._attachments = p._attachments;
                    }
                return xdb.put(oMap);
                },(err)=>{
                    if (err.status != 404) {
                    throw new Error(err.reason);
                    }
                return xdb.put(oMap);
            }).then((z)=>{
                return xdb.get(id, { attachments: true });
            }).then((pk)=>{
                return generator.create(pk);
            });
    }// maintains_one_item
    public maintains_items(items: IBaseItem[]): Promise<IBaseItem[]> {
        let self = this;
        return this.db.then((xdb) => {
            let pp = [];
            for (let item of items) {
                var p = self.internal_maintains_one_item(xdb, item);
                pp.push(p);
            }// item
            return Promise.all(pp);
        });
    }// maintains_items
    public remove_item(item: IBaseItem): Promise<PouchUpdateResponse> {
        let xdb: PouchDB = null;
        let id = item.id;
        return this.db.then((d) => {
            xdb = d;
            return xdb.get(id);
        }).then((p) => {
            return xdb.remove(p);
        });
    }// remove_one_item
    public find_attachment(docid: string, attachmentId: string): Promise<Blob> {
        return this.db.then((xdb) => {
            return xdb.getAttachment(docid, attachmentId);
        }).then((p) => {
            return p;
        }, (err) => {
                if (err.status == 404) {
                    return null;
                } else {
                    throw new Error(err.reason);
                }
            });
    }// find_attachment
    public maintains_attachment(docid: string, attachmentId: string,
        attachmentData: Blob, attachmentType: string): Promise<PouchUpdateResponse> {
        let xdb = null;
        return this.db.then((d) => {
            xdb = d;
            return xdb.get(docid);
        }).then((p) => {
            return xdb.putAttachment(p._id, attachmentId, p._rev, attachmentData, attachmentType);
        });
    }// maintains_attachment
    public remove_attachment(docid: string, attachmentId: string): Promise<PouchUpdateResponse> {
        let xdb = null;
        return this.db.then((d) => {
            xdb = d;
            return xdb.get(docid);
        }).then((p) => {
            return xdb.removeAttachment(p._id, attachmentId, p._rev);
        });
    }// maintains_attachment
    public maintains_workitem(item: IWorkItem): Promise<IBaseItem> {
        if ((item.personid === undefined) || (item.personid === null)) {
            return this.maintains_item(item);
        }
        let pid = item.personid;
        let self = this;
        return this.find_item_by_id(pid).then((pPers: IPerson) => {
            if (pPers === null) {
                throw new Error('unknown person.');
            }
            if (item.id === null) {
                item.id = item.create_id();
            }
            item.update_person(pPers);
            return self.maintains_item(pPers);
        }).then((x) => {
            return self.maintains_item(item);
        });
    }// maintains_workitem
}// class PouchDatabase
