import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

import UserInfoBox from './components/UserInfoBox'
import ExpenseDistrPiechart from './components/ExpenseDistrPiechart'
import TransactionTable from './components/TransactionTable'
import NavBar from './components/NavBar'


class App extends Component {
  constructor() {
    super()

    this.state = {
      transactionTableRowsList: [],
      user: {},
      ioBoundObjArr: [],
    }
  }


  componentDidMount() {

    //transactionTableRowsList
    fetch("https://skm-starlingbot.herokuapp.com/dashboard?action=getAllTransactions")
      .then(res => res.json())
      .then((data) => {
        console.log("fetched", data);

        this.setState({
          transactionTableRowsList: data,
        })

        let sumOutBounds = 0;
        let sumInBounds = 0;

        if (data) {
          data.forEach(datum => {
            if (datum.direction === "INBOUND") {
              sumOutBounds += datum.amount
            } else {
              sumInBounds += datum.amount
            }
          })

          let ioBoundObjArr = [
            { name: "INBOUND", value: Math.round(sumInBounds) },
            { name: "OUTBOUND", value: Math.round(sumOutBounds) },
          ]

          this.setState({
            ioBoundObjArr,
          })
        }
      })


    fetch("https://skm-starlingbot.herokuapp.com/dashboard?action=getUserInfo")
      .then(res => res.json())
      .then((data) => {
        console.log("fetched USER", data);

        this.setState({
          user: data,
        })
      })

      this.interval=this.setInterval(()=>{
        fetch("https://skm-starlingbot.herokuapp.com/dashboard?action=getAllTransactions")
      .then(res => res.json())
      .then((data) => {
        console.log("fetched", data);

        this.setState({
          transactionTableRowsList: data,
        })

        let sumOutBounds = 0;
        let sumInBounds = 0;

        if (data) {
          data.forEach(datum => {
            if (datum.direction === "INBOUND") {
              sumOutBounds += datum.amount
            } else {
              sumInBounds += datum.amount
            }
          })

          let ioBoundObjArr = [
            { name: "INBOUND", value: Math.round(sumInBounds) },
            { name: "OUTBOUND", value: Math.round(sumOutBounds) },
          ]

          this.setState({
            ioBoundObjArr,
          })
        }
      })


    fetch("https://skm-starlingbot.herokuapp.com/dashboard?action=getUserInfo")
      .then(res => res.json())
      .then((data) => {
        console.log("fetched USER", data);

        this.setState({
          user: data,
        })
      })
      }, 1000);
  }

  componentWillUnmount(){
    clearInterval(this.interval)
  }

  render() {
    const { transactionTableRowsList } = this.state
    const { user } = this.state
    const { ioBoundObjArr } = this.state

    return (
      <div className="hide-overflow">
        <NavBar />
        <div className="container">
          <div className="row" style={{ marginBottom: "30px" }}>
            <div className="col-md-6">
              <UserInfoBox user={user} />
            </div>
            <div className="col-md-6">
              <ExpenseDistrPiechart ioBoundObjArr={ioBoundObjArr} />
            </div>
          </div>
          <div className="row">
            <TransactionTable transactionTableRowsList={transactionTableRowsList} />
          </div>
        </div>
        <div className="footer text-center "><h1>created with &#9829; and Time Limit in mind   ¯\_(ツ)_/¯</h1></div>
      </div>
    );
  }
}

export default App;
