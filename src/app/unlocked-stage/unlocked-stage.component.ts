import { Component, OnInit, AfterViewChecked, Renderer } from '@angular/core';
import * as $ from 'jquery';

@Component({
    selector: 'app-unlocked-stage',
    templateUrl: './unlocked-stage.component.html',
    styleUrls: ['./unlocked-stage.component.scss']
})
export class UnlockedStageComponent implements OnInit {

    private _canvas;
    private _sprayItem;
    private _spray;
    private _human;
    private _humanProgBar;
    private _mosquitoProgBar;
    private _humanBarWidth = 100;
    private _mosquitoBarWidth = 100;
    private _mousemoveListener;
    private _mouseleaveListener;
    private _mousedownListener;
    private _mouseupListener;
    private _mousedown = false;

    public mosquito;

    constructor(private _renderer: Renderer) { }

    ngOnInit() {
        this._humanProgBar = document.getElementById('human-health-bar');
        this._mosquitoProgBar = document.getElementById('mosquito-health-bar');
        this.mosquito = document.getElementById('moz');
        this._human = document.getElementById('human');
        this._sprayItem = document.getElementById('spray-item');
        this._mousedownListener = this._renderer.listen(this._sprayItem, 'click', (event) => this.changeCursor(event));
        this.animateDiv();
    }

    changeCursor(e) {
        this._spray = document.getElementById('spray');
        this._canvas =  document.getElementById('scene');
        this._mousemoveListener = this._renderer.listen(this._canvas, 'mousemove', (event) => this.moveOverCanvas(event));
        this._mouseleaveListener = this._renderer.listen(this._canvas, 'mouseleave', (event) => this.leaveCanvas());
        this._mousedownListener = this._renderer.listen(this._canvas, 'mousedown', (event) => this.attack());
        this._mouseupListener = this._renderer.listen(this._canvas, 'mouseup', (event) => this.stopAttack());
    }

    attack() {
        this._spray.src = '../assets/img/12.gif';
        this._mousedown = true;
    }

    stopAttack() {
        this._spray.src = '../assets/img/13.gif';
        this._mousedown = false;
    }

    moveOverCanvas(e) {
        this._canvas.style.cursor = 'none';
        this._spray.style.display = 'block';
        this._spray.style.left = e.pageX - 425 + 'px';
        this._spray.style.top = e.pageY - 150 + 'px';
    }

    leaveCanvas() {
        this._spray.style.display = 'none';
    }

    animateDiv() {
        const newMosquitoPos = this.makeNewPosition();
        const oldMosquitoTop = this.mosquito.offsetTop;
        const oldMosquitoLeft = this.mosquito.offsetLeft;
        const currObj = this;
        const speed = this.calcSpeed([oldMosquitoTop, oldMosquitoLeft], newMosquitoPos);
        $('img[name=animate]').animate({ top: newMosquitoPos[1], left: newMosquitoPos[0] }, speed, function(){
            if (currObj._spray && currObj._mousedown) {
                if (currObj.checkCollision(currObj._spray, currObj.mosquito)) {
                    currObj._mosquitoBarWidth -= 10;
                    currObj._mosquitoProgBar.style.width = currObj._mosquitoBarWidth + '%';
                }
            }
            if (currObj.checkCollision(currObj._human, currObj.mosquito)) {
                currObj._humanBarWidth -= 10;
                currObj._humanProgBar.style.width = currObj._humanBarWidth + '%';
            }
            currObj.animateDiv();
        });
    }

    checkCollision(obj1, obj2) {
        const topObj1 = obj1.offsetTop;
        const leftObj1 = obj1.offsetLeft;
        const bottomObj1 = topObj1 + obj1.height;
        const rightObj1 = leftObj1 + obj1.width;
        const topObj2 = obj2.offsetTop;
        const leftObj2 = obj2.offsetLeft;
        const bottomObj2 = topObj2 + obj2.height;
        const rightObj2 = leftObj2 + obj2.width;
        if (!(bottomObj1 < topObj2 || topObj1 > bottomObj2 || leftObj1 > rightObj2 || rightObj1 < leftObj2)) {
            return true;
        }
    }

    makeNewPosition() {
        // Get viewport dimensions (remove the dimension of the div)
        const h = document.getElementById('scene').offsetWidth - 25;
        const w = document.getElementById('scene').offsetHeight - 25;

        const nh = Math.floor(Math.random() * h);
        const nw = Math.floor(Math.random() * w);

        return [nh, nw];
    }
    calcSpeed(prev, next) {
        const x = Math.abs(prev[1] - next[1]);
        const y = Math.abs(prev[0] - next[0]);

        const greatest = x > y ? x : y;

        const speedModifier = 0.25;

        const speed = Math.ceil(greatest / speedModifier);

        return speed;
    }

}
