import React, { Component } from "react";
import Chart from "react-apexcharts";
import Axios from "axios";
import { useHistory } from "react-router-dom";

class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: []
        }
      },
      series: [
        {
          name: "series-1",
          data: []
        }
      ],

    };
  }


  componentDidMount() {

    try {
      setInterval(() => {
      var data={
        code:localStorage.getItem("code"),
      }
      const copy= JSON.parse(JSON.stringify(this.state.options))
      const copy2= JSON.parse(JSON.stringify(this.state.series))
      var r1= [];
      var r2=[];
      
        Axios.post("http://localhost:4200/allusers",data).then(response => {
          var x=response.data
         
          for (var i = 0; i < x.length; i++) {
            var myArray = [];
            for (var key in x) {
              
                 myArray.push(x[key].name)
            }
        }


          r1=myArray;
          copy.xaxis.categories=r1;
          Axios.post("http://localhost:4200/allvotes",data).then(response2 => {

            var y=response2.data
            for (var i = 0; i < y.length; i++) {
              var myArray2 = [];
              for (var key in y) {
                   myArray2.push(y[key].votes)
              }
          }
          
            r2=myArray2
            copy2[0].data=r2;
            if(r1==undefined || r2==undefined){
              alert("Choose voting code first");
              window.location.href = "./f";
            }
            else{
            this.setState(
              {
                options:copy,
                series:copy2
              }
            )
            }
          })
        }).catch();
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  
  }


  render() {
    return (
      <div>
        {this.state.var}
        <div className="app">
          <div className="row">

            <div className="mixed-chart">
              <Chart
                options={this.state.options}
                series={this.state.series}
                type="bar"
                width="1000"
              />

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;