//use advance search, enter author and select the target discussion.  Run this code below

var temp = [];
var posts = [];

function createWindow(data)
{
  myWindow = window.open("data: text/html," + escape("<pre>"+ data.replace(/[\u2018\u2019]/g, "'") + "</pre>"));
}

var temp = document.getElementsByClassName('posting');

var posts = $.map(temp, function(v) { return [v] });
posts.push();

createWindow(
    posts.map((post)=>{
        return post.innerText;
    }).reduce((list, post) => {
        return list = list + "<br>" + post;
    })
);
