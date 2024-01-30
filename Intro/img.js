const { Rembg } = require ("rembg-node");
const sharp = require("sharp");

(async () => {

    const input = sharp("./rmvbg.png");

    //optional arguments
    const rembg = new Rembg({
        logging:true,
    });

    const output = await rembg.remove(input);

    await output.webp().toFile("test-output.webp");

    // await output.trim().webp().toFile("trimmed.png");
})();

// const sharp = require("sharp");
// sharp("./rmvbg.png")
// .resize(200, 200)
// .toFile("out_1.jpg")
// .remo
