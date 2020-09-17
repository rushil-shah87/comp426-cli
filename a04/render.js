/**
 * Course: COMP 426
 * Assignment: a04
 * Author: Rushil Shah
 *
 * This script uses jQuery to build an HTML page with content taken from the
 * data defined in data.js.
 */

/**
 * Given a hero object (see data.js), this function generates a "card" showing
 *     the hero`s name, information, and colors.
 * @param hero  A hero object (see data.js)
 */
export const renderHeroCard = function(hero) {
    // TODO: Generate HTML elements to represent the hero
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    return `<div class="card column" style="border-color:${hero.backgroundColor}; border-style: solid; margin: 5px;">
                <div class="card-content">
                    <div class="media">
                        <div class="media-left">
                            <figure class="image is-48x48">
                                <span><img src="${hero.img}" alt="hero picture"></span>
                            </figure>
                        </div>
                        <div class="media-content" >
                            <p class="title is-4" style="border-color:${hero.color}; border-style: solid;"> ${hero.name} </p>
                            <p class="subtitle is-6">${hero.first} ${hero.last}</p>
                        </div>
                    </div>
                    <div class="content"> ${hero.description}
                        <br> <time> ${hero.firstSeen} </time> 
                    </div>
                    <div class="has-text-centered">
                        <button> edit </button>
                    </div>
                </div>
            </div>`;
};

/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function(hero) {
    // TODO: Generate HTML elements to represent the hero edit form
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    return `<form>
                <div class="columns" style="margin: 10px; border-color:${hero.backgroundColor}; border-style: solid;">
                    <div class="column is-one-third">
                        <b>${hero.name} </b>: Edit Form <br>
                        <label for="fname">First name:</label><br>
                            <input type="text" id="fname" name="fname" value="${hero.first}"><br>
                        <label for="lname">Last name:</label><br>
                            <input type="text" id="lname" name="lname" value="${hero.last}"><br>
                    </div>
                    <div class="column"><br>
                        <label for="superhero name">Hero name:</label><br>
                            <input type="text" id="heroname" name="heroname" value="${hero.name}"><br>
                        <label for="description">Description:</label><br>
                            <textarea name="description">${hero.description}</textarea><br>
                    </div>
                    <div class="column"><br>
                        <label for="firstseen">First seen date:</label><br>
                            <input type="date" pattern="\d{4}-\d{2}-\d{2}" value="${hero.firstSeen.toISOString().slice(0,10)}"><br>
                        <button type="submit"> Save </button>
                        <button type="button"> Cancel </button>
                    </div>
                </div>
            </form>` ;
};

/**
 * Given an array of hero objects, this function converts the data into HTML and
 *     loads it into the DOM.
 * @param heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $("#root");

    for(let i = 0; i < heroes.length; i++){
        //if(i==0) $root.append(`<div class="columns">`);
        $root.append(renderHeroCard(heroes[i]));
        /* if((i+1)%3==0 && i!=0) {
            $root.append(`</div>`)
            $root.append(`<div class="columns">`);
        } */
        //if(i==heroes.length-1) $root.append(`</div>`);
    }

    // Pick a hero from the list at random
    const randomHero = heroes[Math.floor(Math.random() * heroes.length)];

    $root.append(renderHeroEditForm(randomHero));
};

/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 * load handler:
 */
$(function() {
    loadHeroesIntoDOM(heroicData);
});