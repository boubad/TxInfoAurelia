//inforoot.ts
//
import {IBaseItem} from './infodata.d';
//
declare var window: any;
//
const LOWERBOUNDUPPER = 'A'.charCodeAt(0);
const UPPERBOUNDUPPER = 'Z'.charCodeAt(0);
const HAS_WINDOW:boolean = (window !== undefined) && (window !== null);
const HAS_WINDOW_URL:boolean = (window !== undefined) && (window !== null)
    && (window.URL !== undefined) && (window.URL !== null);
const HAS_SESSION_STORE:boolean = (window !== undefined) && (window.sessionStorage !== undefined) &&
    (window.sessionStorage !== null);
const HAS_LOCAL_STORE:boolean = (window !== undefined) && (window !== null)
    && (window.localStorage !== undefined) && (window.localStorage !== null);
export const EMPTY_STRING: string = '';     
//
export class InfoRoot {
    //
    constructor() {
    }// constructor
    public static sessionStore_get(key: string): string {
        let vRet = null;
        if (HAS_SESSION_STORE && (key !== undefined) && (key !== null)) {
            let skey = key.trim().toLowerCase();
            if (skey.length > 0) {
                try {
                    vRet = window.sessionStorage.getItem(key);
                    if ((vRet !== null) && (vRet == 'null')) {
                        vRet = null;
                    }
                } catch (e) {
                    console.log(e.toString());
                }
            }
        }
        return vRet;
    }//sessionStore_get
    public static sessionStore_set(key: string, value: string): void {
        if (HAS_SESSION_STORE && (key !== undefined) && (key !== null)) {
            let skey = key.trim().toLowerCase();
            if (skey.length > 0) {
                let sval = ((value !== undefined) && (value !== null) && (value.trim().length > 0)) ?
                    value.trim() : null;
                try {
                    if (sval !== null) {
                        window.sessionStorage.setItem(skey, sval);
                    } else {
                        if (window.sessionStorage.getItem(skey)) {
                            window.sessionStorage.removeItem(skey);
                        }
                    }
                } catch (e) {
                    console.log(e.toString());
                }
            }// skey
        }// key
    }// sessionStore_set
    public static sessionStore_remove(key: string): void {
        if (HAS_SESSION_STORE && (key !== undefined) && (key !== null)) {
            let skey = key.trim().toLowerCase();
            if (skey.length > 0) {
                try {
                    if (window.sessionStorage.getItem(skey)) {
                        window.sessionStorage.removeItem(skey);
                    }
                } catch (e) {
                    console.log(e.toString());
                }
            }// skey
        }// key
    }// sessionStore_set
    public static check_name(s: string, bSpace?: boolean): string {
        let sRet: string = null;
        if ((s !== undefined) && (s !== null)) {
            let sx = s.trim().toUpperCase();
            let n = sx.length;
            sRet = '';
            let b = ((bSpace !== undefined) && (bSpace !== null)) ? bSpace : false;
            if (b) {
                for (let i = 0; i < n; ++i) {
                    let c = sx.charAt(i);
                    if (c != ' ') {
                        sRet = sRet + c;
                    }
                }// i
            } else {
                for (let i = 0; i < n; ++i) {
                    let c = sx.charCodeAt(i);
                    if ((c >= LOWERBOUNDUPPER) && (c <= UPPERBOUNDUPPER)) {
                        sRet = sRet + sx.charAt(i)
                    }
                }
            }
            if (sRet.length < 1) {
                sRet = null;
            }
        }// s
        return sRet;
    }// check_name
    public static create_random_id(): string {
        let n = Math.floor(Math.random() * 10000.0);
        let sn = '' + n;
        while (sn.length < 4) {
            sn = '0' + sn;
        }
        return sn;
    } // create_random_id
    public static create_date_random_id(seed?: Date): string {
        let sn = InfoRoot.create_random_id();
        let d = ((seed !== undefined) && (seed !== null)) ? seed : new Date();
        let s = d.toISOString() + '-' + sn;
        return s;
    } // create_date_random_id
    public static sync_array<T extends IBaseItem>(cont: T[], id: string): T {
        let pSel: T = null;
        if ((cont !== undefined) && (cont !== null) && (cont.length > 0)) {
            if ((id !== undefined) && (id !== null)) {
                for (let x of cont) {
                    if ((x !== null) && (x.id !== undefined) && (x.id == id)) {
                        pSel = x;
                        break;
                    }
                }// x
            }// id
            if (pSel === null) {
                pSel = cont[0];
            }
        }// cont
        return pSel;
    }// sync_departements
    public static add_id_to_array(cont: string[], id: string): void {
        if ((cont === undefined) || (cont === null) ||
            (id === undefined) || (id === null)) {
            return;
        }
        let bFound = false;
        for (let p of cont) {
            if (p == id) {
                bFound = true;
            }
        }// p
        if (!bFound) {
            cont.push(id);
        }
    }// add_id_to_array
    public static string_to_date(s: any): Date {
        let dRet: Date = null;
        if ((s !== undefined) && (s !== null)) {
            try {
                let t = Date.parse(s.toString());
                if (!isNaN(t)) {
                    dRet = new Date(t);
                }
            } catch (e) {
            }
        }
        return dRet;
    }
    public static date_to_string(d: Date): string {
        let sRet: string = null;
        if ((d !== undefined) && (d !== null)) {
            try {
                let t = Date.parse(d.toString());
                if (!isNaN(t)) {
                    let dd = new Date(t);
                    sRet = dd.toISOString().substr(0, 10);
                }
            } catch (e) { }
        }
        return sRet;
    }
    public static number_to_string(n: number): string {
        return ((n !== undefined) && (n !== null)) ? n.toString() : null;
    }
    public static string_to_number(s: any): number {
        let dRet: number = null;
        if ((s !== undefined) && (s !== null)) {
            try {
                let x = parseFloat(s);
                if (!isNaN(x)) {
                    dRet = x;
                }
            } catch (e) { }
        }// s
        return dRet;
    }
    public static confirm(message: string): boolean {
        if (HAS_WINDOW) {
            return window.confirm(message);
        } else {
            return false;
        }
    }
    public static createUrl(blob: Blob): string {
        let sRet: string = null;
        if (HAS_WINDOW_URL && (blob !== undefined) && (blob !== null)) {
            try {
                sRet = window.URL.createObjectURL(blob);
            } catch (e) {
                console.log(e.toString());
            }
        }
        return sRet;
    }
    public static revokeUrl(s: string): void {
        if (HAS_WINDOW_URL && (s !== undefined) && (s !== null)) {
            try {
                window.URL.revokeObjectURL(s);
            } catch (e) { }
        }
    }
    public static check_date(d: Date): Date {
        return InfoRoot.string_to_date(d);
    } // check_date
    public static check_number(s: any): number {
        return InfoRoot.string_to_number(s);
    }
}// class InfoRoot
