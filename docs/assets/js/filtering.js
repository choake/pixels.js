(function () {
    var c;
    var ctx;
    var tiles;
    var img;
    var canvas_list = [];
    var current_img_url = "./city1.PNG"
    var current_canvas;
    var imgData;
    var original_img_data;
    var change = 0;
    var i;

    document.addEventListener('DOMContentLoaded', init, false);

    function init() {
        c = document.getElementById("canvas");
        ctx = c.getContext("2d");
        tiles = document.getElementsByClassName("tile");
        console.log(tiles);
        // document.getElementById('img_uploader').addEventListener('change', readURL, true);
        appendCanvases();
        filterDemoImages();
        // Init default image
        img = document.createElement("img");

        img.onload = function () {
            ctx.drawImage(img, 0, 0, 220, 277);
            original_img_data = ctx.getImageData(0, 0, c.width, c.height);
            console.log(original_img_data)
            if (change === 0) {
                assembleFilteredPhotos();
                change += 1;
            }
        }
        img.src = current_img_url;
    }

    function filterDemoImages() {
        let daisy_imgs = document.querySelectorAll(".daisy");
        
        // 245 x 158
        let filters = ["twenties", "ocean", "perfume", "warmth", "solange", "extreme_offset_red"]
        for (let i = 0; i < daisy_imgs.length; i += 1) {
            let img = daisy_imgs[i];
            console.log("currently on", img);
            pixelsJS.filterImg(img, filters[i]);
        };        

        let city_imgs = document.querySelectorAll(".city")
        let city_filters = ["ocean", "offset", "twenties", "warmth", "solange", "extreme_offset_red"]
        for (let i = 0; i < city_imgs.length; i += 1) {
            let img = city_imgs[i];
            pixelsJS.filterImg(img, city_filters[i]);
        };      

        let fuji_imgs = document.querySelectorAll(".fuji");
        console.log(fuji_imgs)
        let fuji_filters = ["ocean", "perfume", "serenity", "twenties",  "offset", "warmth",  "extreme_offset_red"]
        for (let i = 0; i < fuji_imgs.length; i += 1) {
            let img = fuji_imgs[i];
            pixelsJS.filterImg(img, fuji_filters[i]);
        };    

    }

    function appendCanvases() {
        // Create for loop which creates canvases and then appends them to a list. 

        for (i = 0; i < tiles.length; i++) {
            let appended_canvas = document.createElement("canvas");
            appended_canvas.width = c.width;
            appended_canvas.height = c.height;
            let tile_elem = tiles[i];
            canvas_list.push(appended_canvas);
            tile_elem.appendChild(appended_canvas);
        }
        console.log(canvas_list);
    }

    function readURL() {
        let file = document.getElementById("img_uploader").files[0];

        let reader = new FileReader();
        reader.onloadend = function () {
            img.src = reader.result; // Set the global image to the path of the file on the client's PC.
        }
        if (file) {
            reader.readAsDataURL(file);
        } else {
            /// Error message TODO
            console.log("Could not read file. :(")
        }
    }

    function assembleFilteredPhotos() {
        var filters = ["perfume", "extra_offset_green", "extreme_offset_green", "grime", "warmth", "wood", "sunset", "crimson", "extreme_offset_red", "extreme_offset_blue", "extra_offset_red", "phase", "pink_aura", "serenity", "bluegreyscale", "retroviolet", "haze", "twenties", "greyscale", "mellow", "vintage", "evening", "bluegreyscale", "a", "offset_blue", "offset", "offset_green", "solange_grey", "invert", "lemon", "coral", "dark_purple_min_noise", "green_med_noise", "teal_min_noise", "blue_min_noise", "green_min_noise", "green_med_noise", "pink_min_noise", "red_min_noise", "min_noise", "pane", "add_horizontal_lines", "add_diagonal_lines", "add_green_diagonal_lines", "greengreyscale", "darkify", "incbrightness", "cool_twilight", "blues", "ryo", "lix", "casino", "yellow_casino", "specks", "sat_adj", "noise_centre", "greenspecks", "eclectic", "matrix", "cosmic", "solange_dark", "solange", "zapt", "neue", "eon", "aeon", "ocean", "confetti", "horizon", "rosetint", "slate", "purplescale", "redgreyscale", "radio", "specks_redscale", "frontward"]

        for (let j = 0; j < filters.length; j += 1) {
            let filter = filters[j]
            let current_canvas = canvas_list[j];
            let tile = tiles[j];
            let name = document.createElement("p")
            name.innerHTML = filter
            name.className = "text-primary"
            tile.appendChild(name)
            console.log(current_canvas);

            let getctx = current_canvas.getContext("2d");
            imgData = ctx.getImageData(0, 0, c.width, c.height);
            console.log(imgData)
            let resImgData = pixelsJS.filterImgData(imgData, filter);
        
            getctx.putImageData(resImgData, 0, 0);
        }
    }



    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
})();