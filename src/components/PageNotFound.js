import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

function PageNotFound () {
	return (
		<div>
			<Typography  variant="display4" align='center'>
				PAGE NOT FOUND
			</Typography>
			<Typography  variant="subheading" align='center'>
				<Link to="/">Home Page</Link>
			</Typography>
		</div>
	);
}

export default PageNotFound;