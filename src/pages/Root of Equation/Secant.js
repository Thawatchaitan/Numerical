import React, { Component } from 'react'
import { Layout,Input,Button ,Card,Table } from 'antd';
import 'antd/dist/antd.css';
import {compile} from 'mathjs';
import { LineChart, Line, CartesianGrid, XAxis, YAxis,Tooltip,Legend } from 'recharts';

const {Content} = Layout
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
        title: "Y",
        dataIndex: "x2",
        key: "x2"
    },
    {
      title: "Error",
      key: "error",
      dataIndex: "error"
    }
];
  var fx = " ";
class Secant extends Component{
    constructor() {
        super();
        this.state = {
            fx: "",
            x0: 0,
            x1: 0,
            showOutputCard: false,
            showGraph: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.secant = this.secant.bind(this);
    }
    secant(x0, x1) {
        fx = this.state.fx;
        var x = [], x2=0, epsilon = parseFloat(0.000000);
        var n=1, i=1;
        var data  = []
        data['x2'] = []
        data['error'] = []
        x.push(x0);
        x.push(x1);
        data['x2'][0] = x0;
        

        do{ 
            x2 = x[i] - (this.func(x[i])*((x[i]-x[i-1])))/(this.func(x[i])-this.func(x[i-1]));
            x.push(x2);
            epsilon = this.error(x2,x[i]);
            data['x2'][n]   =   x2.toFixed(8);
            data['error'][n] =   Math.abs(epsilon).toFixed(6);

            n++;  
            i++;

        }while(Math.abs(epsilon)>0.000001);
        this.createTable(data['x2'], data['error']);
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
    createTable(x2, error) {
        dataInTable = []
        for (var i=1 ; i<x2.length ; i++) {
            dataInTable.push({
                iteration: i,
                x2: x2[i],
                error: error[i]
            });
        }
    
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        return (
            <div style={{ background: "#FFFF", padding: "30px" }}>
                <h2 style={{color: "black", fontWeight: "bold"}}>Secant</h2>
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
                        <h2>X<sub>0</sub></h2><Input size="large" name="x0" style={InputStyle}></Input>
                        <h2>X<sub>1</sub></h2><Input size="large" name="x1" style={InputStyle}></Input><br/><br/>
                        <Button id="submit_button" onClick= {
                                ()=>this.secant(parseFloat(this.state.x0), parseFloat(this.state.x1))
                            }  
                        style={{background: "#4caf50", color: "white", fontSize: "20px"}}>Submit</Button>
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
export default Secant;