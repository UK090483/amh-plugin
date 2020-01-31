export default function ampel({ setSubContent, ampel }) {
	function setAmpel(n) {
		if (n === ampel) {
			setSubContent(null, "ampel");
		} else {
			setSubContent(n, "ampel");
		}
	}

	function getClassname(n) {
		if (n === ampel) {
			return `amh-readmore-ampel-item amh-readmore-ampel-item-active-${n} amh-readmore-ampel-item-gewählt`;
		} else {
			return `amh-readmore-ampel-item amh-readmore-ampel-item-active-${n}`;
		}
	}
	return (
		<div className={"amh-readmore-ampel-wrap"}>
			<div className={getClassname(1)} onClick={() => setAmpel(1)}></div>
			<div className={getClassname(2)} onClick={() => setAmpel(2)}></div>
			<div className={getClassname(3)} onClick={() => setAmpel(3)}></div>
			<div className={getClassname(4)} onClick={() => setAmpel(4)}></div>
			<div className={getClassname(5)} onClick={() => setAmpel(5)}></div>
		</div>
	);
}
