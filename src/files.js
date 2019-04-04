var url = require('url');
var request = require('superagent');
function loadFiles(root, cb){
    request.get(root).end((err,res)=>{
        if(err){
            return cb(err);
        }
        var element = document.createElement('div');
        element.innerHTML = res.text;
        var links = element.querySelectorAll('a');
        var files = [];
        links.forEach((linkElement) => {
            var parsed = url.parse(linkElement.href);
            var path = parsed.path.substr(1);
            var src = url.resolve(root,path);

            files.push(src);
            console.log(src);    
        });
        cb(null, files);
    });
    
}
export default loadFiles;
//loadFiles('http://localhost:8000');