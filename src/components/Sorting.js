import React from 'react';
import "../assets/css/Sorting.css";
import * as MergeSort from "../utility/mergeSort.js";
import * as BubbleSort from "../utility/bubbleSort.js";
import * as QuickSort from "../utility/quickSort.js";

export default class Sorting extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            array: [],
            max: 0,
            arraySize: 100,
            speed: 0.005,
        };
        this.sliderMoveSize=this.sliderMoveSize.bind(this);
        this.sliderMoveSpeed=this.sliderMoveSpeed.bind(this);
    }


    componentDidMount(){
        this.resetArray();
    }


    resetArray(){
        let arrayTemp=[];
        let maxTemp=0;
        let {arraySize}=this.state;
        for(let i=0;i<arraySize;i++){
            let temp=Math.floor(Math.random()*1000)+1;
            maxTemp=Math.max(temp,maxTemp);
            arrayTemp.push(temp);
        }
        this.setState({
            array: arrayTemp,
            max: maxTemp
        });
    }


    sliderMoveSize(event){
        let {disable}=this.state;
        console.log(disable);
        if(!disable){
            this.resetArray();
            this.setState({
                arraySize: event.target.value
            });
        }
    }

    
    sliderMoveSpeed(event){
        this.setState({
            speed: event.target.value
        });
        this.resetArray();
    }

    
    disableControls(){
        let elements=document.getElementsByClassName("disable");
        for(let i=0;i<elements.length;i++){
            elements[i].setAttribute("disabled", `${true}`);
        }
    }

    
    enableControls(){
        let elements=document.getElementsByClassName("disable");
        for(let i=0;i<elements.length;i++){
            elements[i].removeAttribute("disabled");
        }
    }

    mergeSort(){
        this.disableControls();
        let {array}=this.state;
        let {max}=this.state;
        let {speed}=this.state;
        let animation=MergeSort.mergeSort(array);
        let arrayBars=document.getElementsByClassName("array-nums");
        for(let i=0;i<animation.length;i++){
            let colorChange=i%3!==2;
            if(colorChange){
                let [barID1,barID2]=animation[i];
                let barOneStyle=arrayBars[barID1].style;
                let barTwoStyle=arrayBars[barID2].style;
                let color=(i%3===0) ? "red" : "#39A2DB";
                setTimeout(()=>{
                    barOneStyle.backgroundColor=color;
                    barTwoStyle.backgroundColor=color;
                    if(i===animation.length-2){
                        this.enableControls();
                    }
                }, i*1000*speed);
            }
            else{
                setTimeout(()=>{
                    let [barID1, newHeight]=animation[i]; 
                    let barOneStyle=arrayBars[barID1].style;
                    barOneStyle.height=`${(newHeight/max)*100}%`;
                    if(i===animation.length-2){
                        this.enableControls();
                    }
                }, i*1000*speed);
            }
        }
    }


    bubbleSort(){
        let {array}=this.state;
        let {max}=this.state;
        let {speed}=this.state;
        let animation=BubbleSort.sort(array);
        let arrayBars=document.getElementsByClassName("array-nums");
        for(let i=0;i<animation.length;i++){
            let element=animation[i];
            let [choice, value1,value2]=element;
            if(choice==='r' || choice==='b' || choice==='f'){
                let color;
                if(choice==='f'){
                    color="#FFC947";
                    let barOneStyle=arrayBars[value1].style;
                    setTimeout(()=>{
                        barOneStyle.backgroundColor=color;
                        if(i===animation.length-2){
                            this.enableControls();
                        }
                    }, i*speed*1000);
                }
                else{
                    color= (choice==='r') ? "red" : "#39A2DB";
                    let barOneStyle=arrayBars[value1].style;
                    let barTwoStyle=arrayBars[value2].style;
                    setTimeout(()=>{
                        barOneStyle.backgroundColor=color;
                        barTwoStyle.backgroundColor=color;
                        if(i===animation.length-2){
                            this.enableControls();
                        }
                    }, i*speed*1000);
                }
            }
            else{
                let barOneStyle=arrayBars[choice].style;
                let barTwoStyle=arrayBars[choice+1].style;
                setTimeout(()=>{
                    barOneStyle.height=`${(value2/max)*100}%`;
                    barTwoStyle.height=`${(value1/max)*100}%`;
                    if(i===animation.length-2){
                        this.enableControls();
                    }
                }, i*speed*1000);
            }
        }
    }


    quickSort(){
        let {array}=this.state;
        let {max}=this.state;
        let {speed}=this.state;
        let animation=QuickSort.quickSort(array);
        let arrayBars=document.getElementsByClassName('array-nums');
        this.disableControls();
        for(let i=0;i<animation.length;i++){
            let element=animation[i];   
            if(element[0]==='r'){
                let [, id1,id2,id3]=element;
                let barOneStyle=arrayBars[id1].style;
                let barTwoStyle=arrayBars[id2].style;
                let barThreeStyle=arrayBars[id3].style;
                setTimeout(()=>{
                    barOneStyle.backgroundColor="lime";
                    barTwoStyle.backgroundColor="#E8F0F2";
                    barThreeStyle.backgroundColor="red";
                    console.log(`${typeof i}    ${ typeof animation.length}`);
                    if(Number(i)==Number(animation.length-1)){
                        this.enableControls();
                    }
                }, i*1000*speed);
            }
            else if(element[0]==='b'){
                let bars=[];
                for(let j=1;j<element.length;j++){
                    bars.push(arrayBars[element[j]].style);
                }
                setTimeout(()=>{
                    for(let j=0;j<bars.length;j++){
                        bars[j].backgroundColor="#39A2DB";
                        console.log(`${typeof i}    ${ typeof animation.length}`);
                        if(Number(i)==Number(animation.length-1)){
                            this.enableControls();
                        }
                    }
                }, i*1000*speed);
            }
            else if(element[0]==='s'){
                let [,id1,id2,val1,val2]=element;
                let barOneStyle=arrayBars[id1].style;
                let barTwoStyle=arrayBars[id2].style;
                setTimeout(()=>{
                    barOneStyle.height=`${(val2/max)*100}%`;
                    barTwoStyle.height=`${(val1/max)*100}%`;
                    console.log(`${typeof i}    ${ typeof animation.length}`);
                    if(Number(i)==Number(animation.length-1)){
                        this.enableControls();
                    }
                }, i*1000*speed);
            }
        }
    }
    

    render(){
        let {array}= this.state;
        let {max}= this.state;
        let {arraySize}=this.state;
        let {speed}=this.state;
        return(
            <>
            <div className="header">
                <div className='header-container header-main'>
                    <p>VisuALGO</p>
                </div>
                <div className="header-container header-invis">
                    <p className="header-text">Array Size</p>
                    <input className="disable" type="range" min="5" max="100" value={arraySize} onChange={this.sliderMoveSize} disabled={false}/>
                </div>
                <div className="header-container header-invis">
                    <p className="header-text">Sort Delay</p>
                    <input className="disable" type="range" min="0.01" max="1" value={speed} onChange={this.sliderMoveSpeed} step="0.01" disabled={false}/>
                </div>
                <div className="header-container header-sort">
                    <button className="header-button disable" onClick={()=>this.mergeSort()}>Merge Sort</button>
                    <button className="header-button disable" onClick={()=>this.bubbleSort()}>Bubble Sort</button>
                    <button className="header-button disable" onClick={()=>this.quickSort()}>Quick Sort</button>
                </div>

            </div>
            <div className='array-container'>
            {array.map((value, idx)=> {
                return <div className='array-nums' key={idx} style={{height: `${(value/max)*100}%`,backgroundColor:"#39A2DB", width: window.innerWidth <= 800 ? `${(100/array.length)*0.5}vw` : `${(100/array.length)*12}px`}}></div>
            })}
            </div>
            </> 
        );
    }
}