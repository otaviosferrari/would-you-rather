import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './components/Login';
import PrivateApp from './components/PrivateApp';
import { handleInitialData } from './actions/shared';

class App extends Component {
	componentDidMount () {
		this.props.dispatch(handleInitialData());
	}

	render() {
		const { authedUser, loadingBar } = this.props;

		return (
			<Router>
				<Fragment>
					{loadingBar.default === undefined || loadingBar.default === 1
						? ( <div style={{display: 'flex', justifyContent: 'center'}}></div>
						)
						: ( <div >
							{!authedUser 
								? <Login />
								: <PrivateApp />
							}
							</div>
						)
					}
				</Fragment>
			</Router>
		);
	}
}

function mapStateToProps ({ authedUser, loadingBar }) {
	return {
		authedUser,
		loadingBar
	}
}

export default connect(mapStateToProps)(App);