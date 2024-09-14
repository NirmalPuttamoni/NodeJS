// fs module - file system module

const fs = require("fs"); //commonJS way of importing module
// import fs from 'fs' // ES6 way of importing module

// read a File
fs.readFile("file.txt","utf8",(err, data)=>{
    if(err){
        console.log("error: ", err);
    } else{
        console.log("data: ",data);
    }
})

// write a content to a File
const content = "Hello World form Node.JS";
fs.writeFile("example.txt", content, (err)=> {
    if(err){
        console.log(err);
        return;
    }
    console.log("File successfully created.");
})

// rename a file
fs.rename("example.txt", "test.txt", (err)=> {
    if(err){
        console.log(err);
        return;
    }
    console.log("File renamed successfully");
})

// get stats of a file
fs.stat("file.txt", (err, stats)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log(stats.birthtime);
})

// create a directory
const directoryName = "new-directory";

fs.mkdir(directoryName, (err)=> {
    if(err){
        console.log(err);
        return;
    }
    console.log("Directory created Successfully.");
})

// remove a directory
fs.mkdir(directoryName,{recursive:true}, (err)=> {
    if(err){
        console.log(err);
        return;
    }
    console.log("Directory removed Successfully.");
});



//path module - path module provides utilities for working with file and directory paths
/**
 * 
 * File path format differ in windows and linux
 * for windows - C:\user\dir\file.txt
 * for linux/POSIX - home/user/dir/file.txt 
 * 
 */
const path = require("path");

const fullPath = path.join("folder","subFolder","file.txt");
console.log(fullPath);

const aboslutePath = path.resolve("folder","subFolder","file.txt");
console.log(aboslutePath);

const fileName = path.basename("./dir/file.txt");
console.log(fileName)

const dirName = path.dirname("./dir/file.txt");
console.log(dirName);

const extName = path.extname("./dir/file.txt");
console.log(extName);

/**
 * relative paths 
 * ./ -current directory
 * ../ -parent directory
 * ./../../ -parent of parent directory
 */

const normalizedPath = path.normalize("/path/to/../file.txt");
console.log("normalizedPath: ",normalizedPath);

const relativePath = path.relative("path/from", "path/to");
console.log(relativePath);


const sourceFilePath = "./dir/file.txt";
const destinationFilePath = "./destination-file.txt";

// create a readable stream from source file
const readstream = fs.createReadStream(sourceFilePath);

// create a writable stream to destination file
const writeStream = fs.createWriteStream(destinationFilePath);

// pipe the read stream to write stream
readstream.pipe(writeStream);

// handle any errors that may occur during the copy process
readstream.on("error", (err)=>{
    console.error(`Error reading the file: ${err.message}`);
})

writeStream.on("error", (err)=> {
    console.error(`Error writing the file: ${err.message}`);
});

writeStream.on("finish", ()=> {
    console.log("File copied successfully");
})