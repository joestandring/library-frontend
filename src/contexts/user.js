/**
 * Create a global 'user' context for login management
 * @module contexts/user
 * @author Joe Standring
 * @see src/App.jsx for where this context is used
 */

import React from 'react';

const UserContext = React.createContext();

/** Export context for use in other modules */
export default UserContext;