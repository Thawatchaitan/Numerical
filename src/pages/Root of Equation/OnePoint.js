import React, { Component } from 'react'
import { Layout,Input,Button ,Card,Table } from 'antd';
import 'antd/dist/antd.css';
import {compile} from 'mathjs';
import { LineChart, Line, CartesianGrid, XAxis, YAxis,Tooltip,Legend } from 'recharts';
import axios from "axios";
const {Content} = Layout;
const InputStyle = {
    background: "white",
    color: "black", 
    fontWeight: "bold", 
    fontSize: "24px"

};
var dataInTable;
const columns = [
    {
      title: "Iteration",
      dataIndex: "iteration",
      key: "iteration"
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
  var fx = " ";
class Onepoint extends Component{
    constructor() {
        super();
        this.state = {
            fx: "",
            x0: 0,
            showOutputCard: false,
            showGraph: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.onepoint = this.onepoint.bind(this);
    }
    onepoint(xold) {
        fx = this.state.fx;
        var xnew = 0;
        var epsilon= parseFloat(0.000000);
        var n=0;
        var data  = []
        data['x'] = []
        data['error'] = []

        do{ 
            xnew = this.func(xold);
            epsilon = this.error(xnew, xold)
            data['x'][n] =  xnew.toFixed(8);
            data['error'][n] = Math.abs(epsilon).toFixed(8);
            n++;  
            xold = xnew;

        }while(Math.abs(epsilon)>0.000001);

        this.createTable(data['x'], data['error']);
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
    createTable(x, error) {
        dataInTable = []
        for (var i=0 ; i<x.length ; i++) {
            dataInTable.push({
                iteration: i+1,
                x: x[i],
                error: error[i]
            });
        }
    }
    data = async () => {
        var response = await axios.get('http://localhost:3001/api/users/showone').then(res => { return res.data })
        this.setState({
            fx: response['data'][0]['fx'],
            x: response['data'][0]['x'],
            showapi: true
        });
        this.onepoint(this.state.x)
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        return(
            <div style={{ background: "#FFFF", padding: "30px" }}>
                <h2 style={{color: "black", fontWeight: "bold"}}>Onepoint</h2>
                <div>
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
                        <h2>X<sub>0</sub></h2><Input size="large" name="x0" style={InputStyle}></Input><br/><br/>
                        <Button id="submit_button" onClick= {
                                ()=>this.onepoint(parseFloat(this.state.x0))
                            }  
                        style={{background: "#4caf50", color: "white", fontSize: "20px"}}>Submit <br></br></Button>&nbsp;&nbsp;
                        <Button id="submit_button" onClick= {
                                ()=>this.data()
                            }  
                        style={{background: "#4caf50", color: "white", fontSize: "20px"}}>Example <br></br></Button>
                    </Content>

                    <br/><br/>
                    {this.state.showGraph &&
                        
                        <div className={"my-pretty-chart-container"}>
                            <Card bordered={true}
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
                        </div>
                }
                    
                    {this.state.showOutputCard &&
                            <Table columns={columns} dataSource={dataInTable}  bodyStyle={{fontWeight: "bold", fontSize: "18px", color: "black"}}
                            ></Table>

                    } 
                </Content>
                </div>
            </div>
        )
    }
}
export default Onepoint;
