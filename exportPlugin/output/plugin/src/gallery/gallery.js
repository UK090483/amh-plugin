import "./style.scss";
import "./editor.scss";

import save from "./save";
import edit from "./edit";

const { registerBlockType } = wp.blocks;

registerBlockType("amh/amh-gallery", {
	title: "AMH Logo-Gallery",
	icon: "images-alt2",
	category: "alle-müssen-handeln",
	supports: {
		align: ["wide", "full"]
	},

	attributes: {
		images: {
			type: "array",
			default: []
		},
		sort: {
			type: "string",
			default: ">"
		},
		sortItem: {
			type: "string",
			default: "fileName"
		},
		Id: {
			type: "number",
			default: 0
		}
	},

	edit,
	save
});
