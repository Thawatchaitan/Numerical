import React,{Component} from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Icon } from 'antd';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
///Root of Equation
import Bisection from './pages/Root of Equation/Bisection'
import FalsePosition from './pages/Root of Equation/False-Position'
import Newtonraphson from './pages/Root of Equation/Newton-raphson'
import Onepoint from './pages/Root of Equation/OnePoint'
import Secant from './pages/Root of Equation/Secant'

///Linear Algebra
import Cramer from './pages/Linear Algebra/Cramer'



///Integration
import Trapzoidal from './pages/Integration/Trapzoidal'
import CompositeTrapzoidal from './pages/Integration/CompositeTrapzoidal'
import Simpson from './pages/Integration/Simpson'
import CompositeSimpson from './pages/Integration/CompositeSimpson';


///Difference
import Forward from './pages/Different/Forward';
import Backward from './pages/Different/Backward';
import Central from './pages/Different/Central';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class App extends Component {


  render() {
    return (
      <Router>
      <Layout>
      <Header className="header">
        <div className="logo" />
        <h1 style={{color:"blue"}}>NUMERICAL</h1>
      </Header>
      <Content style={{ padding: '10 200px' }} >
        {/* <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <Layout style={{ padding: '5px 0', background: '#F0FFFF' } }>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['']}// use key to open submenu
              style={{ height: '100%' }}
              theme="dark"
            >
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="minus" />
                    Root of Equation
                  </span>
                }
              >
                <Menu.Item key="R1">Bisection<Link to="/bisection" /></Menu.Item>
                <Menu.Item key="R2">False-Position<Link to="/falseposition" /></Menu.Item>
                <Menu.Item key="R3">One-point<Link to="/onepoint" /></Menu.Item>
                <Menu.Item key="R4">Newton-raphson<Link to="/newtonraphson" /></Menu.Item>
                <Menu.Item key="R5">Secant<Link to="/secant" /></Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="minus" />
                    Linear Algebra
                  </span>
                }
              >
                <Menu.Item key="L1">Cramer Rule<Link to="/cramer" /></Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub4"
                title={
                  <span>
                    <Icon type="minus" />
                    Integration
                  </span>
                }
              >
                <Menu.Item key="IN1">Trapzoidal<Link to="/trapzoidal"/></Menu.Item>
                <Menu.Item key="IN2">CompositeTrapzoidal<Link to="/compositetrapzoidal"/></Menu.Item>
                <Menu.Item key="IN3">Simpson<Link to="/simpson"/></Menu.Item>
                <Menu.Item key="IN4">CompositeSimpson<Link to="/compositesimpson"/></Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub5"
                title={
                  <span>
                    <Icon type="minus" />
                    Different
                  </span>
                }
              >
                <Menu.Item key="D1">Forward<Link to="/forward"/></Menu.Item>
                <Menu.Item key="D2">Backrward<Link to="/backward"/></Menu.Item>
                <Menu.Item key="D3">Central<Link to="/central"/></Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 1000 }}>
            {/* Root of Equation */}
            <Route path="/bisection" component={Bisection} />
            <Route path="/falseposition" component={FalsePosition} />
            <Route path="/newtonraphson" component={Newtonraphson} />
            <Route path="/onepoint" component={Onepoint} />
            <Route path="/secant" component={Secant} />

            {/* Linear Algebra */}
            <Route path="/cramer" component={Cramer} />

            {/* Integration */}
            <Route path="/trapzoidal" component={Trapzoidal}/>
            <Route path="/compositetrapzoidal" component={CompositeTrapzoidal}/>
            <Route path="/simpson" component={Simpson}/>
            <Route path="/compositesimpson" component={CompositeSimpson}/>

            {/* Different */}
            <Route path="/forward" component={Forward}/>
            <Route path="/backward" component={Backward}/>
            <Route path="/central" component={Central}/>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>For Numerical</Footer>
    </Layout>
    </Router>
    )
  }
}

export default App
