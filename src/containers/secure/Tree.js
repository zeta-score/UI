import React from 'react';
import { connect } from 'react-redux';

import withStyles from "@material-ui/core/styles/withStyles";

import LightTheme from '../../components/background/light'
import Card from '../../components/Card/Card'
import LeftPanel from './admin/components/leftPanel'
import Header from '../../components/common/header'
import logo from '../../assets/dashboard.svg';
import { ForceGraph3D } from 'react-force-graph';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = {
  tooltip:{
    backgroundColor: '#1b2e43',
    color: '#fff',
    padding: '16px',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.23)',
    fontSize: '14px',
    textAlign: "center",
  }
};

const useStyles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
};

class Tree extends React.Component {
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
  }
  createData = (name, calories, fat, carbs, protein) => {
    return { name, calories, fat, carbs, protein };
  }
  componentDidMount(){
    this.props.getZetaData();
  }

  
  render() {
    // const classes = useStyles;
    const { classes,zetaData } = this.props;
    const colors = ["#040a55", "#1e2bd7", "#2876d7", "#55b8f3", "#80ecf7"]
    const nodeColor = []
    if(zetaData) {
      zetaData.links.map((link) => {
        nodeColor[link.target] = link.weight
      })
      nodeColor['0x821aEa9a577a9b44299B9c15c88cf3087F3b5544'.toLowerCase()] = 0
    }
    const rows = [
      this.createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
      this.createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
      this.createData('Eclair', 262, 16.0, 24, 6.0),
      this.createData('Cupcake', 305, 3.7, 67, 4.3),
      this.createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];
    const transactions = [
      {
        "source": "0x0d1d4e623d10f9fba5db95830f7d3839406c6af2",
        "target": "0x6330a553fc93768f612722bb8c2ec78ac90b3bbc",
        "value": "1212",
        "time": "12312423412"
      },
      {
        "source": "0x0d1d4e623d10f9fba5db95830f7d3839406c6af2",
        "target": "0x6330a553fc93768f612722bb8c2ec78ac90b3bbc",
        "value": "1212",
        "time": "12312423412"
      },
      {
        "source": "0x0d1d4e623d10f9fba5db95830f7d3839406c6af2",
        "target": "0x6330a553fc93768f612722bb8c2ec78ac90b3bbc",
        "value": "1212",
        "time": "12312423412"
      },
      {
        "source": "0x0d1d4e623d10f9fba5db95830f7d3839406c6af2",
        "target": "0x6330a553fc93768f612722bb8c2ec78ac90b3bbc",
        "value": "1212",
        "time": "12312423412"
      },
      {
        "source": "0x0d1d4e623d10f9fba5db95830f7d3839406c6af2",
        "target": "0x6330a553fc93768f612722bb8c2ec78ac90b3bbc",
        "value": "1212",
        "time": "12312423412"
      },
      {
        "source": "0x0d1d4e623d10f9fba5db95830f7d3839406c6af2",
        "target": "0x6330a553fc93768f612722bb8c2ec78ac90b3bbc",
        "value": "1212",
        "time": "12312423412"
      },
      {
        "source": "0x0d1d4e623d10f9fba5db95830f7d3839406c6af2",
        "target": "0x6330a553fc93768f612722bb8c2ec78ac90b3bbc",
        "value": "1212",
        "time": "12312423412"
      },
      {
        "source": "0x0d1d4e623d10f9fba5db95830f7d3839406c6af2",
        "target": "0x6330a553fc93768f612722bb8c2ec78ac90b3bbc",
        "value": "1212",
        "time": "12312423412"
      }, {
        "source": "0x0d1d4e623d10f9fba5db95830f7d3839406c6af2",
        "target": "0x6330a553fc93768f612722bb8c2ec78ac90b3bbc",
        "value": "1212",
        "time": "12312423412"
      },
      {
        "source": "0x0d1d4e623d10f9fba5db95830f7d3839406c6af2",
        "target": "0x6330a553fc93768f612722bb8c2ec78ac90b3bbc",
        "value": "1212",
        "time": "12312423412"
      },
      {
        "source": "0x0d1d4e623d10f9fba5db95830f7d3839406c6af2",
        "target": "0x6330a553fc93768f612722bb8c2ec78ac90b3bbc",
        "value": "1212",
        "time": "12312423412"
      },
      {
        "source": "0x0d1d4e623d10f9fba5db95830f7d3839406c6af2",
        "target": "0x6330a553fc93768f612722bb8c2ec78ac90b3bbc",
        "value": "1212",
        "time": "12312423412"
      },

      {
        "source": "0x6330a553fc93768f612722bb8c2ec78ac90b3bbc",
        "target": "0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e",
        "value": "1212",
        "time": "12312423412"
      },
      {
        "source": "0x6330a553fc93768f612722bb8c2ec78ac90b3bbc",
        "target": "0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e",
        "value": "1212",
        "time": "12312423412"
      },
      {
        "source": "0x6330a553fc93768f612722bb8c2ec78ac90b3bbc",
        "target": "0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e",
        "value": "1212",
        "time": "12312423412"
      },
      {
        "source": "0x6330a553fc93768f612722bb8c2ec78ac90b3bbc",
        "target": "0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e",
        "value": "1212",
        "time": "12312423412"
      },
      {
        "source": "0x6330a553fc93768f612722bb8c2ec78ac90b3bbc",
        "target": "0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e",
        "value": "1212",
        "time": "12312423412"
      },
      {
        "source": "0x6330a553fc93768f612722bb8c2ec78ac90b3bbc",
        "target": "0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e",
        "value": "1212",
        "time": "12312423412"
      },
      {
        "source": "0x6330a553fc93768f612722bb8c2ec78ac90b3bbc",
        "target": "0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e",
        "value": "1212",
        "time": "12312423412"
      },
      {
        "source": "0x6330a553fc93768f612722bb8c2ec78ac90b3bbc",
        "target": "0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e",
        "value": "1212",
        "time": "12312423412"
      },
      {
        "source": "0x6330a553fc93768f612722bb8c2ec78ac90b3bbc",
        "target": "0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e",
        "value": "1212",
        "time": "12312423412"
      },
      {
        "source": "0x6330a553fc93768f612722bb8c2ec78ac90b3bbc",
        "target": "0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e",
        "value": "1212",
        "time": "12312423412"
      },
      {
        "source": "0x6330a553fc93768f612722bb8c2ec78ac90b3bbc",
        "target": "0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e",
        "value": "1212",
        "time": "12312423412"
      },
      {
        "source": "0x6330a553fc93768f612722bb8c2ec78ac90b3bbc",
        "target": "0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e",
        "value": "1212",
        "time": "12312423412"
      },
      {
        "source": "0x6330a553fc93768f612722bb8c2ec78ac90b3bbc",
        "target": "0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e",
        "value": "1212",
        "time": "12312423412"
      },
      {
        "source": "0x6330a553fc93768f612722bb8c2ec78ac90b3bbc",
        "target": "0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e",
        "value": "1212",
        "time": "12312423412"
      },
      {
        "source": "0x6330a553fc93768f612722bb8c2ec78ac90b3bbc",
        "target": "0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e",
        "value": "1212",
        "time": "12312423412"
      },
      {
        "source": "0x6330a553fc93768f612722bb8c2ec78ac90b3bbc",
        "target": "0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e",
        "value": "1212",
        "time": "12312423412"
      },
      {
        "source": "0x6330a553fc93768f612722bb8c2ec78ac90b3bbc",
        "target": "0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e",
        "value": "1212",
        "time": "12312423412"
      },
      {
        "source": "0x6330a553fc93768f612722bb8c2ec78ac90b3bbc",
        "target": "0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e",
        "value": "1212",
        "time": "12312423412"
      },
      {
        "source": "0x6330a553fc93768f612722bb8c2ec78ac90b3bbc",
        "target": "0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e",
        "value": "1212",
        "time": "12312423412"
      }
    ];
    console.log(nodeColor);
    return (
      <LightTheme>
          <div className="admin-container">
          <LeftPanel/>
          <div  className="right-panel">
          <Header label="Transaction History" logo={logo}/>
          <Card>
            <div className="vote-header">
              <div>Transaction History</div>
            </div>
            <div>
                <Paper style={{
                  width: '100%',
                  overflowX: 'auto',
                }}>
                  <Table style={{ minWidth: 650,}} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Source</TableCell>
                        <TableCell align="right">Target&nbsp;(g)</TableCell>
                        <TableCell align="right">Value&nbsp;(g)</TableCell>
                        <TableCell align="right">Time&nbsp;(g)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {transactions.map(row => (
                        <TableRow key={row.name}>
                          <TableCell>{row.source}</TableCell>
                          <TableCell align="right">{row.target}</TableCell>
                          <TableCell align="right">{(Math.floor(Math.random() * 10000)) / 10000 * (Math.floor(Math.random() * 5) + 1)}</TableCell>
                          <TableCell align="right">{1510000000000 + Math.floor(Math.random() * 1000000000)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
            </div>
          </Card>
        </div>
      </div>

      </LightTheme>)
    }
}

const mapStateToProps = state => {
  return {
     zetaData: state.main.zetaData,
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getZetaData: () => {
      dispatch({ type: 'GET_ZETA_INIT' })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Tree));
