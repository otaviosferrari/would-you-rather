import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { handleAddAnswer } from '../actions/questions';
import PageNotFound from './PageNotFound';

function formatDate (timestamp) {
	const d = new Date(timestamp);
	const time = d.toLocaleTimeString('en-US');

	return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString();
}

class UnansweredQuestion extends Component {
	state = {
		errorMsg: ''
	}

	handleSubmit = (id, e) => {
		const answer = this.form.answer.value;
		const { dispatch } = this.props;
		e.preventDefault();
        
		if (answer !== '') {
			dispatch(handleAddAnswer(id, answer));
		} else {
			this.setState({errorMsg: 'Make a choice'});
		}
	}

	render () {
		const { question, author } = this.props;
		if (question === null) {
			return <PageNotFound />;
		}

		const { optionOne, optionTwo, timestamp, id } = question;
		const { name, avatarURL } = author;
		const { errorMsg } = this.state;

		return (
			<Card style={{width: '50%', margin: '1em auto', padding: '1em', display: 'block' }}>
				<form onSubmit={(e) => this.handleSubmit(id, e)} ref={(f) => this.form = f}>
					<CardContent>
						<Avatar alt={name} src={avatarURL} />
						<Typography component='div'>
							<p>Would you rather...</p><br />
							{errorMsg ? <p><span style={{color:'red'}}>{errorMsg}</span><br /></p> : null}
							<input type="radio" value='optionOne' name="answer" /> {optionOne.text}<br />
							<input type="radio" value='optionTwo' name="answer" /> {optionTwo.text}<br />
							<p>Asked at {formatDate(timestamp)}</p>
						</Typography>
					</CardContent>
					<CardActions>
						<button type='submit'>Vote</button>
					</CardActions>
				</form>
			</Card>
		);
	}
}

function mapStateToProps ({ questions, users }, { id }) {
	const question = questions[id];
	return {
		question: question
			? question
			: null,
		author: question 
			? users[question.author] 
			: null
	}
}

export default connect(mapStateToProps)(UnansweredQuestion);