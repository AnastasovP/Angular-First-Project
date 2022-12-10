import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IProgram } from '../shared/interfaces/program';

const API_URL = environment.apiURL;
@Injectable()
export class ProgramService {


  constructor(private http: HttpClient) {
  }

  
  loadPrograms() {
    return this.http.get<IProgram[]>(`${API_URL}/post`, { withCredentials: true });
  }

  loadCurrentProgram(id: string) {
    return this.http.get<IProgram>(`${API_URL}/post/${id}`, { withCredentials: true }); //`${API_URL}/post/` + id
  }


  postProgram(data: { name: string; description: string; image: string; ingredients: string; category: string; owner: string }) {
    return this.http.post<IProgram>(`${API_URL}/post/create`, data, { withCredentials: true });
  };

  editProgram(id: any, data: {}) {
    return this.http.put<IProgram>(`${API_URL}/post/${id}`, data, { withCredentials: true });
  }

  deleteProgram(id: string) {
    return this.http.get<IProgram>(`${API_URL}/post/delete/${id}`, { withCredentials: true });
  }

  like(data: {}) {
    return this.http.post<IProgram>(`${API_URL}/post/like`, { data }, { withCredentials: true });
  }

  
}
