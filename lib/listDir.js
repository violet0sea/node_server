const fs = require('fs');
const path = require('path');

// 先序遍历
const dir = process.argv[2];
let depth = 0;
function readDir(dir) {
    if(depth > 3) {
        return
    }
    depth++;
    fs.readdir(dir, (err, files) => {
        if(err) {
            console.log(err);
        }

        let currentDir = dir;
        files.forEach(file => {
            const fileName = path.join(currentDir, file);
            console.log(fileName);
            fs.stat(fileName, (err, stats) => {
                if(err) {
                    console.log(err)
                    return;
                }
                if(stats.isDirectory()) {
            
                    readDir(fileName)
                } else {
                    console.log(file)
                }
            });
        });

    });
}
readDir(dir);

// 后序遍历计算文件大小
// sizeDic(D) {
//     int TotalSize;

//     TotalSize = 0;
//     if(D is a legitimate entry) {
//         TotalSize = FileSize(D);
//         if(D is a directory) {
//             for each child C of D
//                 TotalSize += SizeDirectory(C);
//         }
//     }
//     return TotalSize;
// }

