async function renderFeed() {
    const result = await axios({
        method: 'get',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
        withCredentials: true,
    });
    let type;
    let body;
    let author;
    let created;
    for (let i = 0; i < 50; i++) {
        type = result.data[i].type;
        body = result.data[i].body;
        author = result.data[i].author;
        created = new Date(result.data[i].createdAt);
        created = created.toString().slice(0, 24);

        let tweet = document.createElement("div");
        tweet.classList.add("card", "column", "is-one-third", "is-spaced")
        let content_div = document.createElement("div");
        content_div.classList.add("card-content");
        let tweetinfo_div = document.createElement("div");
        tweetinfo_div.classList.add("media-content");
        let author_p = document.createElement("p");
        author_p.classList.add("subtitle");
        author_p.innerHTML = author;
        let time_p = document.createElement("p");
        time_p.classList.add("subtitle");
        time_p.innerHTML = created;
        let space = document.createElement("br");
        let body_div = document.createElement("div");
        body_div.classList.add("content", "title");
        body_div.innerHTML = body;
        let likes_p = document.createElement("p");
        likes_p.classList.add("subtitle")

        tweetinfo_div.appendChild(author_p);
        tweetinfo_div.appendChild(time_p);
        tweetinfo_div.appendChild(space);
        content_div.appendChild(tweetinfo_div);
        content_div.appendChild(body_div);
        tweet.appendChild(content_div);

        if (result.data[i].isMine) {
            let footer_div = document.createElement("footer");
            footer_div.classList.add("card-footer");
            let edit_button = document.createElement("button");
            edit_button.classList.add("card-footer-item", "button", "edit-button");
            edit_button.innerHTML = "Edit";
            edit_button.setAttribute("tweet-id", result.data[i].id);
            $('.edit-button').on('click', handleEditTweet);
            let delete_button = document.createElement("button");
            delete_button.classList.add("card-footer-item", "button", "delete-button");
            delete_button.innerHTML = "Delete";
            $('.delete-button').on('click', handleDeleteTweet);
            footer_div.appendChild(edit_button);
            footer_div.appendChild(delete_button);
            tweet.appendChild(footer_div);
        }

        document.getElementById("root").appendChild(tweet);
    }
};

function renderTweetWriter() {
    return `
        <div class="columns is-multiline">
            <div class="column is-four-fifths">
                <textarea id="written-tweet" class="textarea is-info" placeholder="Write your tweet here, if you so dare" 
                rows="2"></textarea>
            <div>
            <div class="column editor-buttons">
                <button id="send-tweet" class="button is-info is-light"> Send Tweet </button>
                <button id="cancel-tweet" class="button is-danger is-light"> Cancel </button>
            </div>
        </div>
    `;
}

function renderTweetEditor(body) {
    return `
    <textarea id="written-tweet" class="textarea is-info" placeholder="Edit tweet" 
    rows="2">${body}</textarea>
    `;
}

function renderSaveEditButton(tweet_id) {
    return `
    <button class="card-footer-item button save-edits-button" tweet-id="${tweet_id}">Save</button>
    `;
}

function renderCancelEditButton() {
    return `
    <button class="card-footer-item button cancel-edits-button">Cancel</button>
    `;
}

function handleEditTweet(event) {
    let tweet = $(event.target).closest('.card').find('.content').html();
    let tweet_id = $(event.target).closest('.card').find('.edit-button').attr('tweet-id');
    $(event.target).closest('.card').find('.content').replaceWith(renderTweetEditor(tweet));
    $(event.target).closest('.card').find('.delete-button').replaceWith(renderCancelEditButton());
    $(event.target).closest('.card').find('.edit-button').replaceWith(renderSaveEditButton(tweet_id));
    $('.save-edits-button').on('click', handleSaveEdits);
    $('.cancel-edits-button').on('click', handleCancelEdits);
}

async function handleSaveEdits(event) {
    let body = $(event.target).closest('.card').find('.save-edits-button').val();
    let id = $(event.target).closest('.card').find('.save-edits-button').attr("tweet-id");
    let url = "https://comp426-1fa20.cs.unc.edu/a09/tweets/" + id.toString();
    console.log(url);
    try {
        const result = await axios({
            method: 'put',
            url,
            withCredentials: true,
            data: {
                body,
            },
        });
    } catch {
        console.log("error saving edits to tweet");
    }
}

function handleCancelEdits(event) {

}

function handleDeleteTweet(event) {

}

function handleWriteTweet(event) {
    $('#tweet-editor').empty().append(renderTweetWriter());
    $('#send-tweet').on('click', handleSendTweet);
    $('#cancel-tweet').on('click', handleCancelTweet);
};

function handleCancelTweet(event) {
    $('#tweet-editor').empty();
}

async function handleSendTweet(event) {
    try {
        const result = await axios({
            method: 'post',
            url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
            withCredentials: true,
            data: {
                body: $('#written-tweet').val(),
            }
        });
    } catch {
        console.log("error sending tweet");
    }
    handleCancelTweet();
}

function setListeners() {
    $('#write-tweet').on('click', handleWriteTweet);
}

const handleEditButtonPress = function(event) {
    // TODO: Render the hero edit form for the clicked hero and replace the
    //       hero's card in the DOM with their edit form instead
    let hero = heroicData.find((h) => h.id == $(event.target).closest('.hero-card').data('id'));
    $(event.target).closest('.hero-card').replaceWith(renderHeroEditForm(hero));
};

$(() => {
    console.log("loaded");
    setListeners();
    renderFeed();
});