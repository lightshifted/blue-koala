import { useState } from 'react';
import { Menu } from 'antd';

const items = [
  {
    key: 'logo',
    type: 'logo',
    label: 'Apollo 🚀 Research Build',
    style: {
      fontSize: '22px',
      fontWeight: 'bold',
      marginTop: '3px',
      marginBottom: '3px',
      color: '#001529',
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
