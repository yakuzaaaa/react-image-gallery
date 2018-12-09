import React from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		height: 'auto',
		width: '250px',
		backgroundColor: 'red',
		color: 'white',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)'
	}
};
// const previewImageStyles = {
// 	// height: '250px',
// 	// width: '250px',
// 	// marginTop: '30px',
// 	// border: '2px solid white'
// };

Modal.setAppElement('#root')

class UploadImageModal extends React.Component {
	fileInputRef = null;

	render() {
		return (
			<Modal
				isOpen={this.props.modalIsOpen}
				onRequestClose={() => { this.props.onClose(); }}
				style={customStyles}
			>
				<div style={{ textAlign: "center" }} onClick={() => {
					if (this.fileInputRef) {
						this.fileInputRef.click();
					}
				}}>
					<FontAwesomeIcon icon="file-upload" style={{ fontSize: '3em' }} />
					<span style={{ fontSize: '2em', marginLeft: '20px' }}>Upload an image</span>
					{
						// this.props.newUploadPreview
						// 	? <img src={this.props.newUploadPreview} alt="" style={previewImageStyles} />
						// 	: ''
					}
				</div>
				<input
					type="file"
					style={{ display: 'none' }}
					ref={(input) => { 
						this.fileInputRef = input; 
					}}
					onChange={(event) => { this.handleChange(event); }} />
			</Modal>
		);
	}

	handleChange(event) {
		const fileInput = event.target;
		const file = fileInput.files[0];
		const reader = new FileReader();

		reader.addEventListener("load", () => {
			const res = reader.result;
			this.props.onFileRead && this.props.onFileRead(res);
		}, false);

		if (file) {
			reader.readAsDataURL(file);
		}
	}
}

export default UploadImageModal;