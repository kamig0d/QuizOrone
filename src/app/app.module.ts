import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BsModalRef, BsModalService, ComponentLoaderFactory, PositioningService, ModalBackdropComponent } from 'ngx-bootstrap';
import { ModalContainerComponent } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuizRankingComponent } from './quiz/quiz-ranking/quiz-ranking.component';
import { CommonModule } from '@angular/common';
import { QuizQuestionsComponent } from './quiz/quiz-question/quiz-questions.component';
import { QuizService } from './quiz/quiz.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    ModalBackdropComponent,
    ModalContainerComponent,
    QuizRankingComponent,
    QuizQuestionsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AngularFontAwesomeModule,
    ToastrModule.forRoot(),
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    BsModalRef,
    BsModalService,
    ComponentLoaderFactory,
    PositioningService,
    QuizService,
    HttpClient
  ],
  entryComponents: [
    ModalBackdropComponent,
    ModalContainerComponent    
  ],
  bootstrap: [AppComponent],
  exports: [
    ModalBackdropComponent,
    HttpClientModule
  ]
})
export class AppModule { }
