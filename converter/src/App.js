import React, { Component } from 'react';
import { mmToMetric, mmToImperial, metricToMm, imperialToMm, } from './converter';
import Header from './Header';

class App extends Component {
    state = { peittha: 1, kg: 1.63, lb: 3.6 };

    handleChange = (e) => {
        var value = e.target.value;
        var input = e.target.name;

        if(input === "peittha") {
            this.setState({ peittha: value, kg: mmToMetric(value), lb: mmToImperial(value) });
        }

        if(input === "kg") {
            let peittha = metricToMm(value);
            this.setState({ peittha, kg: value, lb: mmToImperial(peittha) });
        }

        if(input === "lb") {
            let peittha = imperialToMm(value);
            this.setState({ peittha, kg: mmToMetric(peittha), lb: value });
        }
    }

    render() {
        return (
            <div>
                <Header />
                <input type="text"
                    value={this.state.peittha}
                    name="peittha"
                    onChange={this.handleChange} /> ပိဿာ <br />

                <input type="text"
                    value={this.state.kg}
                    name="kg"
                    onChange={this.handleChange}  /> ကီလို <br />

                <input type="text"
                    value={this.state.lb}
                    name="lb"
                    onChange={this.handleChange}  /> ပေါင် <br />
            </div>
        )
    }
}

export default App;
