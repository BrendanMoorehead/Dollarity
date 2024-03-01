import React from 'react'
import { Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

const PageLayout = () => {
  return (
    <Layout 
    style={{
      minHeight: '100vh',
      backgroundColor: '#0d0d0d'
    }}>
      <Sider style={
        styles.sider
      }>
        <div className="demo-logo-vertical" />
      </Sider>
    </Layout>
  )
}

export const styles = {
  sider: {
    backgroundColor: '#1c1c1c',
  }
}

export default PageLayout