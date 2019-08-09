import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PageNotFound from './PageNotFound';

function formatDate (timestamp) {
	const d = new Date(timestamp);
	const time = d.toLocaleTimeString('en-US');

	return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString();
}

class AnsweredQuestion extends Component {
	render () {
		const { question, author, authedUser } = this.props;
      
		if (question === null) {
			return <PageNotFound />;
		}
      
		const { optionOne, optionTwo, timestamp } = question;
		const { name, avatarURL } = author;
		const totalVotes = optionOne.votes.length + optionTwo.votes.length;

		return (
			<Card style={{width: '50%', margin: '1em auto', padding: '1em', display: 'block', }}>
				<CardContent>
					<Avatar alt={name} src={avatarURL} />
					<Typography component='div'>
						Would you rather...<br />
						<ul>
							<li>
								{optionOne.text} 
								{optionOne.votes.includes(authedUser) 
								? <span style={{color:'red'}}> *</span> 
								: null}
							</li>
							{optionOne.votes.length}/{totalVotes} users - {Math.round(optionOne.votes.length / totalVotes * 100)}% <br /> 
							<li>
								{optionTwo.text} 
								{optionTwo.votes.includes(authedUser) 
								? <span style={{color:'red'}}> *</span> 
								: null}
							</li>
							{optionTwo.votes.length}/{totalVotes} users - {Math.round(optionTwo.votes.length / totalVotes * 100)}%
						</ul>
						{formatDate(timestamp)}
					</Typography>
				</CardContent>
			</Card>
		);
	}
}

function mapStateToProps ({ questions, users, authedUser }, { id }) {
	const question = questions[id];

	return {
		question: question
			? question
			: null,
		author: question 
			? users[question.author] 
			: null,
		authedUser
	}
}

export default connect(mapStateToProps)(AnsweredQuestion);