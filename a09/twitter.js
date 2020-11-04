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
    let likes;
    let retweets;
    for (let i = 0; i < 50; i++) {
        type = result.data[i].type;
        body = result.data[i].body;
        author = result.data[i].author;
        created = new Date(result.data[i].createdAt);
        created = created.toString().slice(0, 24);
        likes = result.data[i].likeCount;
        retweets = result.data[i].retweetCount;

        let tweet = document.createElement("div");
        tweet.classList.add("card", "column", "is-one-third", "is-spaced")
        tweet.setAttribute("tweet-id", result.data[i].id);
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
        let likesretweets = document.createElement("div");
        likesretweets.classList.add("columns");
        let lr_info = document.createElement("div");
        lr_info.classList.add("column", "is-two-thirds");
        let likes_p = document.createElement("p");
        likes_p.classList.add("is-small")
        likes_p.innerHTML = likes.toString() + ' likes';
        let retweets_p = document.createElement("p");
        retweets_p.classList.add("is-small")
        retweets_p.innerHTML = retweets.toString() + ' retweets';
        if (result.data[i].isLiked) {
            likes_p.innerHTML += " (you have liked this tweet)";
        }
        let lr_btns = document.createElement("div");
        lr_btns.classList.add("column");
        let like_btn = document.createElement("button");
        like_btn.classList.add("button", "is-dark", "is-outlined", "like-tweet-btn", "is-small");
        like_btn.innerHTML = "Like Tweet";
        let rtwt_btn = document.createElement("button");
        rtwt_btn.classList.add("button", "is-dark", "is-outlined", "rtwt-btn", "is-small");
        rtwt_btn.innerHTML = "Retweet";

        tweetinfo_div.appendChild(author_p);
        tweetinfo_div.appendChild(time_p);
        tweetinfo_div.appendChild(space);
        content_div.appendChild(tweetinfo_div);
        content_div.appendChild(body_div);
        lr_info.appendChild(likes_p);
        lr_info.appendChild(retweets_p);
        likesretweets.appendChild(lr_info);
        lr_btns.appendChild(like_btn);
        lr_btns.appendChild(rtwt_btn);
        likesretweets.appendChild(lr_btns);
        content_div.appendChild(likesretweets);
        tweet.appendChild(content_div);

        if (result.data[i].isMine) {
            let footer_div = document.createElement("footer");
            footer_div.classList.add("card-footer");
            let edit_button = document.createElement("button");
            edit_button.classList.add("card-footer-item", "button", "edit-button");
            edit_button.innerHTML = "Edit";
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

async function renderTweetByID(id) {

}

function renderTweetWriter() {
    return `
        <div class="columns is-multiline">
            <div class="column is-four-fifths">
                <textarea id="written-tweet" class="textarea is-info" placeholder="Write your tweet here, if you so dare" 
                rows="2"></textarea>
            <div>
            <div class="column editor-buttons">
                <button id="send-tweet" class="button is-info is-light" type="submit"> Send Tweet </button>
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
    let tweet_id = $(event.target).closest('.card').attr('tweet-id');
    $(event.target).closest('.card').find('.content').replaceWith(renderTweetEditor(tweet));
    $(event.target).closest('.card').find('.delete-button').replaceWith(renderCancelEditButton());
    $(event.target).closest('.card').find('.edit-button').replaceWith(renderSaveEditButton(tweet_id));
    $('.save-edits-button').on('click', handleSaveEdits);
    $('.cancel-edits-button').on('click', handleCancelEdits);
}

async function handleSaveEdits(event) {
    let body = $(event.target).closest('.card').find('.save-edits-button').val();
    let id = $(event.target).closest('.card').attr("tweet-id");
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

async function handleDeleteTweet(event) {
    let id = $(event.target).closest('.card').attr("tweet-id");
    let url = "https://comp426-1fa20.cs.unc.edu/a09/tweets/" + id.toString();
    console.log(url);
    try {
        const result = await axios({
            method: 'delete',
            url,
            withCredentials: true,
        });
    } catch {
        console.log("error deleting tweet");
    }
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

function handleLikeTweet(event) {
    alert('you liked a goddamn tweet');
}

async function handleRetweet(event) {

}

function setListeners() {
    $('#write-tweet').on('click', handleWriteTweet);
    $('.like-tweet-btn').on('click', handleLikeTweet);
    $('.rtwt-btn').on('click', handleRetweet);
}

const handleEditButtonPress = function(event) {
    // TODO: Render the hero edit form for the clicked hero and replace the
    //       hero's card in the DOM with their edit form instead
    let hero = heroicData.find((h) => h.id == $(event.target).closest('.hero-card').data('id'));
    $(event.target).closest('.hero-card').replaceWith(renderHeroEditForm(hero));
};

$(() => {
    console.log("loaded");
    renderFeed();
    setListeners();

});