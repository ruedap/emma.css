import gulp from "gulp";
import removeEmptyLines from "gulp-remove-empty-lines";
import replace from "gulp-replace";
import yaml from "js-yaml";
import minimist from "minimist";
import fs from "fs";

gulp.task("remove-empty-lines", () => {
  gulp.src("./emma.css").pipe(removeEmptyLines()).pipe(gulp.dest("./"));
});

gulp.task("bump-version-number", () => {
  const ymlPath = "./src/emma-data.yml";
  const bowerPath = "./bower.json";
  const doc = yaml.safeLoad(fs.readFileSync(ymlPath, "utf8"));
  const argv = minimist(process.argv.slice(2));

  if (argv.v === true) {
    throw new Error("Invalid arguments");
  }

  gulp
    .src(ymlPath)
    .pipe(replace(`ver: '${doc.ver}'`, `ver: '${argv.v}'`))
    .pipe(gulp.dest("./src"));
  gulp
    .src(bowerPath)
    .pipe(replace(`"version": "${doc.ver}"`, `"version": "${argv.v}"`))
    .pipe(gulp.dest("./"));

  console.log(`Bumped version number: ${doc.ver} -> ${argv.v}`);
});
