import React, { Component } from 'react'
import { Layout, Menu,Input,Button ,Card,Table } from 'antd';
import 'antd/dist/antd.css';
import {compile,range} from 'mathjs';
var Algebrite = require('algebrite')
const {Content} = Layout;
const InputStyle = {
    background: "white",
    color: "black", 
    fontWeight: "bold", 
    fontSize: "24px"
};
var I, exact, error;
class Composite_Trapzoidal extends Component {
    constructor() {
        super();
        this.state = {
            fx: "",
            a: 0,
            b: 0,
            n: 0,
            showOutputCard: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    composite_trapzoidal(a, b, n) {
        var h = (b-a)/n
        I = ((h / 2) * (this.func(a) + this.func(b) + 2*this.summationFunction(n, h))).toFixed(6)
        exact = (this.exactIntegrate(a, b)).toFixed(6)
        error = (Math.abs((I-exact) / I) * 100).toFixed(6)
        this.setState({
            showOutputCard: true
        })
    }
    exactIntegrate(a, b) {
        var expr = compile(Algebrite.integral(Algebrite.eval(this.state.fx)).toString())
        return expr.eval({x:b}) - expr.eval({x:a})

    }
    summationFunction(n, h) {
        var sum = 0
        var counter = h
        for (var i=1 ; i<n ; i++) {
            sum += this.func(counter)
            counter += h
        }
        return sum
    }
    func(X) {
        var expr = compile(this.state.fx);
        let scope = {x:parseFloat(X)};
        return expr.eval(scope);        
    }
    render() {
        return(
            <div style={{ background: "#FFFF", padding: "30px" }}>
                <h2 style={{color: "black", fontWeight: "bold"}}>Composite Trapezoidal</h2>
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
                        <h2>Lower bound (A)</h2><Input size="large" name="a" style={InputStyle}></Input>
                        <h2>Upper bound (B)</h2><Input size="large" name="b" style={InputStyle}></Input>
                        <h2>N</h2><Input size="large" name="n" style={InputStyle}></Input><br/><br/>
                        <Button id="submit_button" onClick= {
                                ()=>this.composite_trapzoidal(parseInt(this.state.a), parseInt(this.state.b), parseInt(this.state.n))
                            }  
                        style={{background: "#4caf50", color: "white", fontSize: "20px"}}>Submit</Button><br></br>&nbsp; 
                    </Content>

                    {this.state.showOutputCard && 
                        <Card
                        style={{borderRadius:"50px"}}
                        >
                            <p style={{fontSize: "24px", fontWeight: "bold"}}>
                                I = {I}<br/>
                                Integrate = {exact}<br/>
                                Error = {error}%
                            </p>
                        </Card>
                    }<br></br>&nbsp; 
                </Content>
            </div>
        );
    }
}
export default Composite_Trapzoidal