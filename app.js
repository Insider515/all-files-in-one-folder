const express = require('express');
const fs = require('fs');
const path = require('path');
const config = require('config');
const app = express();

const sourceFolderPath = config.get("sourceFolderPath"); // Укажите путь к исходной папке
const targetFolderPath = config.get("targetFolderPath"); // Укажите путь к целевой папке
const fileLimit = config.get("fileLimit"); // Получаем ограничение из конфига

let fileCounter = 1; // Счетчик для переименования файлов

// Функция для получения массива файлов из папки и её вложенных папок
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

// Рекурсивная функция для перемещения файлов из папок и их вложений
const moveFilesRecursively = (sourceDir, targetDir, limit) => {
    const files = getFilesRecursively(sourceDir).slice(0, limit);

    files.forEach(file => {
        const fileCounterStr = fileCounter.toString().padStart(3, '0');
        const extname = path.extname(file);
        const targetFilePath = path.join(targetDir, `${fileCounterStr}${extname}`); // Пример переименования в "001.jpg"

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

// Рекурсивная функция для копирования файлов из папок и их вложений
const copyFilesRecursively = (sourceDir, targetDir, limit) => {
    const files = getFilesRecursively(sourceDir).slice(0, limit);

    files.forEach(file => {
        const fileCounterStr = fileCounter.toString().padStart(3, '0');
        const extname = path.extname(file);
        const targetFilePath = path.join(targetDir, `${fileCounterStr}${extname}`); // Пример переименования в "001.jpg"

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
