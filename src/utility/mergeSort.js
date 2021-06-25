export function mergeSort(array){
    const animation=[];
    sort(array,0,array.length-1,animation);
    return animation;
}


export function merge(array, left, middle, right, animation){
    let n1=middle-left+1;
    let n2=right-middle;

    let Left=new Array(n1);
    let Right=new Array(n2);

    for(let i=0;i<n1;i++){
        Left[i]=array[left+i];
    }
    for(let i=0;i<n2;i++){
        Right[i]=array[middle+1+i];
    }
    let i=0;
    let j=0;

    let index=left;
    while(i<n1 && j<n2){
        animation.push([left+i,j+middle+1]);
        animation.push([left+i,j+middle+1]);
        if(Left[i]<=Right[j]){
            animation.push([index,Left[i]]);
            array[index]=Left[i];
            i++;
        }
        else{
            animation.push([index,Right[j]]);
            array[index]=Right[j];
            j++;
        }
        index++;
    }

    while(i<n1){
        animation.push([i+left,i+left]);
        animation.push([i+left,i+left]);
        animation.push([index,Left[i]]);
        array[index]=Left[i];
        i++;
        index++;
    }

    while(j<n2){
        animation.push([j+middle+1,j+middle+1]);
        animation.push([j+middle+1,j+middle+1]);
        animation.push([index, Right[j]]);
        array[index]=Right[j];
        j++;
        index++;
    }
}

export function sort(array,left,right, animation){
    if(left>=right){
        return;
    }
    let middle=left+parseInt((right-left)/2);
    sort(array,left,middle,animation);
    sort(array,middle+1,right,animation);
    merge(array,left,middle,right,animation);
}