const fs = require('fs');
const gm = require('gm');

const ZOOM_SIZES = [
    256,
    512,
    1024,
    2048,
    4096,
    8192,
    16384
];

const BASE_SIZE = 256;

const main = async () => {


    let maps = fs.readdirSync('./maps/original');

    let zoomLevel;

    maps = maps.slice(0, 1);

    for (let map of maps) {
        zoomLevel = 0;
        let mapName = map.match(/(.+).jpg/)[1];

        console.log(mapName)
        for (let size of ZOOM_SIZES) {

            await resizeImage(mapName, size, size, zoomLevel);

            if (size === 256) {
                zoomLevel++;
                continue;
            }

            let tilesPerRow = (size / BASE_SIZE);
            for (let x = 0; x < tilesPerRow; x++) {
                let offsetX = 0 + (256 * x);

                for (let y = 0; y < tilesPerRow; y++) {
                    let offsetY = 0 + (256 * y);
                    fs.mkdirSync(`./maps/final/${mapName}/${zoomLevel}/${x}`, {recursive: true});
                    await cropImage(mapName, BASE_SIZE, BASE_SIZE, offsetX, offsetY, zoomLevel, x, y, size);
                }
            }
            zoomLevel++;
        }
    }
}

const resizeImage = (name, x, y, zoomLevel) => {
    let pathOut;
    if (zoomLevel === 0) {
        fs.mkdirSync(`./maps/final/${name}/${zoomLevel}/0`, {recursive: true});
        pathOut = `maps/final/${name}/${zoomLevel}/0/0.jpg`
    } else {
        pathOut = `maps/temp/${name}-${x}x${y}.jpg`
    }
    return new Promise((resolve, reject) => {
        gm(`maps/original/${name}.jpg`)
        .resize(x, y)
        .gravity('Center')
        .background('#010406')
        .extent(x, y)
        .write(pathOut, (err) => {
            if (err) {
                reject(err);
            }
            resolve();
        })
    })
}

const cropImage = (name, sizeX, sizeY, offsetX, offsetY, zoomLevel, zoomX, zoomY, size) => {
    return new Promise((resolve, reject) => {
        gm(`maps/temp/${name}-${size}x${size}.jpg`)
            .crop(sizeX, sizeY, offsetX, offsetY)
            .write(`maps/final/${name}/${zoomLevel}/${zoomX}/${zoomY}.jpg`, (err) => {
                if (err) {
                    reject(err);
                }
                resolve()
            });
    })
}

main();



