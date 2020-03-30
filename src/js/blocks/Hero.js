const { registerBlockType } = wp.blocks
const { AlignmentToolbar, BlockControls } = wp.blockEditor

import Dropzone from '../components/Dropzone'
import Attachment from '../models/Attachment'

import { ReactComponent as BlockIcon } from '../../img/lnr-construction.svg'

registerBlockType(
	'mwp/hero',
	{
		title: 'Hero',
		icon: {
			src: BlockIcon
		},
		category: 'mwp-gutenberg',
		attributes: {
			alignment: {
				default: 'none',
				type: 'string'
			},
			background: {
				selector: '',
				source: 'html'
			},
			title: {
				selector: '#hero-title',
				source: 'html'
			},
			tagline: {
				selector: '#hero-tagline',
				source: 'html'
			},
		},
		supports: {
			align: ['full', 'wide']
		},
		edit: (props) => {
			const {
				attributes: {
					alignment,
					background,
					title,
					tagline
				},
				className,
			} = props

			const onChangeAlignment = ( value ) => {
				props.setAttributes( { alignment: value === undefined ? 'none' : value } )
			}

			const onBackgroundChanged = ( value ) => {
				const img = new Attachment(value)
				props.setAttributes({ background: img.sizes.full.url })
			}

			return (
				<div className="mwp-gutenberg-form">
					<BlockControls>
						<AlignmentToolbar
							value={ alignment }
							onChange={ onChangeAlignment }
						/>
					</BlockControls>
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
						<input type="text" id="hero-title" className="mwp-gutenberg-form__input" value={title} placeholder="Hero Title" />
					</div>
					<div className="mwp-gutenberg-form__group">
						<label htmlFor="hero-tagline" className="mwp-gutenberg-form__label">Tagline</label>
						<input type="text" id="hero-tagline" className="mwp-gutenberg-form__input" value={tagline} placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit" />
					</div>
				</div>
			)
		},
		save: (props) => {
			return (
				<div className="hero">
				</div>
			)
		}
	}
)
