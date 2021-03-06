const { InspectorControls, MediaUpload, MediaUploadCheck } = wp.blockEditor;
const { Button, ButtonGroup } = wp.components;
import getSortFunction from "../helper/sortfunction";
import style from "../helper/style";

export default function Inspector({ setAttributes, attributes, sortImages }) {
	const { sort, images } = attributes;

	function isActiveSort(params) {
		return sort === params;
	}
	// console.log(images);
	console.log();
	function setSortAlo(_sort) {
		setAttributes({ sort: _sort });
		sortImages(_sort);
	}

	const UploadCheckFallback = (
		<h3>You don't have permission to Upload Images...</h3>
	);

	function setImages(i) {
		let all = [...images];
		i.forEach(element => {
			let imgObject = {};
			imgObject.sizes = element.sizes;
			imgObject.fileName = checkIfallreadyExist(element, all);
			imgObject.alt = "";
			imgObject.id = element.id;
			all.push(imgObject);
		});

		let sorted = all.sort(getSortFunction(sort));
		setAttributes({ images: sorted });
	}

	return (
		<div>
			<InspectorControls>
				<br></br>
				<h3>Sort</h3>
				<div className={style.row}>
					<ButtonGroup>
						<Button
							isSmall
							isPrimary={isActiveSort("<")}
							onClick={() => setSortAlo("<")}
						>
							{"<"}
						</Button>
						<Button
							isSmall
							isPrimary={isActiveSort(">")}
							onClick={() => setSortAlo(">")}
						>
							{">"}
						</Button>
					</ButtonGroup>
				</div>
				<br></br>

				<MediaUploadCheck fallback={UploadCheckFallback}>
					<MediaUpload
						multiple={true}
						onSelect={media => setImages(media)}
						allowedTypes={["image"]}
						value={""}
						render={({ open }) => (
							<Button isPrimary onClick={open}>
								Add Images
							</Button>
						)}
					/>
				</MediaUploadCheck>
			</InspectorControls>

			{!(images.length > 0) && (
				<div style={style.row}>
					<MediaUploadCheck fallback={UploadCheckFallback}>
						<MediaUpload
							multiple={true}
							onSelect={media => setImages(media)}
							allowedTypes={["image"]}
							render={({ open }) => (
								<Button isPrimary onClick={open}>
									Add Images
								</Button>
							)}
						/>
					</MediaUploadCheck>
				</div>
			)}
		</div>
	);
}

function checkIfallreadyExist(totest, images) {
	let testName = totest.title.replace(/ /g, "");
	let res = testName;
	let exists = checkExistence(testName, images);
	if (exists) {
		res = getDifferentName(exists, testName);
	}
	return res;
}

function checkExistence(testName, images) {
	let res = images.filter(el => el.fileName.includes(testName));
	return res.length > 0 ? res : false;
}

function getDifferentName(listofNames, name) {
	let res = 0;
	listofNames.forEach(item => {
		let overhead = Number(item.fileName.replace(name, ""));
		if (typeof overhead === "number") {
			if (res < overhead) {
				res = overhead;
			}
		}
	});

	return name + (res + 1);
}
