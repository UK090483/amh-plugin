import Inspector from "./inspector/inspector";
import getSortFunction from "./helper/sortfunction";
import Modal from "./inspector/Modal";

const { useState, useEffect } = wp.element;
const { Button } = wp.components;

export default function(props) {
	const { setAttributes, attributes, isSelected } = props;
	const { images, sort, Id } = attributes;
	const [isOpen, setOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(-1);

	useEffect(() => {
		!isSelected && setSelectedItem(-1);
	});

	useEffect(() => {
		if (!Id) {
			setAttributes({ Id: Date.now() });
		}
	}, []);

	function getImages() {
		return images.map((i, index) => {
			let url = i.sizes.hasOwnProperty("medium")
				? i.sizes.medium.url
				: i.sizes.full.url;

			let wrapClass =
				i.fileName === selectedItem
					? "gallerie-item gallerie-item-selected"
					: "gallerie-item";
			return (
				<div
					key={i.fileName}
					className={wrapClass}
					onClick={() => setSelectedItem(i.fileName)}
				>
					<img className={"image"} src={url}></img>
					<div className={"gallerie-item-edit"} onClick={() => setOpen(true)}>
						<Button isSmall isPrimary>
							Edit
						</Button>
					</div>
				</div>
			);
		});
	}

	function sortImages(_sort) {
		setAttributes({ images: images.sort(getSortFunction(_sort || sort)) });
	}

	return (
		<div className={"gallerie-editor-wrap"}>
			<Inspector
				setAttributes={setAttributes}
				attributes={attributes}
				sortImages={sortImages}
			></Inspector>
			<Modal
				setAttributes={setAttributes}
				selectedItem={selectedItem}
				setSelectedItem={setSelectedItem}
				isOpen={isOpen}
				setOpen={setOpen}
				images={images}
				sortImages={sortImages}
			></Modal>

			{images.length > 0 && (
				<div className={"gallerie-wrap"}>{getImages()}</div>
			)}
		</div>
	);
}
