import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import BriefQuestionsList from './BriefQuestionsList';

class Home extends Component {
	state = {
		value: 0,
	};

	handleChange = (event, value) => {
		this.setState({ value });
	};

	render () {
		const { answeredQuestionIds, unansweredQuestionIds } = this.props;
		const { value } = this.state;

		return (
			<div >
				<Tabs value={value} onChange={this.handleChange}>
					<Tab label="Unanswered Questions" />
					<Tab label="Answered Questions" />
				</Tabs>
				{value === 0 && <BriefQuestionsList 
									idsList={unansweredQuestionIds}
									emptyListNote='No more unswered questions'
								/>}
				{value === 1 && <BriefQuestionsList 
									idsList={answeredQuestionIds}
									emptyListNote='No answered questions'
								/>}
			</div>
		);
	}
}

function mapStateToProps ({ authedUser, questions, users }) {
	const answeredQuestionIds = Object.keys(questions)
								.filter((id) => users[authedUser].answers.hasOwnProperty(id))
								.sort((a, b) => questions[b].timestamp - questions[a].timestamp)

	const unansweredQuestionIds = Object.keys(questions)
								.filter((id) => !users[authedUser].answers.hasOwnProperty(id))
								.sort((a, b) => questions[b].timestamp - questions[a].timestamp)

	return {
		answeredQuestionIds,
		unansweredQuestionIds
	}
}

export default connect(mapStateToProps)(Home);