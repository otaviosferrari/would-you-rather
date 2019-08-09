import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { setAuthedUser } from '../actions/authedUser';

class Login extends Component {
	state = {
		errorMsg: ''
	}

	handleSubmit = (e) => {
		const userID = this.userID.value;
		const { dispatch } = this.props;
		e.preventDefault();
        
		if (userID !== '') {
			dispatch(setAuthedUser(userID));
		} else {
			this.setState({errorMsg: 'Make a choice'});
		}
	}

	render () {
		const { userNames } = this.props;
		const { errorMsg } = this.state;

		return (
			<main style ={{width: 400, marginLeft: 'auto', marginRight: 'auto'}}>
					<div style={{textAlign: 'center', padding: 10}}>
						<span> Login </span>
					</div>
					{errorMsg ? <p><span style={{color:'red'}}>{errorMsg}</span><br /></p> : null}
					<form onSubmit={this.handleSubmit} style={{padding: 10}}>
						<FormControl required fullWidth>
							<select ref={(id) => this.userID = id}>
								<option value=''>Select user</option>
								{userNames.map((item) => <option value={item.value} key={item.value}>{item.label}</option>)}
							</select>
						</FormControl>
						<Button type='submit' fullWidth variant='raised' color='primary' style={{marginTop: 10}}>
							Login
						</Button>
					</form>
			</main>
		);
	}
}

function mapStateToProps ({ users }) {
	return {
		userNames: Object.keys(users).map((id) => ({
			value: id,
			label: users[id].name
		}))
	}
}

export default connect(mapStateToProps)(Login);