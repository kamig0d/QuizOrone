import { Component, OnInit, TemplateRef, Renderer, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { QuizService } from '../quiz.service';

@Component({
    selector: 'quiz-ranking',
    templateUrl: './quiz-ranking.component.html',
    styleUrls: ['./quiz-ranking.component.scss']
  })

  export class QuizRankingComponent implements OnInit {

    colorsTheme = [
        {label: 'sport', key: 'rgba(0,255,0, 0.5)'},
        {label: 'anime', key: 'rgba(0, 255, 255, 0.5)'},
        {label: 'serie', key: 'rgba(255, 255, 255, 0.5)'},
        {label: 'movie', key: 'rgba(255, 0, 0, 0.5)'},
        {label: 'princess', key: 'rgba(255, 0, 255, 0.5)'},
        {label: 'heroes', key: 'rgba(255, 255, 0, 0.5)'},
        {label: 'games', key: 'rgba(255, 156, 0, 0.5)'},
        {label: 'music', key: 'rgba(255, 20, 147, 0.5)'}
      ]

    rankingList = [
        // {name: 'fulano', score: '9'},
        // {name: 'fulano', score: '9'},
        // {name: 'fulano', score: '9'},
        // {name: 'fulano', score: '9'},
        // {name: 'fulano', score: '9'},
        // {name: 'fulano', score: '9'},
        // {name: 'fulano', score: '9'},
        // {name: 'fulano', score: '9'},
        // {name: 'fulano', score: '9'},
        // {name: 'fulano', score: '9'},
    ];

    categories = [
        {title: 'Animes', id: 'anime'},
        {title: 'Filmes', id: 'movie'},
        {title: 'Princesas', id: 'princess'},
        {title: 'Esportes', id: 'sport'},
        {title: 'Séries', id: 'serie'},
        {title: 'Heróis', id: 'heroes'},
        {title: 'Jogos', id: 'games'},
        {title: 'Música', id: 'music'},
    ]

    ngOnInit() {}

    constructor(
        private _elementRef: ElementRef,
        private service: QuizService
    ) {
        this.service.getRanking().subscribe((data: any) => {
            this.rankingList = data;
        });
    }
  }