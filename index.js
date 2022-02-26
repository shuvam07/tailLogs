const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const fs = require('fs')

const file_path = "log.txt"

// io.path("/")

var last_modified = -1;
var last_read_position = -1;
let fsWait = false;
let count = 0;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

	fs.watch(file_path, (event , filename) => {
		// console.log(event)
	    if(filename){
	        if(fsWait) return;
	        // fsWait = setTimeout( () => {
	        //     fsWait = false;
	        // }, 100);

	        fs.stat(file_path, function(err, stats){
			    var mtime = stats.mtime;
			    var text = new Buffer.alloc(1000);
			    var s = ""
			    console.log(last_read_position, mtime)
			    if(last_modified != mtime){
			    	last_modified = mtime
					var position = stats.size - 1;
					var lines = 0;
					var fd;
					fd = fs.openSync(file_path, 'r+')
					while(lines<=10 && last_read_position < position){
						// console.log("inside while")
						bytes = fs.readSync(fd, text, 0, 1,
				        position);
				        // console.log("Bytes" , bytes);
				  
			            if (bytes > 0) {
			            	var ch = text.
			                    slice(0, bytes).toString();
			                if(ch=='\n') {lines++; ch = "\r\n";}
			                position --;
			                
			            }
			            // console.log("Character" , ch);

			            s = ch + s;
					}
					fs.closeSync(fd);
					// fs.close(fd, function (err) {
		   //              if (err) {
		   //                  console.log(err);
		   //              }
		  
		   //              console.log("File closed successfully");
		   //          });
		            socket.emit('file_chunk', s);

			    }
			});
	        
	        
	    }
	})
	
  
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

