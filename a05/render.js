/**
 * Course: COMP 426
 * Assignment: a05
 * Author: <type your name here>
 *
 * This script uses jQuery to build an HTML page with content taken from the
 * data defined in data.js.
 */



/**
 * Given a hero object (see data.js), this function generates a "card" showing
 *     the hero's name, information, and colors.
 * @param hero  A hero object (see data.js)
 */
export const renderHeroCard = function(hero) {
    return  `<div class="card column" style="border-color:${hero.backgroundColor}; border-style: solid; margin: 5px;">
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
    return  `<form>
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
 * Handles the JavaScript event representing a user clicking on the "edit"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditButtonPress = function(event) {
    // TODO: Render the hero edit form for the clicked hero and replace the
    //       hero's card in the DOM with their edit form instead
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleCancelButtonPress = function(event) {
    // TODO: Render the hero card for the clicked hero and replace the
    //       hero's edit form in the DOM with their card instead
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditFormSubmit = function(event) {
    // TODO: Render the hero card using the updated field values from the
    //       submitted form and replace the hero's edit form in the DOM with
    //       their updated card instead
};



/**
 * Given an array of hero objects, this function converts the data into HTML,
 *     loads it into the DOM, and adds event handlers.
 * @param  heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    // Grab a jQuery reference to the root HTML element
    const $root = $("#root");

    for(let i = 0; i < heroes.length; i++){
        $root.append(renderHeroCard(heroes[i]));
    }

    // TODO: Use jQuery to add handleEditButtonPress() as an event handler for
    //       clicking the edit button

    // TODO: Use jQuery to add handleEditFormSubmit() as an event handler for
    //       submitting the form

    // TODO: Use jQuery to add handleCancelButtonPress() as an event handler for
    //       clicking the cancel button
};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function() {
    loadHeroesIntoDOM(heroicData);
});
