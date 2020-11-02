/**
 * The content of the footer displayed at the bottom of the app
 * @module src/components/footercontent
 * @author Joe Standring
 * @see src/home.js for where this module is used
 */

import { Typography } from 'antd';

const { Paragraph } = Typography;

/**
 * Display contents of the footer component
 * @returns {string} The HTML code to display elements
 */
function FooterContent(props) {
  return(
    <>
      <Paragraph style={ { textAlign: "center" } }>© 2020 Joe Standring</Paragraph>
    </>
  );
}

/** Export the component to be rendered in home.js */
export default FooterContent;
