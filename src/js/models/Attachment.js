/**
 * Attachment Model
 *
 * @param int id Database ID of the attachment
 * @param string alt Alternate text to display for accessibility
 * @param string caption Caption to display with the image
 * @param string media_type Type of attachment
 * @param string mime_type MIME type of attachment
 * @param array sizes Array containing available image sizes
 * @param string title Title of the attachment
 */
export default class Attachment {

	constructor(data) {
		this.id = data.id
		this.alt = data.alt
		this.caption = data.caption
		this.media_type = data.media_type
		this.mime_type = data.mime_type
		this.sizes = this.parseSizes(data.sizes || data.media_details.sizes)
		this.title = data.title
	}

	isImage() {
		return this.media_type === 'image'
	}

	parseSizes(sizes) {
		let array = {}

		Object.entries(sizes).map((el) => {
			let props = el[1]

			array[el[0]] = {
				height: props.height,
				url: props.url || props.source_url,
				width: props.width,
			}
		})

		return array
	}
}
