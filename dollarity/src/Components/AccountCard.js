import React from 'react'
import { MoreOutlined } from '@ant-design/icons'
import {Dropdown, Divider, Button, Space} from 'antd';
const items = [
    {
      label: '1st menu item',
      key: '1',
    },
    {
      label: '2nd menu item',
      key: '2',
    },
    {
      label: '3rd menu item',
      key: '3',
    },
];
const AccountCard = (props) => {

    const onClick = (e) => console.log(e);

  return (
    <div style={styles.card}>
        <Dropdown
        
            placement='topRight'
            menu={{
            items,
            }}
            dropdownRender={(menu) => (
                <div>
                    {React.cloneElement(menu, {
                    style: styles.menu,
                })}
                </div>
            )}
            ><a style={{justifySelf: 'end'}} onClick={(e) => e.preventDefault()}>
            <MoreOutlined style={{fontSize:'20px', paddingTop: '4px', justifySelf: 'end'}}/>
            </a>
        </Dropdown>
        <div style={styles.flex}>
            <div style={styles.accountDetails}>
            <p>TD Student Savings</p>
            <p>Spending</p>
            </div>

            <div style={styles.accountBalance}>
            <p>balance</p>
            <p>$3498.67</p>
            </div>
        </div>
    </div>
  )
}

const styles = {
    card: {
        backgroundColor: 'white', 
        padding: 16, 
        borderRadius: 20, 
        margin:20,

        display:'grid',
        gridTemplateRows: '1fr 4fr'
    },
    flex: {
        display: 'flex',
    },
}

export default AccountCard