(function(module){
    module.exports.routers = module.exports.routers || {};
    module.exports.routers.home = (function exportsHomeRouter(){
        var fileSystem = require("fs");
        var path = require("path");
        var oxford = require("project-oxford");
        var jimp = require("jimp");
        var pngFileStream = require("png-file-stream");
        var gifEncoder = require("gifencoder");

        function getHomepage(request, response, next){
            if(!request.query.image || request.query.image === ""){
                response.render("index", { title: "Express" });
            }else{
                response.render("index", {
                    image: request.query.image,
                    title: "Done!"
                });
            }
        }

        function postImage(request, response, next){
            var imageSource = request.file
                ? request.file.path
                : "";

            Promise.resolve(imageSource)
                .then(function detectFace(image){
                    console.log("TODO: detect face using Oxford API.");
                }).then(function generateBobblePermutations(response){
                    console.log("TODO: generate multiple images with head rotated.");
                }).then(function generateGif(dimensions){
                    console.log('TODO: generate GIF');
                    return imageSource;
                }).then(function displayGif(gifLocation){
                    var imageLocation = (gifLocation && gifLocation !== "")
                        ? "/static/images/" + path.basename(gifLocation)
                        : "";
                    var redirectPath = "/?image=" + encodeURIComponent(imageLocation);
                    response.redirect(redirectPath);
                    // response.render("index", {
                    //     image: imageLocation,
                    //     title: "Done!"
                    // });
                });
        }

        return {
            getHomepage: getHomepage,
            postImage: postImage
        };
    })();

    module.exports.routers.map = function mapRouters(app){
        var express = require('express');
        var logger = require('morgan');
        var favicon = require('serve-favicon');
        var cookieParser = require('cookie-parser');
        var bodyParser = require('body-parser');
        var upload = require("../lib/multer-extension.js").multerExtension.upload;
        var routers = {
            error: require("./error.js").routers.errors,
            home: module.exports.routers.home,
            users: require("./users.js").routers.users
        };

        app.get("/", routers["home"].getHomepage);
        app.post("/", upload.single("userPhoto"), routers["home"].postImage);
        app.get("/users/", routers["users"].listUsers);

        // uncomment after placing your favicon in /public
        //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
        app.use(logger('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(cookieParser());

        // Expose files available in public/images so they can be viewed in the browser.
        app.use("/static", express.static("public"));

        app.use(routers.error.catch404);
        if (app.get('env') === 'development') {
            app.use(routers.error.displayErrorMessageWithStackTrace);
        }else{
            app.use(routers.error.displayErrorMessageWithStackTrace);
        }
    };

})(module);
