//dataservice.ts
//
import {IBaseItem, IDepartement, IAnnee, IUnite, IGroupe,ISemestre,IMatiere,
IPerson, IWorkItem, IProfAffectation, IEtudAffectation,
IGroupeEvent, IEtudEvent, IItemFactory, IDataService} from '../../infodata.d';
import {Person} from '../domain/person';
import {EtudAffectation} from '../domain/EtudAffectation';
import {EtudEvent} from '../domain/etudevent';
import {GroupeEvent} from '../domain/groupeevent';
import {EtudiantPerson} from '../domain/etudperson';
import {ItemFactory} from '../domain/itemfactory';
import {PouchDatabase} from './pouchdb/pouchdatabase';
import {Departement} from '../domain/departement';
import {Annee} from '../domain/annee';
import {Unite} from '../domain/unite';
import {Groupe} from '../domain/groupe';
import {Semestre} from '../domain/semestre';
import {Matiere} from '../domain/matiere';
//
export class DataService extends PouchDatabase implements IDataService {
    constructor(name?: string) {
        super(name);
    }// constructor
     public get_unite_matieres(uniteid: string): Promise<IUnite[]> {
        let m = new Matiere({ uniteid: uniteid });
        return this.get_all_items(m).then((rr: IMatiere[]) => {
            return rr;
        });
    }// get_unite_matieres
     public get_annee_semestres(anneeid: string): Promise<ISemestre[]> {
        let m = new Semestre({ anneeid: anneeid });
        return this.get_all_items(m).then((rr: ISemestre[]) => {
            return rr;
        });
    }// get_annee_semestres
    public get_departement_annees(depid: string): Promise<IAnnee[]> {
        let m = new Annee({ departementid: depid });
        return this.get_all_items(m).then((rr: IAnnee[]) => {
            return rr;
        });
    }// get_departement_annees
    public get_departement_unites(depid: string): Promise<IUnite[]> {
        let m = new Unite({ departementid: depid });
        return this.get_all_items(m).then((rr: IUnite[]) => {
            return rr;
        });
    }// get_departement_unites
    public get_departement_groupes(depid: string): Promise<IGroupe[]> {
        let m = new Groupe({ departementid: depid });
        return this.get_all_items(m).then((rr: IGroupe[]) => {
            return rr;
        });
    }// get_departement_groupes
    public get_person_departements(personid: string): Promise<IDepartement[]> {
        let self = this;
        let cont: string[] = null;
        return this.find_item_by_id(personid).then((pPers: IPerson) => {
            if (pPers !== null) {
                if (pPers.is_super) {
                    let m = new Departement();
                    return self.get_all_items(m).then((rr: IDepartement[]) => {
                        return rr;
                    });
                } else if ((pPers.departementids !== null) && (pPers.departementids.length > 0)) {
                    cont = pPers.departementids;
                }
            }// pPers
            if (cont !== null) {
                return self.find_items_array(cont).then((rr: IDepartement[]) => {
                    return rr;
                });
            } else {
                return [];
            }
        });
    }// get_person_departements
    public find_person_by_username(username: string): Promise<IPerson> {
        let id = 'PER-' + username.toLowerCase();
        return this.db.then((dx) => {
            return dx.get(id);
        }).then((pOld) => {
            if (pOld.type == 'etudperson') {
                return new EtudiantPerson(pOld);
            } else {
                return new Person(pOld);
            }
        }, (err) => {
                if (err.status == 404) {
                    return null;
                } else {
                    throw new Error(err.reason);
                }
            });
    }//find_person_by_username
    public get_etudaffectations(semestreid: string, groupeid: string): Promise<IEtudAffectation[]> {
        let model = new EtudAffectation({ semestreid: semestreid, groupeid: groupeid });
        return this.get_all_items(model).then((rr: IEtudAffectation[]) => {
            return rr;
        });
    }//get_etudaffectations
    public get_groupeevent_evts(grpeventid: string, bNote?: boolean): Promise<IEtudEvent[]> {
        let model = new EtudEvent({ groupeeventid: grpeventid });
        let m = ((bNote !== undefined) && (bNote !== null)) ? bNote : false;
        return this.get_all_items(model).then((aa: IEtudEvent[]) => {
            let pp: IEtudEvent[] = ((aa !== undefined) && (aa !== null)) ? aa : [];
            let oRet: IEtudEvent[] = [];
            for (let x of pp) {
                if (m) {
                    if (x.genre == 'note') {
                        oRet.push(x);
                    }
                } else if (x.genre != 'note') {
                    oRet.push(x);
                }
            }// x
            return oRet;
        });
    }//get_groupeevent_evts
    public get_groupeevent_all_notes(grpeventid: string): Promise<IEtudEvent[]> {
        let self = this;
        let depid: string = null;
        let anneeid: string = null;
        let uniteid: string = null;
        let semestreid: string = null;
        let groupeid: string = null;
        let eventDate: Date = null;
        let allevts: IEtudEvent[] = [];
        let xgenre: string = 'note';
        return this.find_item_by_id(grpeventid).then((gvt: IGroupeEvent) => {
            if ((gvt === undefined) || (gvt === null)) {
                throw new Error('Unknown groupeevent.');
            }
            eventDate = gvt.eventDate;
            return self.find_item_by_id(gvt.profaffectationid);
        }).then((praff: IProfAffectation) => {
            if ((praff === undefined) || (praff === null)) {
                throw new Error('Unkown profaffectation');
            }
            groupeid = praff.groupeid;
            semestreid = praff.semestreid;
            anneeid = praff.anneeid;
            depid = praff.departementid;
            let model = new EtudAffectation({

                semestreid: semestreid,
                groupeid: groupeid, anneeid: anneeid,
                departementid: depid

            });
            return self.get_all_items(model);
        }).then((affs: IEtudAffectation[]) => {
            let cont = ((affs !== undefined) && (affs !== null)) ?
                affs : [];
            for (let xaf of affs) {
                let x = new EtudEvent({
                    departementid: depid,
                    anneeid: anneeid,
                    semestreid: semestreid,
                    groupeid: groupeid,
                    personid: xaf.personid,
                    etudiantid: xaf.etudiantid,
                    etudaffectationid: xaf.id,
                    firstname: xaf.firstname,
                    lastname: xaf.lastname,
                    groupeeventid: grpeventid,
                    eventDate: eventDate,
                    genre: xgenre
                });
                allevts.push(x);
            }// xaff
            return self.get_groupeevent_evts(grpeventid, true);
        }).then((pp: IEtudEvent[]) => {
            for (let y of allevts) {
                let xid = y.personid;
                for (let z of pp) {
                    if ((z.genre == xgenre) && (z.personid == xid)) {
                        y.id = z.id;
                        y.rev = z.rev;
                        y.status = z.status;
                        y.note = z.note;
                        y.attachments = z.attachments;
                        y.attachedDocs = z.attachedDocs;
                        break;
                    }
                }// z
            }// y
            return allevts;
        });
    }//check_groupeevent_events
}// class DataSevice