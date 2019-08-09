import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { reSetAuthedUser } from '../actions/authedUser'; 

function Nav (props) {
	const { user, dispatch } = props;
	
	const handleLogout = () => {
		dispatch(reSetAuthedUser());
	}
	
	return (
		<Fragment>
			<Toolbar style={{textAlign: 'space-between'}}>
					<Button variant="outlined" size="small" onClick={handleLogout}>
						{user.name} - Logout
					</Button>
			</Toolbar>

			<Toolbar variant="dense">
				<Typography variant='subheading'>
					<NavLink to='/' exact activeClassName='active'>
							Home
					</NavLink>&nbsp;&nbsp;
					<NavLink to='/add' activeClassName='active'>
							New Question
					</NavLink>&nbsp;&nbsp;
					<NavLink to='/leaderboard' activeClassName='active'>
							Leaderboard
					</NavLink>
				</Typography>
			</Toolbar>
		</Fragment>
	)
}

function mapStateToProps({ users, authedUser}) {
	return { 
		user: users[authedUser]
	}
}

export default connect(mapStateToProps)(Nav);