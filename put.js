const jsftp = require('jsftp')
const fs = require('fs');
const logger = require("logger");

const RemotePath = 'path/to/file/inside/FTPuser/folder'
const LocalPath = 'path/to/save/the/file/locally'

const ftp = new jsftp({
  host: "host",
  //port: 21,
  user: "user",
  pass: "user"
});
//Opens the file descriptor for the local file and return a buffer containing the data
fs.readFile(LocalPath, (err, buffer)=> {
  if(err) {
    return console.log(err);
  }
  //Executes the write operation from the local buffer to the remote file
  ftp.put(buffer, RemotePath, (err,res)=> {
    console.log(buffer);
    if (err) {
      return logger.error(err);
    }
    logger.log("File uploaded successfuly");
    }
  });
});
