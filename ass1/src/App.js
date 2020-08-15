import React from 'react';
import UserList from './UserList/UserList';
import './App.css';
import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;


function App() {
  return (
      <Layout className="App">
      <Header>
        <img src ="logo.jpg" className ="logo"></img>
        <b>Assignment 1</b>
      </Header>

      <Content>
        <UserList></UserList>
      </Content>

      <Footer>Footer</Footer>
    </Layout>
      
  );
}

export default App;
