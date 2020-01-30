import { arrow } from "./icons";
const { RichText } = wp.blockEditor;
export default function save(props) {
	const { attributes } = props;
	const { subBlocks, Id, mainBlock } = attributes;
	const encodedSubblocks = JSON.parse(subBlocks);

	function getItems() {
		return encodedSubblocks.map((item, index) => {
			console.log(item.ampel);
			if (item.ampel) {
				return (
					<div className="amh-readmore-item" data-id={Id + index}>
						<div className="amh-readmore-item-text">
							{item.logo ? (
								<div
									className="amh-readmore-item-image"
									style={{
										backgroundImage: `url(${item.logo})`
									}}
								></div>
							) : (
								<h5>{item.label}:</h5>
							)}
							<Ampel ampel={item.ampel}></Ampel>
						</div>
						<div className="amh-readmore-item-arrow">{arrow}</div>
					</div>
				);
			} else {
				return (
					<div className="amh-readmore-item" data-id={Id + index}>
						<div className="amh-readmore-item-text">
							{item.logo ? (
								<div
									className="amh-readmore-item-image"
									style={{
										backgroundImage: `url(${item.logo})`
									}}
								></div>
							) : (
								<h5>{item.label}:</h5>
							)}
							{item.ampel && <Ampel ampel={item.ampel}></Ampel>}
							<h5 style={{ color: item.color }}>{item.short}</h5>
						</div>
						<div className="amh-readmore-item-arrow">{arrow}</div>
					</div>
				);
			}
		});
	}

	function getSubsContent() {
		return encodedSubblocks.map((item, index) => {
			return (
				<div className="amh-readmore-subContent" data-id={Id + index}>
					<RichText.Content tagName="p" value={item.content} />
				</div>
			);
		});
	}

	return (
		<div className="amh-readmore-wrap">
			<div className="amh-readmore-item-head">
				<RichText.Content tagName="p" value={mainBlock} />
			</div>

			<div className="amh-readmore-items">{getItems()}</div>
			<div className="amh-readmore-items-subContent">{getSubsContent()}</div>
		</div>
	);
}
function Ampel({ ampel }) {
	function getClassname(n) {
		if (n === ampel) {
			return "amh-readmore-ampel-item amh-readmore-ampel-item-active";
		} else {
			return "amh-readmore-ampel-item";
		}
	}
	return (
		<div className={"amh-readmore-ampel-wrap"}>
			<div className={getClassname(1)}></div>
			<div className={getClassname(2)}></div>
			<div className={getClassname(3)}></div>
			<div className={getClassname(4)}></div>
			<div className={getClassname(5)}></div>
		</div>
	);
}
