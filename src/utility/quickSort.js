function swap(array,index1, index2){
    let temp=array[index1];
    array[index1]=array[index2];
    array[index2]=temp;
}


function sort(array,left,right,animation){
    if(left<right){
        let pivot= array[right];
        let part=partition(array,left,right,pivot,animation);
        sort(array,left,part-1,animation);
        sort(array,part+1,right,animation);
    }
}


function partition(array,left,right,pivot,animation){
    let low=left;
    let high=right-1;
    animation.push(['r',right,low,high]);
    while(true){
        while(array[low]<pivot){
            animation.push(['b',low]);
            low++;
            animation.push(['r',right,low,high]);
        }
        while(array[high]>pivot && high>0){
            animation.push(['b',high]);
            high--;
            animation.push(['r', right, low,high]);
        }
        if(low>=high){
            break;
        }
        else{
            animation.push(['s',low,high,array[low],array[high]]);
            swap(array,low,high);
            animation.push(['b',low,high]);
        }
    }
    swap(array,low,right);
    animation.push(['s',low,right, array[right],array[low]]);
    animation.push(['b',low, high, right]);
    return low;
}


export function quickSort(array){
    let animation=[];
    sort(array,0,array.length-1,animation);
    return animation;
}