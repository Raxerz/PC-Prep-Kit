import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { DashboardService } from '../../services/dashboard.service';
import { SharedDataService } from '../../services/shared.data.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { LanguageService } from '../../services/language.service';

@Component({
    selector: 'app-oddoneout',
    templateUrl: './activity-3.component.html',
    styleUrls: ['../malaria-101.component.scss']
})
export class OddOneOutComponent implements OnInit {

    private _questionNumber;
    private _questionLock;
    private _numberOfQuestions;
    private _obs;
    private _subscription;
    private _data;
    private _status: object = {stage: 2, activity: 3};

    public activityComplete;
    public questionText;
    public score;
    public showNext;
    public opt = [];
    public language: any;

    constructor(private _langService: LanguageService, private _dashboardService: DashboardService, private _sharedData: SharedDataService, public toastr: ToastsManager, vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
        this._langService.loadLanguage().subscribe(response => {
            this.language = response.pcprepkit.stages.malaria101.oddOneOut;
        });
        this.score = 0;
        this.activityComplete = false;
        this._questionNumber = 0;
        this._questionLock = false;
        this.opt = [];
        this._dashboardService.getProgressStatus().subscribe(response => {
            this.activityComplete = this._sharedData.checkProgress(2, 3, response);
        });
        this._dashboardService.getJSONData('quiz.json').subscribe(response => {
            this._data = JSON.parse(response.data);
            this.shuffle(this._data.quizlist);
            this.displayQuestion();
        });
    }

    displayQuestion() {
        this.questionText = this._data.quizlist[this._questionNumber].question;
        this.opt.push(this._data.quizlist[this._questionNumber].option1);
        this.opt.push(this._data.quizlist[this._questionNumber].option2);
        this.opt.push(this._data.quizlist[this._questionNumber].option3);
        this.opt.push(this._data.quizlist[this._questionNumber].option4);
    }

    optionSelected(event) {
        if (this._questionLock) {
            return;
        }
        this._questionLock = true;
        console.log(this._data.quizlist[this._questionNumber].answer);
        console.log(event.target.id);
        if (this._data.quizlist[this._questionNumber].answer === event.target.id) {
            this.score++;
            this.toastr.success('Correct!', 'Success!');
        } else {
            this.toastr.error('Incorrect! ', 'Sorry!');
        }
        this._obs = Observable.interval(1000)
                    .do(i => this.changeQuestion() );
        this._subscription = this._obs.subscribe();
    }

    shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    changeQuestion() {
        this._subscription.unsubscribe();
        this._questionNumber++;
        if (this._questionNumber === 5) {
            this.activityComplete = true;
            this.showNext = true;
            this._dashboardService.updateProgressStatus(this._status).subscribe(response => {});
            return;
        }
        this._questionLock = false;
        this.opt = [];
        this.displayQuestion();
    }

    reload() {
        this.ngOnInit();
    }
}
