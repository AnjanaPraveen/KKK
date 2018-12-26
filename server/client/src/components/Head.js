import React, {Component } from 'react';
import { Layout, Menu } from 'antd';

const { Header } = Layout;


class Head extends Component {
    render() {
        return(
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1">Dashboard</Menu.Item>
              <Menu.Item key="2">Login</Menu.Item>
              <Menu.Item key="3"><a href="http://localhost:5000/auth/google">Sign Up With Google</a></Menu.Item>
            </Menu>
          </Header>
          
        </Layout>
        )
    }
    }
 export default Head;
