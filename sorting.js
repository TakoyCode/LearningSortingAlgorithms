// function to make a test array
function makeRandomIntArray(totalNumbers) {
    let nums = [];
    for (let i = 0; i < totalNumbers; i++) {
        const randomNum = (Math.floor(Math.random() * 100))
        nums.push(randomNum);
    }
    return nums;
}

const array = makeRandomIntArray(10);

// Bubble Sort (O(n²) time, O(1) space)
// A simple sorting algorithm that iterates through a list,
// compares neibouring elements and switches them if they are in the wrong order
function bubbleSort(array) {
    for (let i = 0; i < (array.length - 1); i++) {
        for (let j = 0; j < (array.length - i - 1); j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]]
            }
        }
    }
    return array;
}

// console.log(bubbleSort(makeRandomIntArray(10)));

// Insertion Sort (O(n²) time, O(1) space).
// Sorts an array by building a sorted part of the array one element at a time.
// Each new element is placed at the correct place in the sorted part.
function insertionSort(array) {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j]
            j = j - 1;
        }
        array[j + 1] = key;
    }
    return array;
}
// console.log(array)
// console.log(insertionSort(array));

// Quick Sort ( O(n log n) time on average, O(log n) space)
// Is a "divide and conquer" algorithm that divides the list into smaller lists based on a pivot-element,
// and then sorts each subarray recursively. 

function quickSort(array, low, high) {
    if (low < high) {
        const pivotIndex = partition(array, low, high);
        quickSort(array, low, pivotIndex - 1);
        quickSort(array, pivotIndex + 1, high);
    }
    return array;
}

function partition(array, low, high) {
    let pivot = array[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (array[j] <= pivot) {
            i = i + 1;
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    return i + 1;
}

console.log(quickSort(array, 0, array.length - 1));