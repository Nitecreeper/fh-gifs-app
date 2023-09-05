import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
    providedIn: 'root'
})
export class GifsService {

    public gifList: Gif[] = [];
    private _tagsHistory: string[] = [];
    private apiKey: string = 'rG3YC86bxQqm4Zi4jIUem1wQ8aUKAuaG';
    private serviceUrl: string = 'https://api.giphy.com/v1/gifs';
    private _limit: number = 8;
    private localStorageKey = 'history';

    constructor( private http: HttpClient){
        this.loadLocalStorage();
        console.warn(' *** Gifs Service Ready *** ');
    }
    
    get tagsHistory(){
        return [...this._tagsHistory];
    }

    set limit(limit: number){
        this._limit = limit;
    }

    private organizeHistory(tag: string): void{
        tag = tag.toLowerCase();

        if ( this._tagsHistory.includes(tag)){
            this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
        }

        this._tagsHistory.unshift(tag);
        this._tagsHistory = this.tagsHistory.splice(0,10);
        this.saveLocalStorage();
    }

    private saveLocalStorage(): void{
        localStorage.setItem(this.localStorageKey, JSON.stringify(this._tagsHistory));
    }

    private loadLocalStorage(): void{
        if(!localStorage.getItem(this.localStorageKey)){
            return;
        }

        this._tagsHistory = JSON.parse(localStorage.getItem(this.localStorageKey)!);

        if( this._tagsHistory.length === 0 ){
            console.log('Empty localStorage');
            return;            
        }

        console.log('localStorage loaded: ', this._tagsHistory);
        this.searchTag(this._tagsHistory[0]);
        
    }

    public searchTag( tag: string): void{

        if(tag.length === 0) return;

        this.organizeHistory(tag)

        const params = new HttpParams()
            .set('api_key', this.apiKey)
            .set('q', tag)
            .set('limit', this._limit.toString())

        this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params})
            .subscribe( (resp) => {
                this.gifList = resp.data;
                console.log({gifs: this.gifList});
                
            });
        
    }

    public clearHistory(): void{
        this._tagsHistory = [];
        this.saveLocalStorage();
    }

}