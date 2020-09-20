/**
 * Course: COMP 426
 * Assignment: a05
 * Author: Rushil Shah
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
    return  `<div class="card hero-card column is-one-third" style="border-color:${hero.backgroundColor}; border-style: solid; margin: 5px;" data-id="${hero.id}">
                <div class="card-content">
                    <div class="media">
                        <div class="media-left">
                            <figure class="image is-48x48">
                                <span><img src="${hero.img}" alt="hero picture"></span>
                            </figure>
                        </div>
                        <div class="media-content" >
                            <p class="title is-4" style="border-color:${hero.color}; border-style: solid; padding: 2px;"> ${hero.name} </p>
                            <p class="subtitle is-6">${hero.first} ${hero.last}</p>
                        </div>
                    </div>
                    <div class="content"> ${hero.description}
                        <br> <time class="has-text-weight-light"> First seen: ${hero.firstSeen.toISOString().slice(0,10)} </time> 
                    </div>
                    <div class="has-text-centered">
                        <button class="edit-hero"> Edit hero </button>
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
    return  `<form class="edit-form" data-id="${hero.id}">
                <div class="column" style="margin: 5px; border-color:${hero.backgroundColor}; border-style: solid; width: 34vw"> <br>
                    <b>${hero.name} </b>Edit Form <br> <br>
                    <label for="fname">First name:</label> <br>
                        <input type="text" class="fname" name="fname" value="${hero.first}"> <br>
                    <label for="lname">Last name:</label> <br>
                        <input type="text" class="lname" name="lname" value="${hero.last}"> <br>
                    <br>
                    <label for="superhero name">Hero name:</label> <br>
                        <input type="text" class="hname" name="heroname" value="${hero.name}"> <br>
                    <label for="description">Description:</label> <br>
                        <textarea class="description" name="description">${hero.description}</textarea> <br>
                    <br>
                    <label for="firstseen">First seen date:</label> <br>
                        <input class="date" type="date" pattern="\d{4}-\d{2}-\d{2}" value="${hero.firstSeen.toISOString().slice(0,10)}"><br>
                    <br>
                    <div class="has-text-centered">
                        <button type="submit" class="save-edit"> Save </button>
                        <button type="button" class="cancel-edit"> Cancel </button>
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
    let hero = heroicData.find((h) => h.id == $(event.target).closest('.hero-card').data('id'));
    $(event.target).closest('.hero-card').replaceWith(renderHeroEditForm(hero));
};

/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleCancelButtonPress = function(event) {
    // TODO: Render the hero card for the clicked hero and replace the
    //       hero's edit form in the DOM with their card instead
    let hero = heroicData.find((h) => h.id == $(event.target).closest('.edit-form').data('id'));
    $(event.target).closest('.edit-form').replaceWith(renderHeroCard(hero));
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
    // event.preventDefault();
    let old_hero = heroicData.find((h) => h.id == $(event.target).closest('.edit-form').data('id'));
    
    let newfirst = $(event.target).closest('.edit-form').find('.fname').val();
    let newlast = $(event.target).closest('.edit-form').find('.lname').val();
    let newname = $(event.target).closest('.edit-form').find('.hname').val();
    let newdescription = $(event.target).closest('.edit-form').find('.description').val();
    let newdate = $(event.target).closest('.edit-form').find('.date').val();
    let newdateobj = new Date(newdate.split('-')[0],newdate.split('-')[1],newdate.split('-')[2]);
    let newhero = {
        id: old_hero.id,
        first: newfirst,
        last: newlast,
        name: newname,
        img: old_hero.img,
        color: old_hero.color,
        backgroundColor: old_hero.backgroundColor,
        subtitle: old_hero.subtitle,
        description: newdescription,
        firstSeen: newdateobj,
    };

    heroicData[(old_hero.id)-1].first = newfirst;
    heroicData[(old_hero.id)-1].last = newlast;
    heroicData[(old_hero.id)-1].name = newname;
    heroicData[(old_hero.id)-1].description = newdescription;
    heroicData[(old_hero.id)-1].date = newdateobj;

    debugger;
    $(event.target).closest('.edit-form').replaceWith(renderHeroCard(newhero));
    $('.edit-hero').on('click', handleEditButtonPress);
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
        toAppend += renderHeroCard(heroes[i]);
        if ((i+1)%3 == 0 && i != 0) toAppend += (`</div> <div class="columns">`);
        if (i == heroes.length-1) toAppend += (`</div>`);
    }
    $root.append(toAppend);

    // TODO: Use jQuery to add handleEditButtonPress() as an event handler for
    //       clicking the edit button
    $('.edit-hero').on('click', handleEditButtonPress);

    // TODO: Use jQuery to add handleEditFormSubmit() as an event handler for
    //       submitting the form
    $('body').on('click', 'button.save-edit', handleEditFormSubmit);

    // TODO: Use jQuery to add handleCancelButtonPress() as an event handler for
    //       clicking the cancel button
    $('body').on('click', 'button.cancel-edit', handleCancelButtonPress);

};

/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function() {
    loadHeroesIntoDOM(heroicData);
});