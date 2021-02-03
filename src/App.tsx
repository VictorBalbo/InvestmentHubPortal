import React from 'react';
import { OverviewComponent } from './Overview';
import { Menu } from 'antd';
import './App.scss';
import Logo from './assets/logo.svg';

function App() {
  return (
    <section id="App">
      <aside id="SideMenu">
        <div className="logo">
          <img src={Logo} alt="Cerberus Logo" />
          <span>InvestmentHub</span>
        </div>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1">Summary</Menu.Item>
        </Menu>
      </aside>
      <section id="MainSection">
        <header id="MainHeader">Header</header>
        <main id="MainContent">
          <OverviewComponent />
        </main>
        <footer id="MainFooter">
          <div>InvestmentHub ©{new Date().getFullYear()}</div>
        </footer>
      </section>
    </section>
  );
}

export default App;
