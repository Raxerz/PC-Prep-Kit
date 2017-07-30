import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import swal from 'sweetalert2'; 

@Component({
    selector: 'app-life-cycle',
    templateUrl: './activity-1-2.component.html',
    styleUrls: ['../malaria-101.component.scss']
})
export class MalariaLifeCycle implements OnInit{

    private obs;
    private subscription;   
    private currArrState = [];
    public solnArr = ['red-blood-cells.png',
                       'character-1.png',
                       'mosquito.png',
                       'mosquito.png',
                       'character-2.png',
                       'plasmodium.png']
    public labelsArr = ['Plasmodium / Virus',
                       'First infected mosquito',
                       'First infected person',
                       'Infected red blood cells',
                       'Second infected mosquito',
                       'Second infected person']                       

    constructor() {
    }

    ngOnInit(){
        swal({
            title: 'Drag and drop the images in the container to complete the life cycle',
            type: 'warning'
        });        
        //this.obs = Observable.interval(500)
          //             .do(i => this.checkCompletion() );
        //this.subscription = this.obs.subscribe();
    }

    /**
     * Utility function used in activity indicator
     * @param {Number} number Number of activities in a stage - 3 (default)
     */
    createRange(number) {
        const items: number[] = [];
        for (let i = 1; i <= number; i++) {
            items.push(i);
        }
        return items;
    }

    allowDrop(ev) {
        ev.preventDefault();
    }

    drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
        if(ev.target.parentNode.id>0 && ev.target.parentNode.id<=6){
            delete this.currArrState[Number(ev.target.parentNode.id)];
        }     
    }

    drop(ev) {
        ev.preventDefault();
        var data = document.getElementById(ev.dataTransfer.getData("text"));
        var srcParent = data.parentNode;
        var tgt = ev.currentTarget.firstElementChild;
        if (tgt) {
            ev.currentTarget.replaceChild (data, tgt);
            srcParent.appendChild (tgt);
            var firstSrc = ev.currentTarget.firstElementChild.src;
            var secondSrc = tgt.src;
            firstSrc = firstSrc.substr(firstSrc.lastIndexOf('/')+1);
            secondSrc = secondSrc.substr(secondSrc.lastIndexOf('/')+1);
            if(ev.currentTarget.id>0 && ev.currentTarget.id<=6 && tgt.parentNode.id>0 && tgt.parentNode.id<=6){
                this.currArrState[Number(ev.currentTarget.id)] = firstSrc;
                this.currArrState[Number(tgt.parentNode.id)] = secondSrc;
            }          

        } else {
            ev.currentTarget.appendChild(data);
            var firstSrc = ev.currentTarget.firstElementChild.src;
            firstSrc = firstSrc.substr(firstSrc.lastIndexOf('/')+1);
            if (ev.currentTarget.id>0 && ev.currentTarget.id<=6) {
                this.currArrState[Number(ev.currentTarget.id)] = firstSrc;
            } 
        }

        var f = false;
        var arrLength = 0;
        for (var i=0;i<this.solnArr.length;i++) {
            if(this.currArrState[i+1]!==undefined){
                arrLength++;
            }
            if(this.currArrState[i+1]!==this.solnArr[i]){
                f= true;
            }
        }

        if (!f && arrLength===6) {
            swal(
                    'Good job!',
                    'You completed this activity!',
                    'success'
                );
        } else if(arrLength===6) {
                swal(
                    'Sorry!',
                    'Try Again!',
                    'error'
                  );    
        }
    }

    /*checkCompletion(){
      console.log(this.currArrState);
    }*/


}
