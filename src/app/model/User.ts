import { ResponseToken } from "../service/UserAuthentication.service";

export class User{
    constructor(private _responseToken: ResponseToken,private _username: string){
        this._responseToken = _responseToken;
        this._username = _username;
    }
    public get username(): string {
        return this._username;
    }
    public set username(value: string) {
        this._username = value;
    }
    public get responseToken(): ResponseToken {
        return this._responseToken;
    }
    public set responseToken(value: ResponseToken) {
        this._responseToken = value;
    }
    
}