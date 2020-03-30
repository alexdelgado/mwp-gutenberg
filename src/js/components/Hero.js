export default function Hero(props) {
	const { classes, style, title, tagline } = props

	return (
		<section className={['hero'].concat(classes).join(' ').trim()} style={style}>
			<div className="hero__content">
				{title && <h2>{title}</h2>}
				{tagline && <p>{tagline}</p>}
			</div>
		</section>
	)
}
