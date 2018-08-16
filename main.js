
var database = firebase.database();
var ref = database.ref();
var formDb = database.ref("/posts");
var posts = [];
var arr = [];
var renderedPosts = [];
var rootRef = firebase.database().ref();


function renderPosts() {
    //  database.ref('posts/').set({0:obj});

    if (posts == null)
        ;
    else {
        var x = renderedPosts.length;


        document.getElementById('view').innerHTML = '';
        firebase.database().ref().once("value", function (snap) {

            var pCount = snap.val().postCount;
            // console.log(pCount);
            for (var i = x; i < posts.length + x; i++) {
                var obj = {};
                if (posts[i - x] != null)
                    obj[pCount] = posts[i - x];
                pCount++;
                formDb.update(obj);
                renderedPosts.push(posts[i - x]);
                console.log(pCount);
            }
            posts = [];
            database.ref('postCount').set(pCount);
        });


        firebase.database().ref().once("value", function (snap) {
            if (snap.val().posts == null)
                arr = [];
            else
                arr = Object.values(snap.val().posts);
            document.getElementById('view').innerHTML = '';

            for (var i = 0; i < arr.length; i++) {

                var elem = document.createElement('div');
                elem.id = `post${i}`;
                document.getElementById('view').appendChild(elem);
                var br = document.createElement('br');
                document.getElementById('view').appendChild(br);

                var obj = arr[i];

                elem.innerHTML = `<br><hr>
                <h3>${obj.title}</h3>   
                 ${obj.content}  <br>
                <b>Keywords:</b> ${obj.keywords}    <br>
                 <img src='${obj.picture}' alt='${obj.title}' align="right" width="132" height=132">  <br>
                <b>Time posted:</b> ${obj.date}<br>`;

                var likeDiv = document.createElement('div');
                likeDiv.id = `likeDiv${i}`;
                elem.appendChild(likeDiv);
                likeDiv.innerHTML = `<b>No. of likes: ${obj.likeCount}</b>`;

                var elem1 = document.createElement('form');
                elem1.id = `commentSection${i}`;
                elem.appendChild(elem1);

                var likeButton = document.createElement('input');
                likeButton.setAttribute('type', 'button');
                likeButton.setAttribute('name', 'likeButton');
                likeButton.setAttribute('value', 'Like Post');
                likeButton.setAttribute('id', `likeButton${i}`);
                likeButton.setAttribute('onclick', `onLike(${i})`);
                elem1.appendChild(likeButton);

                var br = document.createElement('br');
                elem1.appendChild(br);


                var commentName = document.createElement('input');
                commentName.setAttribute('type', 'text');
                commentName.setAttribute('name', 'userNameBox');
                commentName.setAttribute('placeholder', 'Enter Username');
                commentName.setAttribute('id', `userNameBox${i}`);
                elem1.appendChild(commentName);

                var commentContent = document.createElement('textarea');
                commentContent.setAttribute('name', 'commentContentBox');
                commentContent.setAttribute('rows', '2');
                commentContent.setAttribute('cols', '50');
                commentContent.setAttribute('style', 'vertical-align:top;');
                commentContent.setAttribute('placeholder', 'Enter Comment');
                commentContent.setAttribute('id', `commentContentBox${i}`);
                elem1.appendChild(commentContent);


                var commentButton = document.createElement('input');
                commentButton.setAttribute('type', 'button');
                commentButton.setAttribute('name', 'commentButton');
                commentButton.setAttribute('value', 'Comment');
                commentButton.setAttribute('id', `commentButton${i}`);
                commentButton.setAttribute('onclick', `onComment(${i})`);
                elem1.appendChild(commentButton);


                var commentDiv = document.createElement('div');
                commentDiv.id = `commentDiv${i}`;
                elem.appendChild(commentDiv);

            }
        });


    }

}

function addPost() {

    var d = new Date();
    var dateParam = d.toLocaleString();
    var titleParam = document.getElementById('postTitle').value;
    var contentParam = document.getElementById('postContent').value;
    var pictureParam = document.getElementById('picUrl').value;
    var keywordsParam = document.getElementById('postKeywords').value;

    var obj = {
        title: titleParam,
        content: contentParam,
        keywords: keywordsParam,
        picture: pictureParam,
        date: dateParam,
        likeCount: '0',
        comments: [''],
        commentCount: '0'
    }

    posts.push(obj);
    //  console.log(posts);
}

function onComment(id) {

    if (id != 'view') {
        var name = document.getElementById(`userNameBox${id}`).value;
        if(name=='')
        name='Anonymous';
        var content = document.getElementById(`commentContentBox${id}`).value;
        if(content=='')
        content='-';
        var d = new Date();
        var date = d.toLocaleString();
        var comment;
        comment = `<hr style="border-top: dotted 2px;margin-right:50%;" /><b>${name} </b> posted on <b>${date}</b>:
    <br><i>${content}</i>`;
        //renderedPosts[parseInt(id)].comments.push(comment);
        database.ref().once("value", function (snap) {

            var cCount = snap.val().posts[id].commentCount;
            console.log(cCount);

            database.ref('posts/' + id + '/comments/' + cCount).set(comment);
            cCount++;
            database.ref('posts/' + id + '/commentCount').set(cCount);

        });
    }

    database.ref().once("value", function (snap) {

        document.getElementById(`commentDiv${id}`).innerHTML = '';
        var str = '';

        if (snap.val().posts[id].comments == null)
            arr = [];
        else
            arr = Object.values(snap.val().posts[id].comments);


        for (var i = 0; i < arr.length; i++) {
            str += arr[i];
        }
        document.getElementById(`commentDiv${id}`).innerHTML = str;

    });
    setTimeout(function () {
        renderComments();
    }, 2500)
   

}
function renderComments() {


    database.ref().once("value", function (snap) {

        var str = '';

        if (snap.val().posts == null)
            arr = [];
        else
            arr = Object.values(snap.val().posts);

        for (var j=0;j<arr.length;j++) {

            document.getElementById(`commentDiv${j}`).innerHTML = '';
            var comArray=arr[j].comments;
            for (var i = 0; i < comArray.length; i++) {
                str += comArray[i];
            }
            document.getElementById(`commentDiv${j}`).innerHTML = str;
            str='';
        }
    });
 


}
function onLike(id) {

    firebase.database().ref().once("value", function (snap) {
        var c = (parseInt(snap.val().posts[id].likeCount)) + 1;
        firebase.database().ref("/posts/" + id).update({ likeCount: c });
        // renderedPosts[parseInt(id)].likeCount = c;
        document.getElementById(`likeDiv${id}`).innerHTML = `<b>No. of likes: ${c}</b>`;
    })

}




 



