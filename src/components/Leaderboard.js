import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import UserStats from './UserStats';

class Leaderboard extends Component {
	render () {
		return (
			<div>
				<Typography variant='headline' component='h2' align='center'>
					Leaderboard
				</Typography>
				{this.props.userIDs.map((id) => (
					<UserStats key={id} id={id} />
				))}
			</div>
		);
	}
}

function mapStateToProps ({ users }) {
	const sortedUserIDs = Object.keys(users).sort((idA, idB) => {
		const scoreA = Object.keys(users[idA].answers).length + users[idA].questions.length;
		const scoreB = Object.keys(users[idB].answers).length + users[idB].questions.length;
		return scoreB - scoreA;
	});

	return {
		userIDs: sortedUserIDs
	}
}

export default connect(mapStateToProps)(Leaderboard);