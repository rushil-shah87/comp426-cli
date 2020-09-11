import mpg_data from "./data/mpg_data.js";
import { getStatistics } from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
    avgMpg: getAvgMpg(),
    allYearStats: getAllYearStats(),
    ratioHybrids: getRatioHybrids(),
};

export function getAvgMpg() {
    return {
        city: getStatistics(mpg_data.map( (car) => car.city_mpg)).mean, 
        highway: getStatistics(mpg_data.map( (car) => car.highway_mpg)).mean,
    }
}

export function getAllYearStats() {
    return getStatistics(mpg_data.map( (car) => car.year));
}

export function getRatioHybrids() {
    return (mpg_data.filter( (car) => car.hybrid).length / mpg_data.length);
}

/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. 
 * Sort by the number of hybrids in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
export const moreStats = {
    makerHybrids: getMakerHybrids(),
    avgMpgByYearAndHybrid: getAvgMpgByYearAndHybrid(),
};

export function getMakerHybrids() {
    // get unique list of all hybrid makes (array)
    let unique_makes = mpg_data.filter((car)=>car.hybrid).map((car=>car.make)).reduce((acc, curr) => acc.includes(curr) ? acc : [...acc, curr], []);
    
    // get unique list of all hybrid cars (array)
    let all_hybrid_cars = mpg_data.filter((car)=>car.hybrid);

    // collect each make with all of its hybrids ids
    let accumulator = [];
    for (let i = 0; i < unique_makes.length; i++) {
        let make = unique_makes[i];
        let ids = [];
        for (let i = 0; i < all_hybrid_cars.length; i++) {
            if((all_hybrid_cars[i].make == make)) {
                ids.push(all_hybrid_cars[i].id);
            }
        }
        // push new object with make and hybrid ids array to return array
        accumulator.push( {
            make,
            hybrids: ids,
        } );
    }

    // sort by size of hybrid list
    accumulator = accumulator.sort((a, b)=> b.hybrids.length - a.hybrids.length);
    return accumulator;
}

export function getAvgMpgByYearAndHybrid() {
    let years = mpg_data.map((car)=>car.year).reduce((acc, curr) => acc.includes(curr) ? acc : [...acc, curr], []);
    let all_years = {};
    for (let y = 0; y < years.length; y++) {
        let avg_city = 0, avg_hwy = 0, hybrid_count = 0;
        let avg_city_non = 0, avg_hwy_non = 0, non_count = 0;
        for (let i = 0; i < mpg_data.length; i++) {
            if (mpg_data[i].year == years[y]) {
                if (mpg_data[i].hybrid) {
                    avg_city = (avg_city*hybrid_count + mpg_data[i].city_mpg)/(hybrid_count+1);
                    avg_hwy = (avg_hwy*hybrid_count + mpg_data[i].highway_mpg)/(++hybrid_count);
                }
                else {
                    avg_city_non = (avg_city_non*non_count + mpg_data[i].city_mpg)/(non_count+1);
                    avg_hwy_non = (avg_hwy_non*non_count + mpg_data[i].highway_mpg)/(++non_count);
                }
            }
        }
        all_years[years[y]] = {
            hybrid: {
                city: avg_city,
                highway: avg_hwy,
            },
            notHybrid: {
                city: avg_city_non,
                highway: avg_hwy_non,
            }
        }
    }
    return all_years;
}
