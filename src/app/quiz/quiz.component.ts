import { Component, OnInit, TemplateRef, Renderer, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap'
import { ToastrService } from 'ngx-toastr';
import { QuizService } from './quiz.service';

@Component({
  selector: 'quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})

export class QuizComponent implements OnInit {

  constructor(
    private modalService: BsModalService,
    private _renderer: Renderer,
    private _toastr: ToastrService,
    private _elementRef: ElementRef,
    private service: QuizService
  ) { 
    this.service.getThemes().subscribe((data : any) => {
        this.themesList = data;
    })
  }

  ngOnInit() { }

  homeShow = true;
  rankingShow = false;
  quizShow = false;
  nickTemplate: BsModalRef;
  userName = "";
  categorieClicked;
  themeColorSelected;
  id_tema;

  colorsTheme = [
    {label: 'Esportes', key: '#00FF00'},
    {label: 'Animes', key: '#00FFFF'},
    {label: 'Séries', key: '#FFFF'},
    {label: 'Filmes', key: '#FF0000'},
    {label: 'Princesas', key: '#FF00FF'},
    {label: 'Heróis', key: '#FFFF00'},
    {label: 'Jogos', key: '#FF9C00'},
    {label: 'Música', key: '#FF1493'}
  ];

  themesList = [];

  onHomeClick() {
    this.rankingShow = false;
    this.quizShow = false;
    this.homeShow = true;
  }

  onRankingClick() {
    this.homeShow = false;
    this.rankingShow = true;
    this.quizShow = false;
  }

  cardClick(template: TemplateRef<any>, theme) {
    this.id_tema = theme.id;
    this.categorieClicked = theme.texto;
    this.nickTemplate = this.modalService.show(template);
    this._elementRef.nativeElement.style.setProperty('--theme-color', this.colorsTheme.find( item => item.label == theme.texto).key);
    this.themeColorSelected = this.colorsTheme.find( item => item.label == theme.texto).key;
  }

  dismissModal() {
    this.nickTemplate.hide();
  }

  confirmNick() {
    if(this.userName == "" || this.userName == null) {
      this._toastr.error("Favor inserir um nickname para começar o quiz", "Atenção!");
      return;
    }

    this.quizShow = true;
    this.homeShow = false;
    this.rankingShow = false;
    this.id_tema = this.id_tema;
    this.dismissModal();
  }

  chengeToHome() {
    this.homeShow = true;
    this.quizShow = false;
    this.rankingShow = false;
  }
}
