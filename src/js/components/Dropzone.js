const { MediaUpload, MediaUploadCheck } = wp.blockEditor
const { Button, DropZone, FormFileUpload, Placeholder, Spinner } = wp.components
const { withState } = wp.compose
const { __ } = wp.i18n


function Dropzone({ isUploading, image, onFileChanged, setState }) {
	const ALLOWED_MEDIA_TYPES = ['image']

	const onFileUploaded = (file) => {
		if (file.hasOwnProperty('url') && file.hasOwnProperty('id') && 'blob' !== file.url.substr(0, 4)) {
			onFileChanged(file)
			setState({ isUploading: false })
		}
	}

	const uploadFile = ( file ) => {
		wp.editor.mediaUpload({
			allowedTypes: ALLOWED_MEDIA_TYPES,
			filesList: file,
			onFileChange: (file) => {
				onFileUploaded(file[0])
			}
		})
	}

	return (
		<Placeholder
				icon="format-image"
				label={__('Image', 'mwp-gutenberg')}
				instructions={__('Drag an image, upload a new one or select a file from your library.', 'mwp-gutenberg')}
		>
			<MediaUploadCheck>
				<DropZone
					onFilesDrop={(file) => {
						if (!file) return
						setState({ isUploading: true })
						uploadFile(file)
					}}
				/>
				{ isUploading && <Spinner /> }
				{ !isUploading &&
					<FormFileUpload
						accept="image/*"
						isLarge={true}
						onChange={(e) => e.target.files && uploadFile(e.target.files)}
					>
						{__('Upload', 'mwp-gutenberg')}
					</FormFileUpload>
				}
				{ !isUploading &&
					<div className="components-media-library-button">
						<MediaUpload
							allowedTypes={ ALLOWED_MEDIA_TYPES }
							onSelect={( media ) => onFileChanged(media)}
							render={({ open }) => (
								<Button isLarge={true} onClick={open}>
									{__('Media Library', 'mwp-gutenberg')}
								</Button>
							)}
						/>
					</div>
				}
			</MediaUploadCheck>
		</Placeholder>
	)
}

export default withState({ isUploading: false })( Dropzone )
