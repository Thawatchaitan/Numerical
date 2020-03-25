import React, { Component} from 'react'
import 'antd/dist/antd.css';
import axios from 'axios';
import { Layout,Input,Button ,Card,Table } from 'antd';
import {compile} from 'mathjs';
import { LineChart, Line, CartesianGrid, XAxis, YAxis,Tooltip,Legend } from 'recharts';
const {Content} = Layout;

const InputStyle = {
    background: "white",
    color: "black", 
    fontWeight: "bold", 
    fontSize: "24px"

};
var dataInTable = []
const columns = [
    {
      title: "Iteration",
      dataIndex: "iteration",
      key: "iteration"
    },
    {
      title: "XL",
      dataIndex: "xl",
      key: "xl"
    },
    {
      title: "XR",
      dataIndex: "xr",
      key: "xr"
    },
    {
        title: "X",
        dataIndex: "x",
        key: "x"
    },
    {
      title: "Error",
      key: "error",
      dataIndex: "error"
    }
  ];

var fx
class Bisec extends Component{

    constructor() {
        super();
        this.state = {
            fx: "",
            xl: 0,
            xr: 0,
            showOutputCard: false,
            showGraph: false,
            moveLeft: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.bisection = this.bisection.bind(this);
    }
    bisection(xl, xr) {
        fx = this.state.fx;
        var increaseFunction = false;
        var xm = 0;
        var sum= parseFloat(0.000000);
        var n=0;
        var data  = []
        data['xl'] = []
        data['xr'] = []
        data['x'] = []
        data['error'] = []
        if (this.func(xl) < this.func(xr)) {
            increaseFunction = true;
        }

        do{ 
            xm = (xl + xr) / 2;
            if (this.func(xm)*this.func(xr) < 0) { 
                sum = this.error(xm,xr);
                if (increaseFunction) {
                    xl = xm;
                }
                else {
                    xr = xm;
                }
                
            } 
            else {
                sum = this.error(xm,xl);
                if (increaseFunction) {
                    xr = xm;
                }
                else {
                    xl = xm;
                } 
            }                
            data['xl'][n]  =   xl;
            data['xr'][n]  =   xr;
            data['x'][n]   =   xm.toFixed(8);
            data['error'][n] = Math.abs(sum).toFixed(8);
            n++;
        }while(Math.abs(sum)>0.000001);
        this.createTable(data['xl'], data['xr'], data['x'], data['error']);
        this.setState({
            showOutputCard: true,
            showGraph: true
        })
    }
    func(X) {
        var expr = compile(this.state.fx);
        let scope = {x:parseFloat(X)};
        return expr.eval(scope);        
    }
    error(xnew, xold) {
        return Math.abs((xnew-xold) / xnew);
    }
    createTable(xl, xr, x, error) {
        dataInTable = []
        for (var i=0 ; i<xl.length ; i++) {
            dataInTable.push({
                iteration: i+1,
                xl: xl[i],
                xr: xr[i],
                x: x[i],
                error: error[i]
            });
        }
    }
    data = async () => {
        var response = await axios.get('http://localhost:3001/api/users/showbisec').then(res => { return res.data })
        this.setState({
            fx: response['data'][0]['fx'],
            xl: response['data'][0]['xl'],
            xr: response['data'][0]['xr'],
            showapi: true
        });
        this.bisection(this.state.xl,this.state.xr)
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render(){
        return(

            <div style={{ background: "#FFFF", padding: '0 24px', minHeight: 1000 }}>

                <h2 style={{color: "black", fontWeight: "bold"}}>Bisection</h2>
                <Content 
                    onChange={this.handleChange}
                    style={{ padding: '0 50px',
                    background: "#D2B48C",
                    width:'100%%',
                    borderRadius:"15px"
                }}
                >
                    <Content
                        style={{background: "#D2B48C", borderRadius:"50px" , width:500}}
                    >
                        <h2>f(x)</h2><Input size="large" name="fx" style={InputStyle}></Input>
                        <h2>X<sub>L</sub></h2><Input size="large" name="xl" style={InputStyle}></Input>
                        <h2>X<sub>R</sub></h2><Input size="large" name="xr" style={InputStyle}></Input><br/><br/>
                        <Button id="submit_button" onClick= {
                                ()=>this.bisection(parseFloat(this.state.xl), parseFloat(this.state.xr))
                            }  
                        style={{background: "#4caf50", color: "white", fontSize: "20px"}}>Submit <br></br></Button>&nbsp;&nbsp;
                        <Button id="submit_button" onClick= {
                                ()=>this.data()
                            }  
                        style={{background: "#4caf50", color: "white", fontSize: "20px"}}>Example <br></br></Button>
                    </Content>
                    <br/><br/>
                    {this.state.showGraph &&
                                <Card
                                    style={{borderRadius:"50px"}}
                                >
                                <LineChart width={730} height={250} data={dataInTable}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                        <XAxis dataKey="error" />
                                        <YAxis />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Tooltip />
                                        <Legend verticalAlign="top" height={36} />
                                        <Line name="error" type="monotone" dataKey="error" stroke="#8884d8" />
                                    </LineChart>
                                </Card>
                    }
                    
                    {this.state.showOutputCard &&
                        <Card
                            style={{borderRadius:"10px"}}
                        >
                            <Table columns={columns} dataSource={dataInTable}  bodyStyle={{fontWeight: "bold", fontSize: "18px", color: "black"}}></Table>
                        </Card>
                    }
                </Content>
            </div>
        )
    }
}
export default Bisec;