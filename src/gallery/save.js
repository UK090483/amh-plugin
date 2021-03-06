export default function({ attributes }) {
	let Id = attributes.Id;
	function getImages() {
		return attributes.images.map(i => {
			let url = i.sizes.hasOwnProperty("medium")
				? i.sizes.medium.url
				: i.sizes.full.url;
			return (
				<div className={"gallerie-item"}>
					<noscript>
						<img className={"image"} src={url}></img>
					</noscript>
					<img className={`lazy${Id}`} data-src={url}></img>
				</div>
			);
		});
	}

	return (
		<div>
			{attributes.images.length > 0 && (
				<div className={"gallerie-wrap"}>{getImages()}</div>
			)}

			<script>
				{`document.addEventListener("DOMContentLoaded",function(){var e=[].slice.call(document.querySelectorAll("img.lazy${Id}"));if("IntersectionObserver"in window){var s=new IntersectionObserver(function(e,t){e.forEach(function(e){if(e.isIntersecting){let t=e.target;t.src=t.dataset.src,t.classList.remove("lazy${Id}"),t.classList.add("image"),s.unobserve(t)}})});e.forEach(function(e){s.observe(e)})}else e.forEach(function(e){e.src=e.dataset.src,e.classList.remove("lazy${Id}"),e.classList.add("image")})});`}
			</script>
		</div>
	);
}
