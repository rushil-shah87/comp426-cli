import { variance }  from "./data/stats_helpers.js";

/**
 * Gets the sum of an array of numbers.
 * @param array
 * @returns {*}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * prototype functions. Very useful
 */
export function getSum(array) {
    let sum = 0;
    array.forEach(element => { sum += element });
    return sum;
}


/**
 * Calculates the median of an array of numbers.
 * @param {number[]} array
 * @returns {number|*}
 *
 * example:
 * let array = [3,2,5,6,2,7,4,2,7,5];
 * console.log(getMedian(array)); // 4.5
 */
export function getMedian(array) {
    array = bubbleSort(array);
    let size = array.length;
    let median = (size % 2 == 0) ? ((array[size / 2] + array[(size - 2) / 2]) / 2) : ((array[(size - 1) / 2]));
    return median;
}

export function bubbleSort(array) {
    let size = array.length;
    let temp = 0;
    for (let i = 0; i < size; i++) {
        for (let j = i; j < size; j++) {
            if (array[j] > array[j + 1]) {
                temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
    return array;
}
/**
 * Calculates statistics (see below) on an array of numbers.
 * Look at the stats_helper.js file. It does variance which is used to calculate std deviation.
 * @param {number[]} array
 * @returns { {min: *, median: *, max: *, variance: *, mean: *, length: *, sum: *, standard_deviation: *} }
 *
 * example:
 * getStatistics([3,2,4,5,5,5,2,6,7])
 * {
  length: 9,
  sum: 39,
  mean: 4.333333333333333,
  median: 5,
  min: 2,
  max: 7,
  variance: 2.6666666666666665,
  standard_deviation: 1.632993161855452
 }
 */
export function getStatistics(array) {
    let size = array.length;
    let sum = array.reduce(function(a, b){
        return a + b;
    }, 0);
    let mean = (size==0) ? 'empty array causing divide by 0' : sum / size;
    let median = getMedian(array);
    let min = array.reduce(function (x, y) {
        return Math.min(x, y);
    });
    let max = array.reduce(function (x, y) {
        return Math.max(x, y);
    });
    let varian = variance(array, mean);
    let std_dev = Math.sqrt(varian);
    return {
        min: min,
        median: median,
        max: max,
        variance: varian,
        mean: mean,
        length: size,
        sum: sum,
        standard_deviation: std_dev
    };
}