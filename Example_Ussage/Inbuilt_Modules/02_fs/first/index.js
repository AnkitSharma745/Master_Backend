const fs = require("fs");
const path = require("path");

// 1. Create a new directory if it doesn't exist
const dirPath = path.join(__dirname, "exampleDir");
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
  console.log('Directory "exampleDir" created!');
}

// 2. Writing to a file (creating or overwriting)
const filePath = path.join(dirPath, "exampleFile.txt");
const content = "Hello, Node.js! This is an example of file system operations.";

fs.writeFile(filePath, content, (err) => {
  if (err) throw err;
  console.log(`File "exampleFile.txt" written successfully!`);

  // 3. Reading the file asynchronously
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) throw err;
    console.log(`File Content: ${data}`);

    // 4. Appending data to the file
    const additionalContent = "\nAppended text to the file using fs module.";
    fs.appendFile(filePath, additionalContent, (err) => {
      if (err) throw err;
      console.log("Data appended to the file!");

      // 5. Reading the updated file content
      fs.readFile(filePath, "utf8", (err, updatedData) => {
        if (err) throw err;
        console.log(`Updated File Content: ${updatedData}`);

        // 6. Renaming the file
        const newFilePath = path.join(dirPath, "renamedFile.txt");
        fs.rename(filePath, newFilePath, (err) => {
          if (err) throw err;
          console.log('File renamed to "renamedFile.txt"');

          // 7. Deleting the file
          fs.unlink(newFilePath, (err) => {
            if (err) throw err;
            console.log('File "renamedFile.txt" deleted!');

            // 8. Removing the directory after file deletion
            fs.rmdir(dirPath, (err) => {
              if (err) throw err;
              console.log('Directory "exampleDir" deleted!');
            });
          });
        });
      });
    });
  });
});

// 9. Checking if a file exists and handling errors
const checkFilePath = path.join(__dirname, "nonExistentFile.txt");
fs.access(checkFilePath, fs.constants.F_OK, (err) => {
  if (err) {
    console.log("File does not exist, creating a new file...");
    fs.writeFile(checkFilePath, "New file content.", (err) => {
      if (err) throw err;
      console.log("New file created successfully!");
    });
  } else {
    console.log("File exists!");
  }
});

// 10. Using Streams for reading large files
const streamFilePath = path.join(__dirname, "largeFile.txt");
const writeStream = fs.createWriteStream(streamFilePath);
writeStream.write("This is a large file. Writing using streams.\n", "utf8");
writeStream.write("Streams allow handling large data efficiently.\n");
writeStream.end();

writeStream.on("finish", () => {
  console.log("Large file written successfully using streams.");

  // Reading the large file using a stream
  const readStream = fs.createReadStream(streamFilePath, "utf8");
  readStream.on("data", (chunk) => {
    console.log(`Reading chunk: ${chunk}`);
  });

  readStream.on("end", () => {
    console.log("Finished reading the large file.");
  });

  readStream.on("error", (err) => {
    console.error("Error reading file:", err);
  });
});
