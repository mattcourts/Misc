console.log("test");

var phantom = require('phantom');
var system = require('system');
var fs = require('fs');

phantom.onError = (msg, trace) => {
  console.log("error: " + msg);
  phantom.exit();
}

if (system.args.length === 1) {
  console.log('Usage: tumblr.js <some URL>');
  phantom.exit();
}
var url = system.args[1];

phantom.create((ph)=>{
  ph.createPage((page)=>{
    page.open(url, (status)=>{
      if (status == 'success')
      {
        var oldCount = 0;
        window.setInterval(()=>{
          var count = page.content.match(/data-page-id/g);
          if (count != oldCount)
          {
            oldCount = count;
            page.evaluate(()=>{
              window.document.body.scrollTop = document.body.scrollHeight;
            })
          } else {
            var fileData = page.evaluate(()=>{
              var posts = document.getElementsByClassName("post-content");
              return posts.map((p)=>{
                if (p.children[0].includes('photo'))
                {
                  render(p.children[0].children[0].children[0].children[0].src)
                }
              });
              fs.writeFile('./tumblr.html', fileData, (err)=>{
                if(err) console.log(err);
              });
            });
            ph.exit();
          }
        });
      } else {
        console.log("unknown error");
        ph.exit();
      }
    })
  });
});
phantom.exit();
