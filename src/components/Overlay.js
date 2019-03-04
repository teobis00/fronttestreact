import React, { Component } from 'react';

const Overlay = (props) => {
	const componentClass = (props.showIn) ? ['overlay','show']:['overlay'];
	return(
		<div className={componentClass.join(' ')}></div>
	);
}

export default Overlay