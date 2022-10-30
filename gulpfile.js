var { src, dest, watch, series } = require("gulp"),
    sass = require("gulp-sass")(require("sass")),
    autoprefixer = require("gulp-autoprefixer"),
    imagemin = require("gulp-imagemin"),
    cssnano = require("gulp-cssnano"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    concat = require("gulp-concat"),
    cache = require("gulp-cache");


const scss = () =>
{
    return src("src/styles/scss/*.scss")
    .pipe(sass())
    .pipe(autoprefixer("last 2 version"))
    .pipe(concat("main.css"))
    .pipe(rename({suffix: ".min"}))
    .pipe(dest("src/styles"));
}
const styles = () =>
{
    return src(["src/styles/main.min.css"])
        .pipe(concat("main.css"))
        .pipe(rename({suffix: ".min"}))
        .pipe(cssnano())
        .pipe(dest("www/dist/css"));
}

const scripts = () =>
{
    return src("src/scripts/js/*.js")
        .pipe(concat("main.js"))
        .pipe(rename({suffix: ".min"}))
        .pipe(uglify())
        .pipe(dest("www/dist/js"));
}

const fonts = () =>
{
    return src("assets/fonts/*")
        .pipe(dest("www/dist/assets/fonts"));
}

const images = () => 
{
    return src("assets/images/*")
        .pipe(cache(imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))
        .pipe(dest("www/dist/assets/images"));
}

const watchTask = () =>
{
    watch("src/styles/scss/*.scss", scss);
    watch("src/styles/", styles);
    watch("src/scripts/js/*.js", scripts);
    watch("assets/fonts/*.ttf", fonts);
    watch("assets/images/*", images)
}

exports.default = series
(
    scss,
    fonts,
    styles,
    images,
    scripts,
    watchTask,
);