// function to make a test array
function makeRandomIntArray(totalNumbers, maxNum) {
    let nums = [];
    for (let i = 0; i < totalNumbers; i++) {
        const randomNum = (Math.floor(Math.random() * maxNum))
        nums.push(randomNum);
    }
    return nums;
}

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

// Improved with the functionality that it can exit the loop early if no swaps were done.
function bubbleSortExitEarly(array) {
    for (let i = 0; i < (array.length - 1); i++) {
        let done = true;
        for (let j = 0; j < (array.length - i - 1); j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]]
                done = false;
            }
        }
        if (done) break;
    }
    return array;
}

// console.log(bubbleSort(makeRandomIntArray(10, 100)));


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
// console.log(insertionSort(makeRandomIntArray(10, 100)));


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
    // let pivot = array[high];
    let pivot = medianOfThree(array, low, high)
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

// Ensures that we get a pivot that is always the median value of low, high and mid.
// This also fixes that the recursion doesn't become unbalanced,
//  cause we get a pivot point that is closer to the middle of the array.
function medianOfThree(array, low, high) {
    const mid = Math.floor((low + high) / 2);
    if (array[low] > array[mid]) [array[low], array[mid]] = [array[mid], array[low]];
    if (array[low] > array[high]) [array[low], array[high]] = [array[high], array[low]];
    if (array[mid] > array[high]) [array[mid], array[high]] = [array[high], array[mid]];
    [array[mid], array[high]] = [array[high], array[mid]];
    return array[high];
}

// console.log(quickSort(makeRandomIntArray(10, 100), 0, 9));

// Stable version of quick sort
function stableQuickSort(array) {
    // Returns if the array is already sorted
    if (array.length <= 1) return array;

    // Choses the pivot
    const pivotIndex = Math.floor(array.length / 2);
    // Could use a medianOfThree like function here also to improve the chosen pivot
    const pivot = array[pivotIndex];

    // Partition
    const less = [];
    const equal = [];
    const greater = [];

    for (const element of array) {
        if (element < pivot) {
            less.push(element);
        }
        else if (element > pivot) {
            greater.push(element);
        }
        else {
            equal.push(element);
        }
    }

    return [...stableQuickSort(less), ...equal, ...stableQuickSort(greater)];
}
// console.log(stableQuickSort(makeRandomIntArray(100, 100)));


// Functions to test sorting algorithm speeds
function testQuickSort(array) {
    const arr = [...array];
    const startTime = performance.now();

    const sortedArray = quickSort(arr, 0, (arr.length - 1));

    const endTime = performance.now();
    console.log(`quickSort: ${(endTime - startTime).toFixed(4)}ms`)
}

function testSort(sortFunction, array) {
    const arr = [...array];
    const startTime = performance.now();

    const sortedArray = sortFunction(arr);

    const endTime = performance.now();
    console.log(`${sortFunction.name}: ${(endTime - startTime).toFixed(4)}ms`)
}

function testAllSorts(array) {
    testSort(bubbleSort, array);
    testSort(bubbleSortExitEarly, array);
    testSort(insertionSort, array);
    testSort(stableQuickSort, array);
    testQuickSort(array);
}

function testSpeeds() {
    console.log("// Array length: 10")
    testAllSorts(makeRandomIntArray(10, 100));

    console.log("\n// Array length: 100")
    testAllSorts(makeRandomIntArray(100, 100));

    console.log("\n// Array length: 1000")
    testAllSorts(makeRandomIntArray(1000, 100));

    console.log("\n// Array length: 10000")
    testAllSorts(makeRandomIntArray(10000, 100));

    // console.log("// Array length: 100000")
    // testSorts(makeRandomIntArray(100000, 100));

    // console.log("// Array length: 1000000")
    // testSorts(makeRandomIntArray(1000000, 100));
}
testSpeeds();