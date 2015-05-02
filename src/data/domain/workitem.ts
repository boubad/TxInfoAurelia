//workitem.ts
//
import {IWorkItem, IPerson} from '../../infodata.d';
import {DepartementPerson} from './depperson';
import {InfoRoot} from '../../inforoot';
//
export class WorkItem extends DepartementPerson
    implements IWorkItem {
    private _annee: string;
    private _sem: string;
    private _groupe: string;
    private _date: Date;
    public _status: string;
    public _genre: string;
    //
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.anneeid !== undefined) {
                this.anneeid = oMap.anneeid;
            }
            if (oMap.semestreid !== undefined) {
                this.semestreid = oMap.semestreid;
            }
            if (oMap.groupeid !== undefined) {
                this.groupeid = oMap.groupeid;
            }
            if (oMap.eventDate !== undefined) {
                this.eventDate = oMap.eventDate;
            }
            if (oMap.status !== undefined) {
                this.status = oMap.status;
            }
            if (oMap.genre !== undefined) {
                this.genre = oMap.genre;
            }
        } // oMap
    } // constructor
    public get eventDate(): Date {
        return (this._date !== undefined) ? this._date : null;
    }
    public set eventDate(d: Date) {
        this._date = InfoRoot.check_date(d);
    }
    public get anneeid(): string {
        return (this._annee !== undefined) ? this._annee : null;
    }
    public set anneeid(s: string) {
        this._annee = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
            s.trim() : null;
    }
    public get semestreid(): string {
        return (this._sem !== undefined) ? this._sem : null;
    }
    public set semestreid(s: string) {
        this._sem = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
            s.trim() : null;
    }
    public get groupeid(): string {
        return (this._groupe !== undefined) ? this._groupe : null;
    }
    public set groupeid(s: string) {
        this._groupe = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
            s.trim() : null;
    }
    public get genre(): string {
        return (this._genre !== undefined) ? this._genre : null;
    }
    public set genre(s: string) {
        this._sem = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
            s.trim().toUpperCase() : null;
    }
    public get status(): string {
        return (this._status !== undefined) ? this._status : null;
    }
    public set status(s: string) {
        this._status = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
            s.trim().toUpperCase() : null;
    }
    public update_person(pPers: IPerson): void {
        if ((pPers !== undefined) && (pPers !== null)) {
            super.update_person(pPers);
            if (this.anneeid !== null) {
                let cont: string[] = pPers.anneeids;
                if (cont === null) {
                    cont = [];
                }
                InfoRoot.add_id_to_array(cont, this.anneeid);
                pPers.anneeids = cont;
            }
            if (this.semestreid !== null) {
                let cont: string[] = pPers.semestreids;
                if (cont === null) {
                    cont = [];
                }
                InfoRoot.add_id_to_array(cont, this.semestreid);
                pPers.semestreids = cont;
            }
            if (this.groupeid !== null) {
                let cont: string[] = pPers.groupeids;
                if (cont === null) {
                    cont = [];
                }
                InfoRoot.add_id_to_array(cont, this.groupeid);
                pPers.groupeids = cont;
            }
        }// pPers
    }// update_person
    public start_key(): string {
        let s = this.base_prefix();
        if ((s !== null) && (this.semestreid !== null)) {
            s = s + '-' + this.semestreid;
        }
        if ((s !== null) && (this.groupeid !== null)) {
            s = s + '-' + this.groupeid;
        }
        return s;
    }
    public is_storeable(): boolean {
        return super.is_storeable() && (this.anneeid !== null) &&
            (this.semestreid !== null) && (this.groupeid !== null);
    }
    public to_map(oMap: any): void {
        super.to_map(oMap);
        if (this.anneeid !== null) {
            oMap.anneeid = this.anneeid;
        }
        if (this.semestreid !== null) {
            oMap.semestreid = this.semestreid;
        }
        if (this.groupeid !== null) {
            oMap.groupeid = this.groupeid;
        }
        if (this.eventDate !== null) {
            oMap.eventDate = this.eventDate;
        }
        if (this.status !== null) {
            oMap.status = this.status;
        }
        if (this.genre !== null) {
            oMap.genre = this.genre;
        }
    } // toInsertMap
}