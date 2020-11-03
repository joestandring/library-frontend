/**
 * Container for login and signup forms
 * @module src/components/login
 * @author Joe Standring
 * @see src/components/App.jsx for where this module is imported
 * @see src/components/signunform.jsx for the sign up form
 */

import { Typography, Radio, Space } from 'antd';
import SignUpForm from './signupform'

const { Title } = Typography;

/**
 * Display contents of the Login component
 * @returns {string} The HTML code to display elements
 */

function Login(props) {
  const options = [
    { label: 'Log in', value: 'Log in' },
    { label: 'Sign up', value: 'Sign up' },
  ];
  
  return(
    <>
      <div style={ { padding: '2% 20%', textAlign: 'center' } }>
        <Title>Borrow one of thousands of free books on Public Library</Title>
        
        <Space direction="vertical">
          <Radio.Group
            options={ options }
            optionType="button"
          />

          <SignUpForm />
        </Space>
      </div>
    </>
  );
}

/** Export the component to be rendered in App.jsx */
export default Login;
