import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class QuizService  {
    urlQuestions = 'https://quiz-milhao.herokuapp.com/api/perguntas/';
    urlThemes = 'https://quiz-milhao.herokuapp.com/api/temas';
    urlAdd = 'https://quiz-milhao.herokuapp.com/api/ranking/adicionar';
    urlRank = 'https://quiz-milhao.herokuapp.com/api/ranking/';

    constructor(
        private http: HttpClient
    ) { }

    getQuestions(idTema) {
        console.log(idTema)
        return this.http.get(this.urlQuestions+idTema);
    }

    getThemes() {
        return this.http.get(this.urlThemes);
    }

    saveRanking(rank: Rank): Observable<Rank> {
        return this.http.post<Rank>(this.urlAdd, rank, {
            headers: new HttpHeaders({
                'Content-Type' : 'application/json'
            })
        });
    }

    getRanking() {
        return this.http.get(this.urlRank);
    }
}

export interface Rank {
    id_tema: number;
    nome: string;
    qtQuestoes: number;
}