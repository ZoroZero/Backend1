import React from 'react';
import UserList from './UserList/UserList';
import './App.css';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
const { Header, Content, Footer } = Layout;



function App() {
  return (
      <Layout className="App">
      <Header>
        <img src ="logo.jpg" className ="logo"></img>
        <b>Assignment 1</b>
      </Header>

      <Content>
        <div className = "content">
          {/* <AddUserSection></AddUserSection> */}
        <UserList></UserList>
        </div>
      </Content>

      <Footer theme="dark">an.ngo@netpower.no</Footer>
    </Layout>
      
  );
}

export default App;
