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
  const emmaDataFile = "./src/emma-data.yml";
  const bowerFile = "./bower.json";
  const pkg = JSON.parse(fs.readFileSync("./package.json", "utf8"));
  const emmaData = yaml.safeLoad(fs.readFileSync(emmaDataFile, "utf8"));
  const argv = minimist(process.argv.slice(2));

  if (argv.v === true || argv.v === undefined) {
    throw new Error("Invalid arguments");
  }

  gulp
    .src(emmaDataFile)
    .pipe(replace(`ver: '${pkg.version}'`, `ver: '${argv.v}'`))
    .pipe(gulp.dest("./src"));

  gulp
    .src(bowerFile)
    .pipe(replace(`"version": "${pkg.version}"`, `"version": "${argv.v}"`))
    .pipe(gulp.dest("./"));

  console.log(`Bumped version number: ${pkg.version} -> ${argv.v}`);
});
