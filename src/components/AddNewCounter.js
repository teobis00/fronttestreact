import React, {Component} from "react"
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { startNewPost,saveNewPost } from '../actions/postActions';

import KeyboardEventHandler from 'react-keyboard-event-handler';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faBan } from '@fortawesome/free-solid-svg-icons';


class AddNewCounter extends Component {
	constructor(props){
		super(props)
		this.myRef = React.createRef();
		this.state={
	      visibleClass : ['add-new-counter'],
	      title:'',
	      invalidName:false
	    }

		this.onCancelCreateCounter = this.onCancelCreateCounter.bind(this);
		this.onSaveCounter = this.onSaveCounter.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onCloseWithEsc = this.onCloseWithEsc.bind(this);
	}

	onCloseWithEsc(e){
		if(this.props.showIn){
			if(e.key === 'Escape' || e === 'esc'){
				this.setState({title:''});	
				this.props.startNewPost(false);
			}
		}
	}

	onSubmit(e){
		e.preventDefault();
		if(this.state.title.length === 0){
			this.setState({invalidName:true});
			return;
		}

		this.props.saveNewPost({title:this.state.title});
		this.props.startNewPost(false);
		this.setState({title:''});
	}

	onChange(e){
		this.setState({invalidName:false});
		const {name,value} = e.target;
		this.setState({
			[name]:value
		})
	}	
	
	onCancelCreateCounter(){
		this.setState({title:''});	
		this.props.startNewPost(false);
	}

	onSaveCounter(){
		if(this.state.title.length === 0){
			this.setState({invalidName:true});
			return;
		}

		this.props.saveNewPost({title:this.state.title});
		this.props.startNewPost(false);
		this.setState({title:''});	
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.showIn){
			this.myRef.current.scrollIntoView({behavior: 'smooth'});
			this.nameInput.focus();

			this.setState({visibleClass:['add-new-counter','show']});	
		}else{
			this.setState({visibleClass: ['add-new-counter']});	
		}
		
	}

	render(){
			return(
				<div className={this.state.visibleClass.join(' ')} ref={this.myRef}>
					<KeyboardEventHandler
	    				handleKeys={['esc']}
	    				onKeyEvent={this.onCloseWithEsc}
	    			/>
					<form autoComplete="off" onSubmit={this.onSubmit}>
						<input ref={(input) => { this.nameInput = input; }}  maxLength="75" name="title" placeholder="Type a name for your new counter" onKeyDown={this.onCloseWithEsc} onChange={this.onChange} value={this.state.title}/>
						{this.state.invalidName &&<span>*somebody may want to know the name of this counter, so type one please</span>}
					</form>
					<div></div>
					<div className="actions">
						 <button className="button" onClick={this.onSaveCounter}><FontAwesomeIcon icon={faCheck} /><span>Create new counter</span></button>
						 <button className="button __secondary" onClick={this.onCancelCreateCounter}><FontAwesomeIcon icon={faBan} /><span>Nevermind</span></button>	
					</div>
				</div>
			)
	}
}

AddNewCounter.propTypes = {
	startNewPost : PropTypes.func.isRequired,
	saveNewPost : PropTypes.func.isRequired,
	showIn : PropTypes.bool.isRequired
};

export default connect(null,{ startNewPost, saveNewPost })(AddNewCounter);