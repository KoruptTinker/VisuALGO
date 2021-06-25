export function sort(array){
    const animation=[];
    bubbleSort(array,animation);
    return animation;
}

export function bubbleSort(array,animation){
    for(let i=0;i<array.length;i++){
        for(let j=0;j<array.length-i-1;j++){
            animation.push(['r',j,j+1]);
            animation.push(['b',j,j+1]);
            if(array[j]>array[j+1]){
                animation.push([j,array[j],array[j+1]]);
                let temp=array[j+1];
                array[j+1]=array[j];
                array[j]=temp;
            }
        }
        animation.push(['f',array.length-i-1, 0]);
    }
}