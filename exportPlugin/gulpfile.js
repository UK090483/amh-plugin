const { src, dest, series } = require("gulp");
var clean = require("gulp-clean");
const zip = require("gulp-zip");
const PluginName = __dirname.split("\\").reverse()[1];

function exportPlugin(cb) {
	return src(["../**", "!../node_modules/**", "!../exportPlugin/**"]).pipe(
		dest("./output/plugin")
	);
}
function zipPlugin(cb) {
	return src(["./output/plugin/**/*"])
		.pipe(zip(`${PluginName}.zip`))
		.pipe(dest("./output"));
}

function cleanFolder(cb) {
	return src("./output").pipe(clean());
}

exports.default = series(cleanFolder, exportPlugin, zipPlugin);
