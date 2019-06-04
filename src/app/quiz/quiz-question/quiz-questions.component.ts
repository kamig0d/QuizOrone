import { Component, OnInit, TemplateRef, Renderer, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap'
import { ToastrService } from 'ngx-toastr';
import { QuizService, Rank } from '../quiz.service';

@Component({
  selector: 'quiz-questions',
  templateUrl: './quiz-questions.component.html',
  styleUrls: ['./quiz-questions.component.scss']
})

export class QuizQuestionsComponent implements OnInit {
    ngOnInit() { 
        this._elementRef.nativeElement.style.setProperty('--theme-color', this.themeColor);
        this.service.getQuestions(this.idTema).subscribe((data: any) => {
            this.resp = data;
            this.getCurrentQuestion(null);
        });
    }

    constructor(
        private service: QuizService,
        private toasrt: ToastrService,
        private modalService: BsModalService,
        private _elementRef: ElementRef
    ) { }

    @Output() showHome = new EventEmitter;
    @Input() categorieSelected;
    @Input() themeColor;
    @Input() playerName;
    @Input() idTema;

    scoreTemplate: BsModalRef;
    rankModel: Rank = {
        nome: null,
        id_tema: null,
        qtQuestoes: null
    };

    count = 0;
    score = 0;
    finishQuiz = false;
    resp: any[] = [];
    currentAnswers: any[] = [];
    currentQuestion: any[] = [];

    getCurrentQuestion(template: TemplateRef<any>) {
        this.currentAnswers = [];
        this.currentQuestion = [];

        if(!this.resp[this.count] || this.resp[this.count] == null) {
            this.finishQuiz = true;
            this.showHome.emit();
            this.scoreTemplate = this.modalService.show(template);

            this.rankModel.id_tema = this.idTema;
            this.rankModel.nome = this.playerName;
            this.rankModel.qtQuestoes = this.score;
            this.service.saveRanking(this.rankModel).subscribe((data: Rank) => {
                console.log(data);
            });
            return;
        }

        this.currentQuestion = this.resp[this.count].texto;
        this.resp[this.count].alternativas.forEach(item => {
            this.currentAnswers.push(item.texto);
        });
    }

    ConfirmQuestion(answer, template: TemplateRef<any>) {
        let equal = 0;

        this.resp[this.count].alternativas.forEach(questions => {
            if(answer == questions.texto) {
                if(questions.correta == 1)
                    equal = 1;
            }
        })
        if(equal == 1) {
            this.toasrt.success("Você acertou a questão.", "Parabéns!");
            this.score++;
        } else {
            this.toasrt.error("Você errou a questão.", "Que pena");
        }

        this.count++;
        this.getCurrentQuestion(template);
    }
}