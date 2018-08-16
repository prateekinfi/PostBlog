function displaytabs(myid) {
    var id = document.getElementById(myid).id;
    document.getElementById('addTab').style.background = "#f5f5f5";
    document.getElementById('viewTab').style.background = "#f5f5f5";

    if (id == "viewTab") {
        setBlock("view");
        setNone("post");
        document.getElementById('addTab').style.background = "#e0e0e0";

    } else if (id == "addTab") {
        setBlock("post");
        setNone("view");
        document.getElementById('viewTab').style.background = "#e0e0e0";

    } 

}

function setBlock(str) {
    document.getElementById(str).style.display = "block";
}
function setNone(str) {
    document.getElementById(str).style.display = "none";
}