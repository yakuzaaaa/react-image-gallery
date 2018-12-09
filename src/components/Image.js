import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const moment = require('moment');

class Image extends Component {
	getUploadTimeFormatted() {
		return moment(this.props.timestamp).format('LLL');
	}

	render() {
		return (
			<div className="image-wrapper">
				<div className="image">
					<img src={this.props.image.Image} alt={this.props.alt || 'load failed'} onClick={(event) => {
						this.props.onImageClick && this.props.onImageClick(event.target.src)
					}} />
					<p>
						{this.props.image.likes}
						<span onClick={() => {
							this.props.onLikeToggle(this.props.image);
						}}>
							{
								this.props.image.isLiked
									? <FontAwesomeIcon icon="heart" style={{ marginLeft: '20px', color: '#f00' }} />
									: <FontAwesomeIcon icon="heart" style={{ marginLeft: '20px', color: '#24ffff' }} />
							}
						</span>
					</p>
					<p className="image-timestamp">{this.getUploadTimeFormatted()}</p>
				</div>
			</div>
		);
	}
}

export default Image;
