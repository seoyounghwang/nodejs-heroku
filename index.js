// const Info = require('./info');
// const info1 = new Info("Seoyoung",45);
// info1.greeting();
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req,res)=> {
    // console.log(req.url);//'/' 
    // if(req.url==='/') {
    //     fs.readFile(path.join(__dirname,'public','index.html'),
    //     (err,content) => {
    //         if(err) throw err;
    //         res.writeHead(200,{'Content-type':'text/html'});//means everything is okay
    //         res.end(content);
    //     });

    // }

    // if(req.url==='/api/users') {
    //     //rest api
    //     const users = [
    //         {name:'yugy',age:22},
    //         {name:'seoyoung',age:25}
    //     ];
    //     res.writeHead(200,{'Content-type':'application/json'});
    //     res.end(JSON.stringify(users));

    // }
    
    /********************make file path DYNAMIC */
    //build file path
    //set this to request url.. root is kinda different 3항 연산자 이용
        //     fs.readFile(path.join(__dirname,'public','index.html'),
    let filePath = path.join(__dirname,'public',req.url ==='/' ? 'index.html': req.url);

    //console.log(filePath);
    //res.end();

    //extension of File
    let extname = path.extname(filePath);

    //Initial content type 
    let contentType = 'text/html';

    //Chectk extension and set content type
    switch(extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    //Read(load) file
    
    fs.readFile(filePath,(err,content)=>{
        console.log(filePath);
        if(err) {
            if(err.code==='ENOENT') {
                //page not found
                fs.readFile(path.join(__dirname,'public','404.html'),
                (err,content)=> {
                    res.writeHead(200, {'Content-Type': contentType});
                    res.end(content,'utf-8');
                })
            } else {
                //Some server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            //Success
            console.log('success');
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content,'utf-8');
        }

    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT,()=>console.log(`Server running on port ${PORT}`));//callback

