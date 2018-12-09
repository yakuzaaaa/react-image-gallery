import React from 'react';
import Modal from 'react-modal';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		height: 'auto',
		width: 'auto',
		backgroundColor: '#ca5454',
		color: 'white',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)'
	}
};
const previewImageStyles = {
	maxWidth: (window.innerWidth - 50) + 'px',
	height: 'auto'
};

Modal.setAppElement('#root')

class PreviewImageModal extends React.Component {
	render() {
		return (
			<Modal
				isOpen={this.props.modalIsOpen}
				onRequestClose={() => { this.props.onClose(); }}
				style={customStyles}
				contentLabel="Example Modal"
			>
				<div style={{ textAlign: "center" }}>
					{
						this.props.imageSrc
							? <img src={this.props.imageSrc} alt="" style={previewImageStyles} />
							: ''
					}
				</div>
			</Modal>
		);
	}
}

export default PreviewImageModal;