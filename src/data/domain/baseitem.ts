//baseitem.ts
//
//
import {IBaseItem, IAttachedDoc} from '../../infodata.d';
import {ElementDesc} from './elementdesc';
//
export class BaseItem extends ElementDesc implements IBaseItem {
    //
    private _attachments: any = null;
    private _attachedDocs: IAttachedDoc[] = null;
    //
    constructor(oMap?: any) {
        super(oMap);
        if ((oMap !== undefined) && (oMap !== null)) {
            if ((oMap._attachments !== undefined) && (oMap._attachments !== null)) {
                this.attachments = oMap._attachments;
            }
            if ((oMap.attachedDocs !== undefined) && (oMap.attachedDocs !== null)) {
                this.attachedDocs = oMap.attachedDocs;
            }
        }// oMap
    }// constructor
    public get attachments(): any {
        return this._attachments;
    }
    public set attachments(s: any) {
        this._attachments = (s !== undefined) ? s : null;
    }
    public get attachedDocs(): IAttachedDoc[] {
        return this._attachedDocs;
    }
    public set attachedDocs(s: IAttachedDoc[]) {
        this._attachedDocs = ((s !== undefined) && (s !== null)) ? s : null;
    }
    //
    public is_storeable(): boolean {
        return super.is_storeable() && (this.type() !== null) && (this.base_prefix() !== null);
    }
    public to_map(oMap: any): void {
        super.to_map(oMap);
        oMap.type = this.type();
        if (this.attachments !== null) {
            oMap._attachments = this.attachments;
        }
        if (this.attachedDocs !== null) {
            oMap.attachedDocs = this.attachedDocs;
        }
        //console.log('BaseItem to map ' + JSON.stringify(oMap));
    }// toMap
    //
    public type(): string {
        return null;
    }
    public base_prefix(): string {
        return null;
    }
    public start_key(): string {
        return this.base_prefix();
    }
    public end_key(): string {
        let s = this.start_key();
        if (s !== null) {
            s = s + '\uffff';
        }
        return s;
    }
    public create_id(): string {
        return null;
    }
    //
    public avatardocid(): string {
        return this.id;
    }
}// class IBaseItem
