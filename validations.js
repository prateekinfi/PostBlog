


//   document.addEventListener("DOMContentLoaded", function(event) {


// });


window.onload = function () {
    fillDate();
    renderPosts();

}

function clickViewTab(id){
    //  alert(id);
       displaytabs(id);
       renderPosts();
    //    setTimeout(function () {
    //        renderComments();
    //    }, 2500)
   }
   



function fillDate() {

    var d = new Date();
    var date = d.toLocaleString();
    document.getElementById("postDate").innerHTML = date;
    document.getElementById("dateHidden").value = date;

}

function validateTitle() {

    document.getElementById('postButton').disabled = false;
    var pattern = "^[a-zA-Z0-9 ]{0,160}$";
    var str = "";
    str = document.getElementById('postTitle').value;
    //  alert(str);
    if (!str.match(pattern)) {

        document.getElementById('errTitle').innerHTML = 'Title should be alphabets or numbers only and not more than 160 characters.';
        document.getElementById('errTitle').style.color = 'red';
        document.getElementById('postButton').disabled = true;
    } else {
        document.getElementById('errTitle').innerHTML = '';
    }
}
function validateContent() {
    //alert('dsd');

    document.getElementById('postButton').disabled = false;
    var str = "";
    str = document.getElementById('postContent').value;
    //  alert(str);
    if (str.length > 1000) {

        document.getElementById('errContent').innerHTML = 'Content\'s character limit is 1000 characters.';
        document.getElementById('errContent').style.color = 'red';
        document.getElementById('postButton').disabled = true;
    } else {
        document.getElementById('errContent').innerHTML = '';
    }
}
function validateKeywords() {
    //alert('dsd');

    document.getElementById('postButton').disabled = false;
    var str = "";
    str = document.getElementById('postKeywords').value;
    //alert(str);

    var a = str.split(',');
    // console.log(a.length);


    if (a.length > 25) {

        document.getElementById('errKeywords').innerHTML = 'Maximum 25 keywords.';
        document.getElementById('errKeywords').style.color = 'red';
        document.getElementById('postButton').disabled = true;
    } else {
        document.getElementById('errKeywords').innerHTML = '';
    }
}

