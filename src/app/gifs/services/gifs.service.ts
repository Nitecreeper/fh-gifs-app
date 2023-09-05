import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GifsService {

    private _tagsHistory: string[] = [];
    private apiKey: string = 'rG3YC86bxQqm4Zi4jIUem1wQ8aUKAuaG';

    
    get tagsHistory(){
        return [...this._tagsHistory];
    }

    private organizeHistory(tag: string){
        tag = tag.toLowerCase();

        if ( this._tagsHistory.includes(tag)){
            this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
        }

        this._tagsHistory.unshift(tag);
        this._tagsHistory = this.tagsHistory.splice(0,10);
    }

    public async searchTag( tag: string): Promise<void>{

        if(tag.length === 0) return;

        this.organizeHistory(tag)

        fetch('https://api.giphy.com/v1/gifs/search?api_key=rG3YC86bxQqm4Zi4jIUem1wQ8aUKAuaG&q=Fortnite&limit=10')
            .then(resp => resp.json())
            .then(data => console.log(data));


        
    }

}