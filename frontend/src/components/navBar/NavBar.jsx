import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const items = [
  {
    key: 'logo',
    type: 'logo',
    label: 'APOLLO V1.1 🚀',
    style: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginTop: '13px',
      display: 'flex',
      alignItems: 'center',
      color: '#001529',
      fontFamily: 'Roboto',
    }
  },
];

const Navbar = () => {
  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <div>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} theme="light">
      </Menu>
    </div>
  )
};

export default Navbar;
