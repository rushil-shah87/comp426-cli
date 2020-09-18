/**
 * Course: COMP 426
 * Assignment: a05
 * Author: Rushil Shah
 *
 * This script uses jQuery to build an HTML page with content taken from the
 * data defined in data.js.
 */

import { event } from "jquery";

/**
 * Given a hero object (see data.js), this function generates a "card" showing
 *     the hero's name, information, and colors.
 * @param hero  A hero object (see data.js)
 */
export const renderHeroCard = function(hero) {
    return  `<div class="card column is-one-third" style="border-color:${hero.backgroundColor}; border-style: solid; margin: 5px;">
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
                        <button class="hero-edit"> Edit hero </button>
                    </div>
                </div>
            </div>` ;
};

/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function(hero) {
    return  `<form>
                <div class="columns is-one-third" style="margin: 10px; border-color:${hero.backgroundColor}; border-style: solid;">
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
                        <button type="submit" class="edit-save"> Save </button>
                        <button type="button" class="edit-cancel"> Cancel </button>
                    </div>
                </div>
            </form>` ;
};

/**
 * Handles the JavaScript event representing a user clicking on the "edit"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditButtonPress = function(e) {
    // TODO: Render the hero edit form for the clicked hero and replace the
    //       hero's card in the DOM with their edit form instead
    alert('edit button pressed');
};

/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleCancelButtonPress = function(e) {
    // TODO: Render the hero card for the clicked hero and replace the
    //       hero's edit form in the DOM with their card instead
};

/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditFormSubmit = function(e) {
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
    // jQuery reference to the root HTML element
    const $root = $('#root');

    // Display all hero cards in columns of 3
    let toAppend = (`<div class="columns">`);
    for(let i = 0; i < heroes.length; i++){
        toAppend += (renderHeroCard(heroes[i]));
        if ((i+1)%3 == 0 && i != 0) toAppend += (`</div><div class="columns">`);
        if (i == heroes.length-1) toAppend += (`</div>`);
    }
    $root.append(toAppend);

    // TODO: Use jQuery to add handleEditButtonPress() as an event handler for
    //       clicking the edit button
    $('.hero-edit').on('click', handleEditButtonPress(event), false);

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

const heroicData = [{
    id: 1,
    first: "Tony",
    last: "Stark",
    name: "Iron Man",
    img: "icons/ironman.png",
    color: "#931815",
    backgroundColor: "#f39c11",
    subtitle: "The Armored Avenger",
    description: "When billionaire industrialist Tony Stark dons his sophisticated armor, he becomes a living high-tech weapon. Tony uses his ultra modern creation alongside the Avengers fighting for the greater good.",
    firstSeen: new Date(1963, 3),
}, {
    id: 2,
    first: "Scott",
    last: "Lang",
    name: "Ant-Man",
    img: "icons/antman.png",
    color: "#505050",
    backgroundColor: "#f1c40d",
    subtitle: "The Smallest Avenger",
    description: "Scott Lang stole an advanced size-altering suit to aid his ailing daughter, only to discover that the stolen tech belonged to the world-renowned Dr. Hank Pym. Recognizing his potential, Dr. Pym foresaw the hero Scott would soon become.",
    firstSeen: new Date(1962, 9),
}, {
    id: 3,
    first: "Natasha",
    last: "Romanova",
    name: "Black Widow",
    img: "icons/blackwidow.png",
    color: "#d43600",
    backgroundColor: "#323232",
    subtitle: "The Spy Avenger",
    description: "Trained extensively in the art of espionage and outfitted with state-of-the-art equipment, don't cross Black Widow! Her combat skills makes her one of S.H.I.E.L.D's most valuable agents and a true Avenger.",
    firstSeen: new Date(1964, 4),
}, {
    id: 4,
    first: "Steve",
    last: "Rogers",
    name: "Captain America",
    img: "icons/captainamerica.png",
    color: "#174869",
    backgroundColor: "#c1382b",
    subtitle: "The First Avenger",
    description: "During World War II, soldier Steve Rogers was injected with an experimental super-serum that gave him heightened endurance, strength, and reaction time. After decades spent frozen in ice, Rogers is back to defend the universe with his indestructible Vibranium shield.",
    firstSeen: new Date(1941, 3),
}, {
    id: 5,
    first: "Bruce",
    last: "Banner",
    name: "The Hulk",
    img: "icons/hulk.png",
    color: "#323232",
    backgroundColor: "#55a148",
    subtitle: "The Strongest Avenger",
    description: "A massive dose of gamma radiation transformed the brilliant but meek scientist Bruce Banner's DNA, awakening the Hulk. A hero of few words and incredible strength, he helps smash unimaginable threats that no Avenger could face alone.",
    firstSeen: new Date(1962, 5),
}, {
    id: 6,
    first: "Thor",
    last: "Odinson",
    name: "Thor",
    img: "icons/thor.png",
    color: "#bdbdbd",
    backgroundColor: "#505050",
    subtitle: "The Mightiest Avenger",
    description: "Nordic legend tells the tale of Thor, son of Odin and heir to the throne of Asgard. Thor's strength, endurance, and quest for battle are greater than his Asgardian brethren. Wielding his enchanted hammer, Thor is master of thunder and lightning.",
    firstSeen: new Date(1962, 8),
}, {
    id: 7,
    first: "Nick",
    last: "Fury",
    name: "Nick Fury",
    img: "icons/nickfury.png",
    color: "#323232",
    backgroundColor: "#e67e22",
    subtitle: "The Avenger Director",
    description: "Nick Fury became an elite member of the U.S. intelligence team because of his intellect and integrity. Trained as a paratrooper, Ranger, demolitions expert and vehicle specialist, Nick Fury keeps his youth by the mysterious Infinity Formula.",
    firstSeen: new Date(1963, 5),
}, {
    id: 8,
    first: "Clint",
    last: "Barton",
    name: "Hawkeye",
    img: "icons/hawkeye.png",
    color: "#1e1c73",
    backgroundColor: "#8d43ac",
    subtitle: "The Archer Avenger",
    description: "With perfect accuracy and a quiver of trick arrows, Clint Barton's wit is usually faster than his lightning-quick reflexes. Though he doesn't always follow the rules, Hawkeye has proved himself an invaluable member of the Avengers.",
    firstSeen: new Date(1964, 9),
}];
