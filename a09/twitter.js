let tweets = [];
const base_url = "https://comp426-1fa20.cs.unc.edu/a09/tweets/";
async function renderFeed() {
    tweets = await axios({
        method: 'get',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
        withCredentials: true,
    });
    let body;
    let author;
    let created;
    let likes;
    let retweets;
    let id;
    for (let i = 0; i < 50; i++) {
        type = tweets.data[i].type;
        body = tweets.data[i].body;
        author = tweets.data[i].author;
        created = new Date(tweets.data[i].createdAt);
        created = created.toString().slice(0, 24);
        likes = tweets.data[i].likeCount;
        retweets = tweets.data[i].retweetCount;
        id = tweets.data[i].id;

        let tweet = document.createElement("div");
        tweet.classList.add("card", "column", "is-one-third", "is-spaced")
        tweet.setAttribute("tweet-id", id);
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
        if (tweets.data[i].isLiked) {
            likes_p.innerHTML += " (you)";
        }
        let lr_btns = document.createElement("div");
        lr_btns.classList.add("column");
        let like_btn = document.createElement("button");
        like_btn.classList.add("button", "is-dark", "is-outlined", "like-tweet-btn", "is-small");
        like_btn.innerHTML = "Toggle Like";
        let rtwt_btn = document.createElement("button");
        rtwt_btn.classList.add("button", "is-dark", "is-outlined", "rtwt-btn", "is-small");
        rtwt_btn.innerHTML = "Retweet";
        let reply_btn = document.createElement("button");
        reply_btn.classList.add("button", "is-dark", "is-outlined", "reply-btn", "is-small");
        reply_btn.innerHTML = "Reply";

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
        lr_btns.appendChild(reply_btn);
        likesretweets.appendChild(lr_btns);
        content_div.appendChild(likesretweets);
        tweet.appendChild(content_div);

        if (tweets.data[i].isMine) {
            let footer_div = document.createElement("footer");
            footer_div.classList.add("card-footer", "no-border", "is-centered");
            let edit_button = renderEditButton();
            $('.edit-button').on('click', handleEditTweet);
            let delete_button = renderDeleteButton();
            $('.delete-button').on('click', handleDeleteTweet);
            footer_div.appendChild(edit_button);
            footer_div.appendChild(delete_button);
            tweet.appendChild(footer_div);
        }

        document.getElementById("root").appendChild(tweet);
    }
    $('.like-tweet-btn').on('click', handleLikeButton);
    $('.rtwt-btn').on('click', handleRetweet);
};

function renderEditButton() {
    let btn = document.createElement("button");
    btn.classList.add("button", "edit-button", );
    btn.innerHTML = "Edit";
    return btn;
}

function renderDeleteButton() {
    let btn = document.createElement("button");
    btn.classList.add("button", "delete-button");
    btn.innerHTML = "Delete";
    return btn;
}

function renderTweetByID(tweet_id) {
    let body = tweets.data.find(i => i.id == tweet_id).body;
    let content = document.createElement("div");
    content.classList.add("content", "title");
    content.innerHTML = body;
    return content;
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
    <button class="button save-edits-button" tweet-id="${tweet_id}">Save</button>
    `;
}

function renderCancelEditButton() {
    return `
    <button class="button cancel-edits-button">Cancel</button>
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
    let body = $(event.target).closest('.card').find('#written-tweet').val().toString();
    let id = $(event.target).closest('.card').attr("tweet-id");
    let url = base_url + id;
    const result = await axios({
        method: 'put',
        url,
        withCredentials: true,
        data: {
            body,
        },
    });
}

// for cancel button when editing a tweet
function handleCancelEdits(event) {
    let tweet_id = $(event.target).closest('.card').attr('tweet-id');
    $(event.target).closest('.card').find('#written-tweet').replaceWith(renderTweetByID(tweet_id));
    $(event.target).closest('.card').find('.save-edits-button').replaceWith(renderEditButton());
    $(event.target).closest('.card').find('.cancel-edits-button').replaceWith(renderDeleteButton());
    $('.edit-button').on('click', handleEditTweet);
    $('.delete-button').on('click', handleDeleteTweet);
}

// for delete button on active user-published tweets
async function handleDeleteTweet(event) {
    let id = $(event.target).closest('.card').attr("tweet-id");
    let url = base_url + id;
    const result = await axios({
        method: 'delete',
        url,
        withCredentials: true,
    });
}

// for writing a new tweet
function handleWriteTweet(event) {
    $('#tweet-editor').empty().append(renderTweetWriter());
    $('#send-tweet').on('click', handleSendTweet);
    $('#cancel-tweet').on('click', handleCancelTweet);
};

// cancel writing a new tweet
function handleCancelTweet(event) {
    $('#tweet-editor').empty();
}

// publishing a new tweet
async function handleSendTweet(event) {
    const result = await axios({
        method: 'post',
        url: base_url,
        withCredentials: true,
        data: {
            body: $('#written-tweet').val(),
        }
    });
    handleCancelTweet();
}

async function handleLikeButton(event) {
    let tweet_id = $(event.target).closest('.card').attr("tweet-id");
    let url = base_url + tweet_id + "/" + (tweets.data.find(i => i.id == tweet_id).isLiked ? "unlike" : "like");
    const result = await axios({
        method: 'put',
        url,
        withCredentials: true,
    });
}

function renderRetweetReplyBox() {
    return `
    <textarea id="rt-reply" class="textarea is-info" placeholder="Write a retweet/reply" 
    rows="2"></textarea> <br>
    `;
}

async function handleRetweet(event) {
    $(renderRetweetReplyBox()).insertBefore($(event.target).closest('.card').find($('.card-footer')));
    let tweet_id = $(event.target).closest('.card').attr("tweet-id");
    let body = $('#rt-reply').html();
    const result = await axios({
        method: 'post',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
            "type": "retweet",
            "parent": tweet_id,
            body,
        },
    });
}

function setListeners() {
    $('#write-tweet').on('click', handleWriteTweet);
}

$(() => {
    renderFeed();
    setListeners();
});