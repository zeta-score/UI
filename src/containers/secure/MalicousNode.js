import React from 'react';
import { connect } from 'react-redux';

import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine,
} from 'recharts';

import LightTheme from '../../components/background/light'
import CardAvatar from '../../components/Card/CardAvatar'
import Card from '../../components/Card/Card'
import CardBody from '../../components/Card/CardBody'
import ImageProvider from '../../components/ImageProvider'
import Input from '../../components/form/input'
import CustomLink from '../../components/navigation/link'
import ButtonProvider from '../../components/common/button'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LeftPanel from './admin/components/leftPanel'
import Header from '../../components/common/header'
import logo from '../../assets/dashboard.svg';
// import CustomBarChart from '../../components/graph/barChart'
import './MalicousNode.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  root: {
    width: '100%',
    overflowX: 'auto',
    zIndex: 1,
  },
  table: {
    minWidth: 700,
  },
  ip: {
    display: "flex",
    alignItems: "baseline",
    padding: "20px"
  }
};

class MalicousNode extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      nodeSelected: "0x0f4f2ac550a1b4e2280d04c21cea7ebd822934b5",
    }
  }
  
  state = {
    address: ""
  }
  onChange = (event) => {
    this.setState({
      address: event.target.value
    })
  }
  onClick = () => {
    const { address } = this.state;
    this.props.getMalicious(address);
  }

  handleChange = (val) => {
    console.log(val.target.value);
    this.setState({nodeSelected: val.target.value});
  }



  render() {
    const { classes, feedbackUrl, malicious } = this.props;
    const scores = [{
      name: 'a',
      value: 1
    },
    {
      name: 'b',
      value: 2
    }]
    const graphData = [
      {
        time: '15515837', zeta: 0.3,
      },
      {
        time: '15552837', zeta: 0.4,
      },
      {
        time: '15612837', zeta: 0.3,
      },
      {
        time: '15552837', zeta: 0.5,
      },
      {
        time: '15572837', zeta: 0.6,
      },
      {
        time: '15582837', zeta: 0.7,
      },
    ];
    const nodeList = [
      "0x0d1d4e623d10f9fba5db95830f7d3839406c6af2",
      "0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e",
      "0x6330a553fc93768f612722bb8c2ec78ac90b3bbc",
      "0x821aea9a577a9b44299b9c15c88cf3087f3b5544",
      "0x2191ef87e392377ec08e7c08eb105ef5448eced5",
      "0x0f4f2ac550a1b4e2280d04c21cea7ebd822934b5",
    ];

    return (
      <LightTheme>
        <div className="admin-container">

          <LeftPanel />
          <div className="right-panel">

            <Header label="Malicious Data" logo={logo} />
            <Card>
              <div className="vote-header">
                <div>Search for history</div>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); this.onClick(e) }}>
                <div className={classes.ip}>
                  <div style = {{width: '50%'}} >
                    <Select
                      value={this.state.nodeSelected}
                      onChange={this.handleChange}
                      style={{width: '100%'}}
                    >
                      {nodeList.map(name => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <ButtonProvider type="submit" label="Get the zeta graph" onClick={this.onClick} />
                  </div>

                </div>

              </form>
              <LineChart width={800} height={300} data={graphData}>
                <XAxis dataKey="time" padding={{ left: 30, right: 30 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="zeta" stroke="#82ca9d" />
              </LineChart>
            </Card>
          </div>
        </div>
      </LightTheme>)
  }
}

const mapStateToProps = state => {
  return {
    malicious: state.main.malicious,
    feedbackMessage: state.main.feedbackMessage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMalicious: (address) => {
      dispatch({ type: 'GET_MALICIOUS_INIT', address })
    },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MalicousNode));
