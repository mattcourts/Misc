/*
*
*  parses blackboard pages
*  MUST SEARCH AUTHOR FIRST!!!
*  pulls all class="entry" list elements containing discussion posts
*  returns json {author,id, post}
*
confirmed works on: herzing, central michigan, northeastern
fails on:
*/

function createWindow(data)
{
  myWindow = window.open("data: text/html;charset=utf8," + encodeURIComponent(data));
}

function map(array, transform)
{
  var results = [];
  for (var i = 0; i < array.length; i++)
  {
    results.push(transform(array[i]));
  }
  return results;
}

function parseBlackboard()
{
  var results = [];
  var html = document.getElementsByClassName('dbThread');
  var elements = map(html, function(v) { return [v] });

  results = elements.map(function(e)
  {
    var authort = e[0].children[1].children[0].children[0].children[5].children[0].children[0].childNodes[2].textContent;
      return {
        id: e[0].children[1].id,
        author: authort.replace(/^\s+|\s+$/g, ''),
        post: e[0].children[1].children[1].children[0].innerText
      }
  });

  return results;
}

createWindow(parseBlackboard().filter(
  function(e) {
    return e.author === "Bari Courts"
  }).map(
    function(p){
       return "<pre>" + p.post + "</pre>";
  })
);
