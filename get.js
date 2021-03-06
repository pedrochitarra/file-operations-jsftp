const jsftp = require('jsftp')
const fs = require('fs');
const logger = require("logger");

const ftp = new jsftp({
  host: "host",
  //port: 21,
  user: "user",
  pass: "pass"
});

const RemotePath = 'path/to/file/inside/FTPuser/folder'
const LocalPath = 'path/to/save/the/file/locally'

ftp.getGetSocket(RemotePath, function(err, socket) {
  if (err)
    return logger.error(err);
  //Create a write stream to locally save the remote file
  let write = fs.createWriteStream(LocalPath);
  socket.resume();
  socket.on("data", function(data) {
    //Method on from socket, every iteration the buffer returned is written to the file
    write.write(data, err => {
      if (err) {      
        return logger.error(err);
      }
    });

  socket.on("close", function() {
    //Ends the GET process and closes the socket to free the comunication
    logger.log("File written! - " + counter + " - bytes written");
  });
});
