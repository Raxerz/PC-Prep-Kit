import { Component, OnInit, AfterViewChecked, Renderer } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import * as $ from 'jquery';

@Component({
    selector: 'app-unlocked-stage',
    templateUrl: './unlocked-stage.component.html',
    styleUrls: ['./unlocked-stage.component.css']
})
export class UnlockedStageComponent implements OnInit {

	private canvas;
    private stage;
    private spray;
    private spray1;
    private img;
    private x = 10;
    private y = 20;
    private object;
    private human;
    private humanBarWidth = 100;
    private mosquitoBarWidth = 100;
  	private obs;
    private humanProgBar;
    private mosquitoProgBar;
  	private subscription;
    private _mousedownListener;
    private _mousemoveList;
    private _mousemoveList1;
    private _mousemoveList2;
    private _mousemoveList3;
    private mousedown = false;
    private sprayObj = {};
    private mosquitoObj = {};

  	constructor(private _renderer: Renderer) { }

  	ngOnInit() {
        this.humanProgBar = document.getElementById('human-health-bar');
        this.mosquitoProgBar = document.getElementById('mosquito-health-bar');
        this.object = document.getElementById('imgdisplay2');
        this.human = document.getElementById('human');
        this.spray = document.getElementById('abc');
        this._mousedownListener = this._renderer.listen(this.spray, 'click', (event) => this.ccursor(event));
        this.animateDiv();
  	}

    ccursor(e) {        
        this.spray1 = document.getElementById('abc1');
        this.canvas =  document.getElementById('fotos');
        this._mousemoveList = this._renderer.listen(this.canvas, 'mousemove', (event) => this.movemm(event));
        this._mousemoveList1 = this._renderer.listen(this.canvas, 'mouseleave', (event) => this.movemmee(event)); 
        this._mousemoveList2 = this._renderer.listen(this.canvas, 'mousedown', (event) => this.me(event));
        this._mousemoveList3 = this._renderer.listen(this.canvas, 'mouseup', (event) => this.up(event));      
    }
    me(e) {
        this.spray1.src = '../assets/img/12.gif';
        this.mousedown = true;
    }
    up(e) {
        this.spray1.src = '../assets/img/13.gif';
        this.mousedown = false;
    }    
    movemm(e){
        this.canvas.style.cursor = 'none';
        this.spray1.style.display = "block";      
        this.spray1.style.left = e.pageX - 425 + "px";
        this.spray1.style.top = e.pageY -150 + "px";      
    }

    movemmee(e){
        this.spray1.style.display = "none";
    }

	animateDiv(){
	    var newq = this.makeNewPosition();
	    var oldqtop = this.object.offsetTop;
	    var oldqleft = this.object.offsetLeft;
        var currObj = this;
  		var speed = this.calcSpeed([oldqtop, oldqleft], newq);
        $("img[name=animate]").animate({ top: newq[1], left: newq[0] }, speed, function(){
            if(currObj.spray1 && currObj.mousedown) {
                if(currObj.checkCollision(currObj.spray1, currObj.object)) {
                    currObj.mosquitoBarWidth-=10;
                    currObj.mosquitoProgBar.style.width = currObj.mosquitoBarWidth + '%';
                }                
            }
            if(currObj.checkCollision(currObj.human, currObj.object)) {
                currObj.humanBarWidth-=10;
                currObj.humanProgBar.style.width = currObj.humanBarWidth + '%';
            }
            currObj.animateDiv();        
        });	    
	}

    checkCollision(obj1, obj2) {
            var top1 = obj1.offsetTop;
            var left1 = obj1.offsetLeft;
            var bottom1 = top1 + obj1.height;
            var right1 = left1 + obj1.width;
            var top2 = obj2.offsetTop;
            var left2 = obj2.offsetLeft;
            var bottom2 = top2 + obj2.height;
            var right2 = left2 + obj2.width;
            if (!(bottom1 < top2 || top1 > bottom2 || left1 > right2 || right1 < left2)) {
                return true;
            }            
    }

 	makeNewPosition(){    
        // Get viewport dimensions (remove the dimension of the div)
        var h = document.getElementById('fotos').offsetWidth-25;
        var w = document.getElementById('fotos').offsetHeight-25;
        
        var nh = Math.floor(Math.random() * h);
        var nw = Math.floor(Math.random() * w);
        
        return [nh,nw];    
    }	
	calcSpeed(prev, next) {   
        var x = Math.abs(prev[1] - next[1]);
        var y = Math.abs(prev[0] - next[0]);
        
        var greatest = x > y ? x : y;
        
        var speedModifier = 0.25;

        var speed = Math.ceil(greatest/speedModifier);

        return speed;
    }

}
