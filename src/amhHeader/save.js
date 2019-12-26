const { RichText } = wp.blockEditor;

export default function save(props) {
	const {
		fontSize,
		textAlign,
		marginBottom,
		marginTop,
		content,
		fontWeight,
		lineHeight,
		color,
		Id
	} = props.attributes;

	return (
		<div>
			<style>
				{`					
.amhHeader-wrap-${Id} > div {
max-width: 100%;
font-size: ${fontSize.desktop}rem;
text-align: ${textAlign.desktop};
margin-top: ${marginTop.desktop}em;
margin-bottom: ${marginBottom.desktop}em;
line-height: ${lineHeight.desktop}em;
font-weight: ${fontWeight.desktop};
color: ${color};
}

@media (max-width: 768px) {
.amhHeader-wrap-${Id} > div {
font-size: ${fontSize.tablet}rem;
text-align: ${textAlign.tablet};
margin-top: ${marginTop.tablet}em;
margin-bottom: ${marginBottom.tablet}em;
line-height: ${lineHeight.tablet}em;
font-weight: ${fontWeight.tablet};
color: ${color};
}
}
@media (max-width: 375px) {
.amhHeader-wrap-${Id} > div {
font-size: ${fontSize.mobile}rem;
text-align: ${textAlign.mobile};
margin-top: ${marginTop.mobile}em;
margin-bottom: ${marginBottom.mobile}em;
line-height: ${lineHeight.mobile}em;
font-weight: ${fontWeight.mobile};
color: ${color};
}
}
`}
			</style>
			<div
				className={
					color !== ""
						? `amhHeader-wrap-${Id}`
						: `amhHeader-wrap-${Id} is-style-jmh-text-color`
				}
			>
				<RichText.Content tagName="div" value={content} />
			</div>
		</div>
	);
}
