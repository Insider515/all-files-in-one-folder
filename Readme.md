### English

This software is used to collect from a large number of files and subfolders in one separate folder

## Functionality of the current version
1. Copy files /copyfiles
2. Move Files /movefiles

The configuration is stored in the /config/default file.json

/ Key / Type / Usage |
|---|---|---|
| source Folder Path | string | full path to the folder where the program will search for files (in all its subfolders)|
|target Folder Path | string | full path to the folder where files will be collected|
|file Limit|number | if 0 then the operation will be performed with all found files. If you specify a specific number, this number will be used as the number of files that the action will be performed on|

Launching via the terminal

```
curl http://localhost:3000/copyfiles
```

### Українська

Це програмне забезпечення використовуєтся для збіру із великої кількості файлів із підпапок в одну окрему папку

## Функціональні можливості поточної версії
1. Копіювання файлів /copyfiles
2. Переміщення файлів /movefiles

Конфiгурацiя зберігається у файлi /config/default.json

| Ключ | Тип | Використання |
|---|---|---|
|sourceFolderPath|Строка|Повний шлях до папки, в котрій программа буде шукати файли (в усіх її підпапках)|
|targetFolderPath|Строка|Повний шлях до папки, в котру будуть збиратися файли|
|fileLimit|Цифра|Якщо 0 тоді операція буде проведенна з усіма знайденими файлами. Якщо вказати конкретну цифру - ця цифра буде використана як кількість файлів над якими буде проведена дія|

Запуск через термiнал

```
curl http://localhost:3000/copyfiles
```

