
 const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');

const app = express();

const server = http.createServer((req,res)=> {


    app.post('/sendEmail',(req,res)=> {
        
        console.log('in post method');

        const transporter = nodemailer.createTransport({
            service: 'gmail.com',
            auth: {
                user: 'seoyoung.hwng@gmail.com',
                pass: 'hhahsyppsskk'
            }
        
        });
        
        const mailOptions = {
            from: req.body.email,
            to: 'suhyoung1030@gmail.com',
            subject: req.body.subject,
            text: req.body.content,
        }
        
        transporter.sendMail(mailOptions, (err, info) => {
            if(err) {
                console.log(err);
            }
            alert('email success!');
        })
    
        response = {
            name: req.body.name,
            email: req.body.email,
            content: req.body.email,
        }
    
        console.log(response);
    
        res.end(JSON.stringify(response));
    })
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



