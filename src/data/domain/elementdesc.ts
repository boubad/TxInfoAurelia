//elementdesc.ts
//
import {IElementDesc} from '../../infodata.d';
//
export class ElementDesc implements IElementDesc {
    //
    private _id: string;
    private _text: string;
    private _rev: string;
    private _avatarid: string;
    private _url: string;
    private _selected: boolean;
    private _description: string;
    //
    constructor(oMap?: any) {
        if ((oMap !== undefined) && (oMap !== null)) {
            if (oMap.id !== undefined) {
                this.id = oMap.id;
            }
            if (oMap._id !== undefined) {
                this.id = oMap._id;
            }
            if (oMap.text !== undefined) {
                this.text = oMap.text;
            }
            if (oMap.rev !== undefined) {
                this.rev = oMap.rev;
            }
            if (oMap._rev !== undefined) {
                this.rev = oMap._rev;
            }
            if (oMap.description !== undefined) {
                this.description = oMap.description;
            }
            if (oMap.avatarid !== undefined) {
                this.avatarid = oMap.avatarid;
            }
            if (oMap.url !== undefined) {
                this.url = oMap.url;
            }
        }// oMap
    }// constructor
    public to_map(oMap: any): void {
        if (this.id !== null) {
            oMap._id = this.id;
        }
        if (this.rev !== null) {
            oMap._rev = this._rev;
        }
        if (this.description !== null) {
            oMap.description = this.description;
        }
        if (this.avatarid !== null) {
            oMap.avatarid = this.avatarid;
        }
    }// toMap
    public is_storeable(): boolean {
        return true;
    }
    public get id(): string {
        return (this._id !== undefined) ? this._id : null;
    }
    public set id(s: string) {
        this._id = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
            s.trim() : null;
    }
    public get rev(): string {
        return (this._rev !== undefined) ? this._rev : null;
    }
    public set rev(s: string) {
        this._rev = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
            s.trim() : null;
    }
    public get text(): string {
        if ((this._text !== undefined) && (this._text !== null)) {
            return this._text;
        }
        return this.toString();
    }
    public set text(s: string) {
        this._text = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
            s.trim() : null;
    }
    public get avatarid(): string {
        return (this._avatarid !== undefined) ? this._avatarid : null;
    }
    public set avatarid(s: string) {
        this._avatarid = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
            s.trim() : null;
    }
    public get url(): string {
        return (this._url !== undefined) ? this._url : null;
    }
    public set url(s: string) {
        this._url = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
            s.trim() : null;
    }
    public get description(): string {
        return (this._description !== undefined) ? this._description : null;
    }
    public set description(s: string) {
        this._description = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
            s.trim() : null;
    }
    public get isSelected(): boolean {
        return ((this._selected !== undefined) && (this._selected !== null)) ? this._selected : false;
    }
    public set isSelected(s: boolean) {
        this._selected = s;
    }
    public sort_func(p1: IElementDesc, p2: IElementDesc): number {
        let s1 = p1.text;
        let s2 = p2.text;
        if ((s1 !== null) && (s2 !== null)) {
            return s1.localeCompare(s2);
        } else if ((s1 === null) && (s2 !== null)) {
            return 1;
        } else if ((s1 !== null) && (s2 === null)) {
            return -1;
        } else {
            return 0;
        }
    }// sort_func
    public toString(): string {
        return this.id;
    }
}// class ElementDesc
