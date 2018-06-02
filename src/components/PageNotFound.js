import React from 'react';
import {Link} from 'react-router-dom';

const PageNotFound = () => (
    <div>
        Error 404: Page Not Found! <Link to="/">Homepage</Link>
    </div>
);

export default PageNotFound;