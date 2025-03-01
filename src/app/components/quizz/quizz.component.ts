import { Component, OnInit } from '@angular/core';

import quizz_questions from "../../../assets/data/quizz_questions.json";

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css', 'quizz.component.responsivo.css']
})
export class QuizzComponent implements OnInit {
  title: string = "";

  questions: any;
  questionSetected: any;

  answers: string[] = [];
  answersSelected: string = "";

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished: boolean = false;

  constructor() {}

  ngOnInit(): void {
    if (quizz_questions) {
      this.finished = false;
      this.title = quizz_questions.title; // Acessa a propriedade "title"

      this.questions = quizz_questions.questions;
      this.questionSetected = this.questions[this.questionIndex];

      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;
    }
  }

  playerChoose(value: string) {
    this.answers.push(value);
    this.nextStep();
  }

  async nextStep() {
    this.questionIndex += 1;

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSetected = this.questions[this.questionIndex];
    } else {
      const finalAnswer: string = await this.checkResult(this.answers, this.questionMaxIndex);
      this.finished = true;

      // Verifica se a chave finalAnswer existe no objeto results
      if (finalAnswer in quizz_questions.results) {
        this.answersSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results];
      } else {
        this.answersSelected = 'Resultado não encontrado.';
      }
    }
  }

  // Adaptação da função para calcular o resultado com base nas respostas
  async checkResult(answers: string[], totalPerguntas: number): Promise<string> {
    // Contabiliza as respostas A, B, e C
    let respostasA = 0, respostasB = 0, respostasC = 0;

    answers.forEach(resposta => {
      if (resposta === 'A') {
        respostasA++;
      } else if (resposta === 'B') {
        respostasB++;
      } else if (resposta === 'C') {
        respostasC++;
      }
    });

    // Calcula as porcentagens
    const percentualA = (respostasA / totalPerguntas) * 100;
    const percentualB = (respostasB / totalPerguntas) * 100;
    const percentualC = (respostasC / totalPerguntas) * 100;

    // Verifica se algum tipo de resposta atingiu 80% ou mais
    if (percentualA >= 70) {
      return 'A'; // Retorna apenas a chave 'A', 'B' ou 'C'
    } else if (percentualB >= 80) {
      return 'B';
    } else if (percentualC >= 20) {
      return 'C';
    } else {
      return 'Resultado Inconclusivo';
    }
  }
}



/*
import { Component, OnInit } from '@angular/core';

import quizz_questions from "../../../assets/data/quizz_questions.json";

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css', 'quizz.component.responsivo.css']
})
export class QuizzComponent implements OnInit {
  title: string = "";

  questions: any;
  questionSetected: any;

  answers: string[] = [];
  answersSelected: string = "";

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished: boolean = false;

  constructor() {}

  ngOnInit(): void {
    if (quizz_questions) {
      this.finished = false;
      this.title = quizz_questions.title; // Acessa a propriedade "title"

      this.questions = quizz_questions.questions;
      this.questionSetected = this.questions[ this.questionIndex];

      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;
    }
  }

  playerChoose(value:string){
    this.answers.push(value);
    this.nextStep()
  }

  async nextStep(){
    this.questionIndex += 1;

    if(this.questionMaxIndex > this.questionIndex){
      this.questionSetected = this.questions[this.questionIndex];
    } else {
      const finalAnswer: string = await this.checkResult(this.answers);
      this.finished = true;
      this.answersSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results];
    }
  }

  async checkResult(answers: string[]){
    const result = answers.reduce((previous, current, i, arr)=>{
      if(
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length
      ){
        return previous
      } else {
        return current
      }
    })
    
    return result
  }
}
  */
