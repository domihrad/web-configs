var { src, dest, watch, series } = require("gulp"),
    sass = require("gulp-sass")(require("sass")),
    autoprefixer = require("gulp-autoprefixer"),
    cssnano = require("gulp-cssnano"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    concat = require("gulp-concat");


function scss()
{
    return src("src/styles/scss/*.scss")
    .pipe(sass())
    .pipe(autoprefixer("last 2 version"))
    .pipe(concat("main.css"))
    .pipe(rename({suffix: ".min"}))
    .pipe(dest("src/styles"));
}
function styles()
{
    return src(["src/styles/main.min.css"])
        .pipe(concat("main.css"))
        .pipe(rename({suffix: ".min"}))
        .pipe(cssnano())
        .pipe(dest("dist/css"));
}

function scripts()
{
    return src("src/scripts/js/*.js")
        .pipe(concat("main.js"))
        .pipe(rename({suffix: ".min"}))
        .pipe(uglify())
        .pipe(dest("dist/js"));
}

function watchTask()
{
    watch("src/styles/scss/*.scss", scss);
    watch("src/styles/", styles);
    watch("src/scripts/js/*.js", scripts)
}

exports.default = series(
    scss,
    styles,
    scripts,
    watchTask
);
