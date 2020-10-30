import { Menu } from 'antd';

function Nav(props) {
  return (
    <>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={ ['1'] }>
        <Menu.Item key="1">Home</Menu.Item>
        <Menu.Item key="2">Books</Menu.Item>
        <Menu.Item key="3">Users</Menu.Item>
      </Menu>
    </>
  );
}

export default Nav
