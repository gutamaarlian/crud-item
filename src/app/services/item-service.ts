
import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import { Item } from '../constants/item';



@Injectable({
    providedIn : 'root'
})

export class ItemService{
    private BASE_URL = "https://5d60ae24c2ca490014b27087.mockapi.io/api/v1/";
    constructor(private http: HttpClient){
        
    }

    
    getItems(){ //get All Country
        return this.http.get<Item[]>(`${this.BASE_URL}/items`);
    }

    updateItem(item){ //get All Country
        return this.http.put(`${this.BASE_URL}/items/${item.id}`, item);
    }

    addItem(item){ //get All Country
        return this.http.post(`${this.BASE_URL}/items/`, item);
    }

    deleteItem(item){ //get All Country
        return this.http.delete(`${this.BASE_URL}/items/${item.id}`);
    }


}