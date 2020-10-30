import { Typography } from 'antd';

const { Paragraph } = Typography;

function FooterContent(props) {
  return(
    <>
      <Paragraph style={ { textAlign: "center" } }>© 2020 Joe Standring</Paragraph>
    </>
  );
}

export default FooterContent;
