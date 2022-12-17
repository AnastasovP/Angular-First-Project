import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IRecipe } from '../shared/interfaces/recipe';

const API_URL = environment.apiURL;
@Injectable()
export class RecipeService {


  constructor(private http: HttpClient) {
  }

  
  loadRecipes() {
    return this.http.get<IRecipe[]>(`${API_URL}/post`, { withCredentials: true });
  }

  loadCurrentRecipe(id: string) {
    return this.http.get<IRecipe>(`${API_URL}/post/${id}`, { withCredentials: true }); //`${API_URL}/post/` + id
  }


  postRecipe(data: { name: string, description: string, imageUrl: string, ingredients: string, category: string, owner: string }) {
    return this.http.post<IRecipe>(`${API_URL}/post/create`, data, { withCredentials: true });
  };

  editRecipe(id: any, data: {}) {
    return this.http.put<IRecipe>(`${API_URL}/post/${id}`, data, { withCredentials: true });
  }

  deleteRecipe(id: string) {
    return this.http.get<IRecipe>(`${API_URL}/post/delete/${id}`, { withCredentials: true });
  }

  like(data: {}) {
    return this.http.post<IRecipe>(`${API_URL}/post/like`, { data }, { withCredentials: true });
  }

  loadUserRecipes(id: string) {
    return this.http.get<IRecipe>(`${API_URL}/post/profile/${id}`, { withCredentials: true });
  }
  
}
