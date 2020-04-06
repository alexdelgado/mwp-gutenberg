const { registerBlockType } = wp.blocks

import Dropzone from '../components/Dropzone'
import Hero from '../components/Hero'

import Attachment from '../models/Attachment'

import { ReactComponent as BlockIcon } from '../../img/lnr-construction.svg'

registerBlockType(
	'mwp/hero',
	{
		title: 'Hero',
		category: 'mwp-gutenberg',
		icon: {
			src: BlockIcon
		},
		attributes: {
			background: {
				default: '',
				type: 'string'
			},
			title: {
				default: '',
				type: 'string'
			},
			tagline: {
				default: '',
				type: 'string'
			},
		},
		edit: (props) => {
			const {
				attributes: {
					background,
					title,
					tagline
				},
				className
			} = props

			const onBackgroundChanged = ( value ) => {
				const img = new Attachment(value)
				props.setAttributes({ background: img.sizes.full.url })
			}

			if (props.isSelected) {
				return (
					<div className="mwp-gutenberg-form">
						<h3 className="mwp-gutenberg-form__title">Hero</h3>
						<div className="mwp-gutenberg-form__group">
							<label className="mwp-gutenberg-form__label">Background Image</label>
							{background &&
								<div className="mwp-gutenberg-preview">
									<img src={background} className="mwp-gutenberg-preview__thumbnail" />
									<button
										className="mwp-gutenberg-preview__remove dashicons dashicons-trash"
										onClick={() => props.setAttributes({ background: null }) }
									/>
								</div>
							}
							{!background && <Dropzone onFileChanged={onBackgroundChanged} />}
						</div>
						<div className="mwp-gutenberg-form__group">
							<label htmlFor="hero-title" className="mwp-gutenberg-form__label">Title</label>
							<input
								type="text"
								id="hero-title"
								className="mwp-gutenberg-form__input"
								value={title}
								placeholder="Hero Title"
								onChange={(e) => props.setAttributes({ title: e.target.value })}
							/>
						</div>
						<div className="mwp-gutenberg-form__group">
							<label htmlFor="hero-tagline" className="mwp-gutenberg-form__label">Tagline</label>
							<input
								type="text"
								id="hero-tagline"
								className="mwp-gutenberg-form__input"
								value={tagline}
								placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
								onChange={(e) => props.setAttributes({ tagline: e.target.value })}
							/>
						</div>
					</div>
				)
			} else {
				return (
					<Hero
						classes={[className]}
						style={{backgroundImage: `url('${background}')` }}
						title={title}
						tagline={tagline}
					/>
				)
			}
		},
		save: (props) => {
			const {
				attributes: {
					alignment,
					background,
					title,
					tagline
				}
			} = props

			return (
				<Hero
					style={{backgroundImage: `url('${background}')`, textAlign: alignment }}
					title={title}
					tagline={tagline}
				/>
			)
		}
	}
)
