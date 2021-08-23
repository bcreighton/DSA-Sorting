const LinkedList = require('../DSA-LinkedList/linkedList');

//Bubble Sort

function swap(array, i, j) {
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
};

function bubbleSort(array) {
    let swaps = 0;
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] > array[i + 1]) {
            swap(array, i, i + 1);
            swaps++;
        }
    }

    if (swaps > 0) {
        return bubbleSort(array);
    }
    return array;
};

// Merge sort

function mergeSort(array, count) {
    count = (count === undefined) ? 1 : count;
    count++;
    if (array.length <= 1) {
        return array;
    }

    const middle = Math.floor(array.length / 2);
    let left = array.slice(0, middle);
    let right = array.slice(middle, array.length);

    left = mergeSort(left, count);
    right = mergeSort(right, count);
    return merge(left, right, array);
};

function merge(left, right, array) {
    let leftIndex = 0;
    let rightIndex = 0;
    let outputIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            array[outputIndex++] = left[leftIndex++];
        }
        else {
            array[outputIndex++] = right[rightIndex++];
        }
    }

    for (let i = leftIndex; i < left.length; i++) {
        array[outputIndex++] = left[i];
    }

    for (let i = rightIndex; i < right.length; i++) {
        array[outputIndex++] = right[i];
    }
    return array;
};

// merge sort linkedlist

const llMergeSort = ll => {
    if(ll.next === null ) return ll;

    const middle = llMiddle(ll).value;
    let left = llSlice(ll, middle, 'left');
    let right = llSlice(ll, middle, 'right');

    debugger;

    left = llMergeSort(left);
    right = llMergeSort(right);

    debugger;

    return middle;
}

const llMiddle = (linkedList) => {
    const ll = linkedList;
    let head = ll.head;
    let i = 1;
    let midNode = null;

    while ( head.next != null ) {
        head = head.next;
        i++;
    }

    head = ll.head; //reset head

    if (i !== undefined || i === null) {
        let mid = Math.floor(i/2) + 1;
        let x = 0;

        while( x <= mid ) {
            midNode = head;
            head = head.next;
            x++;
        }

        return midNode;
    }
}

const llSlice = (linkedList, middle, side) => {
    const ll = linkedList;
    let head = ll.head;
    let i = 1;
    const newLL = new LinkedList();

    if ( side === 'left') {
        while (head.next !== null && i < middle ) {
            newLL.insertLast(head.value)
            head = head.next;
        }
    } else {
        while ( i < middle) {
            head = head.next;
            i++;
        }

        while (head.next !== null && i >= middle ) {
            newLL.insertLast(head.value)
            head = head.next;
        }
    }

    return newLL;
}

// quick sort

function quickSort(array, start = 0, end = array.length) {
    if (start >= end) {
        return array;
    }
    const middle = partition(array, start, end);
    array = quickSort(array, start, middle);
    array = quickSort(array, middle + 1, end);
    return array;
};

function partition(array, start, end) {
    const pivot = array[end-1];
    let j = start;
    for (let i = start; i < end - 1; i++) {
        if (array[i] <= pivot) {
            swap(array, i, j);
            j++;
        }
    }
    swap(array, end-1, j);
    return j;
};

const qSort = arr => {
    return quickSort(arr)
}

const mSort = arr => {
    return mergeSort(arr)
}

const randArr = arr => {
    for (i = 0; i < arr.length; i++ ) {
        let j = Math.floor(Math.random() * arr.length - 1);
        let k = Math.floor(Math.random() * arr.length - 1); // generate random indexes

        if ( j === k ) {
            k = Math.floor(Math.random() * arr.length - 1);
        } else {
            let temp = arr[j];
            arr[j] = arr[k];
            arr[k] = temp;
        }
    }
    return arr;
}

const main = () => {
    const arr = [89,30,25,32,72,70,51,42,25];

    return randArr(arr);
}
console.log(main());

/* 
1.a. 3 recursive calls: left: [21, 1], right: [26, 45]
1.b. 16 recursive calls: left: [16, 49, 39, 27], right: [43, 34, 46, 40]
1.c. [21], [1]
1.d. [1, 21, 26, 45], [2, 9, 28, 29]

2. Neither 14 nor 17 could have been the pivot
2.a. [3,9,10,12,19,14,17,16,13,15,]
2.b.[14,13,10,3,9,12,15,16,19,17,]
*/