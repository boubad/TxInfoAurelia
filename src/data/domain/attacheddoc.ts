//attacheddoc.ts
//
//
import {IAttachedDoc} from '../../infodata.d';
//
export class AttachedDoc implements IAttachedDoc {
    //
    private _id: string;
    private _name: string;
    private _mime_type: string;
    private _data: Blob;
    private _description: string;
    private _keywords: string[];
    //
    constructor(oMap?: any) {

    }// constructor
    public get id(): string {
        return (this._id !== undefined) ? this._id : null;
    }
    public set id(s: string) {
        this._id = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
            s.trim() : null;
    }
    public get name(): string {
        return (this._name !== undefined) ? this._name : null;
    }
    public set name(s: string) {
        this._name = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
            s.trim() : null;
    }
    public get mime_type(): string {
        return (this._mime_type !== undefined) ? this._mime_type : null;
    }
    public set mime_type(s: string) {
        this._mime_type = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
            s.trim() : null;
    }
    public get data(): Blob {
        return (this._data !== undefined) ? this._data : null;
    }
    public set data(s: Blob) {
        this._data = (s !== undefined) ? s : null;
    }
    public get description(): string {
        return (this._description !== undefined) ? this._description : null;
    }
    public set description(s: string) {
        this._description = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
            s.trim() : null;
    }
    public get keywords(): string[] {
        return (this._keywords !== undefined) ? this._keywords : null;
    }
    public set keywords(s: string[]) {
        this._keywords = ((s !== undefined) && (s !== null) && (s.length > 0)) ?
            s : null;
    }
    //
    public is_storeable(): boolean {
        return (this.id !== null) && (this.mime_type !== null) && (this.data !== null);
    }// is_storeable
    public toString(): string {
        return (this.name !== null) ? this.name : this.id;
    }
    public get text(): string {
        return this.toString();
    }
    public set text(s: string) { }
    //
}// class AttachedDoc