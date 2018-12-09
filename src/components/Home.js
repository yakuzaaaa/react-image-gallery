import React, { Component } from 'react';
import Api from '../lib/Api';
import Image from './Image';
import UploadImageModal from './UploadImageModal';
import FloatingActionButton from './FloatingActionButton';
import PreviewImageModal from './PreviewImageModal';

const moment = require('moment');

class Home extends Component {
	anchorElement = null;
	constructor(props) {
		super(props);
		this.state = {
			images: [],
			isUploadModalShown: false,
		};
	}

	componentDidMount() {
		Api.fetchImages().then((images) => {
			this.setState({
				images
			});
		});
	}

	render() {
		return (
			<div className="content">
				<div className="images-list">
					{
						this.state.images.map((img) => {
							return <Image
								image={img}
								key={img.Image}
								onLikeToggle={this.onLikeToggle.bind(this)}
								onImageClick={
									(src) => {
										this.setState({
											previewImage: src
										})
									}
								} />
						})
					}
					<div style={{ height: '1px', width: '1px' }} ref={(el) => { this.anchorElement = el; }}></div>
				</div>
				<FloatingActionButton onClick={this.onUploadFABClicked.bind(this)} />
				<UploadImageModal
					modalIsOpen={this.state.isUploadModalShown}
					onClose={this.closeUploadModal.bind(this)}
					onFileRead={this.onFileRead.bind(this)}
				// newUploadPreview={this.state.newUploadPreview}
				/>
				<PreviewImageModal imageSrc={this.state.previewImage} modalIsOpen={this.state.previewImage != null} onClose={this.onPreviewClose.bind(this)} />
			</div>
		);
	}

	onLikeToggle(image) {
		const wasLiked = image.isLiked;
		if (wasLiked) {
			image.isLiked = false;
			image.likes -= 1;
		} else {
			image.isLiked = true;
			image.likes += 1;
		}
		const newImages = this.state.images.slice();
		this.saveBackToStorage(newImages);
		this.setState({
			images: newImages
		});
	}

	onUploadFABClicked() {
		// this.setState({ ...this.state, isUploadModalShown: !this.state.isUploadModalShown, newUploadPreview: null });
		this.setState({ ...this.state, isUploadModalShown: !this.state.isUploadModalShown });
	}

	closeUploadModal() {
		this.setState({ ...this.state, isUploadModalShown: false });
	}

	onPreviewClose() {
		this.setState({
			previewImage: null
		});
	}

	onFileRead(dataUrl) {
		Api.storageSet("instaFile", dataUrl);

		const added = {
			"Image": dataUrl,
			"likes": 0,
			"timestamp": moment().format()
		};

		const newImagesArray = [...this.state.images, added];
		this.saveBackToStorage(newImagesArray);
		this.setState({
			images: newImagesArray,
			isUploadModalShown: false,
			// 	newUploadPreview: dataUrl
		});

		this.scrollToBottom();
	}

	saveBackToStorage(newImagesArray) {
		Api.storageSet(Api.LOCAL_STORAGE_KEY, newImagesArray);
	}

	scrollToBottom() {
		this.anchorElement && this.anchorElement.scrollIntoView({ behavior: 'smooth' });
	}
}

export default Home;
