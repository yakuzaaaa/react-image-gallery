import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class FloatingActionButton extends Component {
	render() {
		return (
			<div className="fab" onClick={() => {
				this.props.onClick();
			}}>
				<div className="icon">
					<FontAwesomeIcon icon="plus" />
				</div>
			</div>
		);
	}
}

export default FloatingActionButton;
