import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."],
    operators: [
      { name: "equals", symbol: "=" },
      { name: "plus", symbol: "+" },
      { name: "minus", symbol: "-" },
      { name: "times", symbol: "x" },
      { name: "divide", symbol: "÷" },
      { name: "percentage", symbol: "%" }
    ],
    total: 0,
    temp: "0",
    prevOperator: "",
    result: true,
    clear: "AC"
  };

  clear = () => {
    if (this.state.clear === "clear") {
      this.setState({
        temp: (this.state.temp = "0"),
        clear: (this.state.clear = "AC")
      });
    } else if (this.state.clear === "AC") {
      this.setState({
        temp: (this.state.temp = "0"),
        total: (this.state.total = 0),
        prevOperator: (this.state.prevOperator = "")
      });
    }
  };

  addNumber = num => {
    if (this.state.clear === "AC") {
      this.setState({ clear: (this.state.clear = "clear") });
    }
    if (this.state.result === false) {
      this.setState({ result: (this.state.result = true) });
    }
    if (this.state.prevOperator === "equals") {
      this.setState({
        total: (this.state.total = 0),
        temp: (this.state.temp = "0"),
        prevOperator: (this.state.prevOperator = "")
      });
    }
    if (this.state.temp === "0") {
      this.state.temp = "";
      this.setState({ temp: this.state.temp + num });
    } else {
      this.setState({ temp: this.state.temp + num });
    }
    console.log(this.state.temp);
  };

  calculate = operator => {
    if (this.state.prevOperator === "plus") {
      this.setState({ total: (this.state.total += Number(this.state.temp)) });
    } else if (this.state.prevOperator === "minus") {
      this.setState({ total: (this.state.total -= Number(this.state.temp)) });
    } else if (this.state.prevOperator === "times") {
      this.setState({ total: (this.state.total *= Number(this.state.temp)) });
    } else if (this.state.prevOperator === "divide") {
      this.setState({ total: (this.state.total /= Number(this.state.temp)) });
    } else if (this.state.prevOperator === "") {
      this.setState({ total: (this.state.total += Number(this.state.temp)) });
    }

    if (operator === "percentage") {
      this.setState({ total: this.state.total / 100 });
    }

    this.state.prevOperator = operator;
    this.state.result = false;
    this.state.temp = "";
    console.log(this.state.total);
  };

  render() {
    return (
      <div>
        <h1>Calculator</h1>
        <div className="grid">
          <h1 className="result">
            {this.state.result ? this.state.temp : this.state.total}
          </h1>
          {this.state.numbers.map(num => {
            return (
              <button
                key={num}
                className={`number${num}`}
                onClick={() => this.addNumber(num)}
              >
                {num}
              </button>
            );
          })}
          {this.state.operators.map(op => {
            return (
              <button
                key={op.name}
                className={op.name}
                onClick={() => {
                  this.calculate(op.name);
                }}
              >
                {op.symbol}
              </button>
            );
          })}
          <button className="clear" onClick={this.clear}>
            {this.state.clear}
          </button>
        </div>
      </div>
    );
  }
}

export default App;
