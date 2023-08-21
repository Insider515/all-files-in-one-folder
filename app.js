const express = require('express');
const fs = require('fs');
const path = require('path');
const config = require('config');
const app = express();

const sourceFolderPath = config.get("sourceFolderPath");
const targetFolderPath = config.get("targetFolderPath");
const fileLimit = config.get("fileLimit");

let fileCounter = 1;

const getFilesRecursively = (sourceDir) => {
    const files = [];

    const traverse = (dir) => {
        const items = fs.readdirSync(dir);

        items.forEach(item => {
            const itemPath = path.join(dir, item);

            if (fs.statSync(itemPath).isFile()) {
                files.push(itemPath);
            } else if (fs.statSync(itemPath).isDirectory()) {
                traverse(itemPath);
            }
        });
    };

    traverse(sourceDir);
    return files;
};

const moveFilesRecursively = (sourceDir, targetDir, limit) => {
    const files = getFilesRecursively(sourceDir).slice(0, limit);

    files.forEach(file => {
        const fileCounterStr = fileCounter.toString().padStart(3, '0');
        const extname = path.extname(file);
        const targetFilePath = path.join(targetDir, `${fileCounterStr}${extname}`);

        fs.renameSync(file, targetFilePath);
        console.log(`Moved ${file} to ${targetFilePath}`);
        fileCounter++;
    });
};

app.get('/movefiles', (req, res) => {
    try {
        moveFilesRecursively(sourceFolderPath, targetFolderPath, fileLimit);
        res.send('Files moved successfully.');
    } catch (error) {
        res.status(500).send('Error moving files.');
    }
});

const copyFilesRecursively = (sourceDir, targetDir, limit) => {
    const files = getFilesRecursively(sourceDir).slice(0, limit);

    files.forEach(file => {
        const fileCounterStr = fileCounter.toString().padStart(3, '0');
        const extname = path.extname(file);
        const targetFilePath = path.join(targetDir, `${fileCounterStr}${extname}`);
        fs.copyFileSync(file, targetFilePath);
        console.log(`Copied ${file} to ${targetFilePath}`);
        fileCounter++;
    });
};

app.get('/copyfiles', (req, res) => {
    try {
        copyFilesRecursively(sourceFolderPath, targetFolderPath, fileLimit);
        res.send('Files copied successfully.');
    } catch (error) {
        res.status(500).send('Error copying files.');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
