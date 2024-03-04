import React from 'react'
import { Button, Drawer, Segmented } from 'antd';
import { useState } from 'react';
import NewAccountForm from './NewAccountForm';
const NewAccountDrawer = () => {
    const [open, setOpen] = useState(false);

    const showAccountDrawer = () => setOpen(true);
    const onCloseAccountDrawer = () => setOpen(false);

  return (
    <>
        <Button type='primary' onClick={showAccountDrawer}>
            Open Account Drawer
        </Button>
        <Drawer type="primary" onClose={onCloseAccountDrawer} open={open}>
            <NewAccountForm />
        </Drawer>
    </>
  )
}

export default NewAccountDrawer