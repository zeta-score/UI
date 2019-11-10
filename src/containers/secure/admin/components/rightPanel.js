import React from 'react';
import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import { InteractiveForceGraph, ForceGraph, ForceGraphNode, ForceGraphLink } from 'react-vis-force';
import { ForceGraph3D } from 'react-force-graph';
import ButtonProvider from '../../../../components/common/button'
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';

// import CardAvatar from '../../components/Card/CardAvatar'
import Card from '../../../../components/Card/Card'
// import CardBody from '../../components/Card/CardBody'
import CustomBarChart from '../../../../components/graph/barChart'
import Header from '../../../../components/common/header'
import ImageProvider from '../../../../components/ImageProvider'
import Loader from '../../../../components/common/loader'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// import first from '../../assets/first.jpg';
// import second from '../../assets/second.jpg';
import logo from '../../../../assets/dashboard.svg';
const colors = ["#040a55", "#1e2bd7", "#2876d7", "#55b8f3", "#80ecf7"]
import './rightPanel.css';

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitle: {
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "600",
    fontSize: '20px',
    marginBottom: "3px",
    textDecoration: "none",
    display: 'flex',
  },
  team: {
    display: 'flex',
    alignItems: 'center'
  },
  candidateContainer: {
    display: 'flex',
    padding: '0 20px',
  },
  candidate: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  candidateName: {
    fontSize: '12px',
    fontWeight: '300',
    padding: '5px 0',
  },
  root: {
    width: '900px',
    overflowX: 'auto',
    zIndex: 1,
    textAlign: 'center',
    margin: '15px auto'
  },
  table: {
    width: '100%',
    tableLayout: 'fixed',
  },
  tooltip: {
    backgroundColor: '#1b2e43',
    color: '#fff',
    padding: '16px',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.23)',
    fontSize: '14px',
    textAlign: "center",

  },
  label: {
    color: "#779fcb",
    fontSize: "12px",
    textAlign: "center",
    paddingTop: "2px",

  },
  zeta: {
    fontWeight: 600,
  },
  button: {
    textAlign: 'center'
  },
  graph2: {
    display: 'flex',
    justifyContent: 'center'
  }

};

// TODO: Implement select design
class RightPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      result: {
        nodes: [],
        links: [],
      },
      resultToDisplay: {
        nodes: [],
        links: [],
      },
      fullNodeList: [],
      nodesToDisplay: [],
      linkWidths: [0.5, 1, 2],
    }
  }

  _handleClick = node => {
    // Aim at node from outside it
    const distance = 40;
    const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
    this.fg.cameraPosition(
      { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
      node, // lookAt ({ x, y, z })
      3000  // ms transition duration
    );
  }

  changeNodesChange = val => {
    // console.log(val);
    let temp = [];
    for (let i = 0; i < val.length; i++) {
      temp.push({
        id: val[i].label,
      });
    }
    this.setState({nodesToDisplay: temp}, () => {
      this.changeResultToDisplay();
    });
  }

  changeResultToDisplay = () => {
    let resultToDisplay = {};
    resultToDisplay.nodes = [];
    for (let i = 0; i < 20 && i < this.state.nodesToDisplay.length; i++) {
      resultToDisplay.nodes.push(this.state.nodesToDisplay[i]);
    }

    resultToDisplay.links = [];
    for (let i = 0; i < this.state.result.links.length; i++) {

      let foundS = false, foundT = false;

      for (let j = 0; j < resultToDisplay.nodes.length; j++) {
        if (resultToDisplay.nodes[j].id == this.state.result.links[i].source || (this.state.result.links[i].source.id && resultToDisplay.nodes[j].id == this.state.result.links[i].source.id)) {
          foundS = true;
        } else if (resultToDisplay.nodes[j].id == this.state.result.links[i].target || (this.state.result.links[i].target.id && resultToDisplay.nodes[j].id == this.state.result.links[i].target.id)) {
          foundT = true;
        }
      }

      if (foundS && foundT) {
        resultToDisplay.links.push({
          source: this.state.result.links[i].source.id ? this.state.result.links[i].source.id : this.state.result.links[i].source,
          target: this.state.result.links[i].target.id ? this.state.result.links[i].target.id : this.state.result.links[i].target,
          weight: this.state.result.links[i].weight,
        });
        //  change weight according to the input weight
      }
    }

    this.setState({ resultToDisplay: resultToDisplay });
  }

  componentDidMount() {
    const { classes, scores, result, maliciousData, lastUpdated, flow } = this.props;
    this.setState({result: result}, ()=> {
      console.log('xxxxxxxxxxx', this.state.result);
      this.changeResultToDisplay();
    });
  }



  render() {
    const { classes, scores, result, maliciousData, lastUpdated, flow } = this.props;
    // console.log(result, maliciousData, scores, flow);
    const GROUPS = 12;
    let data = {}
    let newData = []
    if (flow && scores) {
      // console.log("her", data)

      Object.keys(flow).map((key, i) => {
        if (data[scores[key.toLowerCase()]] == undefined) {
          data[scores[key.toLowerCase()]] = [flow[key].fromCount - flow[key].toCount];
        } else {
          data[scores[key.toLowerCase()]].push(flow[key].fromCount - flow[key].toCount);
        }
      });

      Object.keys(data).map((key, i) => {
        var numbers = data[key] // sums to 100
        var sum = 0;
        for (var i = 0; i < numbers.length; i++) {
          sum += numbers[i]
        }
        newData.push({ value: key, withheld: sum })
      });
      // console.log("her", data, newData)

    }

    const options = [
      // { label: 'Thing 1', value: 1 },
      // { label: 'Thing 2', value: 2 },
    ];

    for (let i = 0; i < this.state.result.nodes.length; i++) {
      options.push({
        'label': this.state.result.nodes[i].id,
        'value': i,
      });
    }
    




    return (
      <div className="right-panel">
        <Header label="Dashboard" logo={logo} />
        <Card>
          <div className="vote-header">
            <div>ZETA Graph</div>
            <div class="node-selector">
              <ReactMultiSelectCheckboxes 
                options={options}
                placeholderButtonLabel={'Select nodes to display'}
                onChange={this.changeNodesChange}
              />
            </div>
          </div>
          <div className={classes.graph2}>
            <ForceGraph3D
              ref={el => { this.fg = el; }}
              width={1000}
              height={400}
              nodeColor={d => colors[scores[d.id]]}
              nodeOpacity={1}
              enableNodeDrag={false}
              graphData={this.state.resultToDisplay}
              linkDirectionalArrowLength={10}
              linkCurvature={0.25}
              backgroundColor={"#fff"}
              linkDirectionalArrowColor={"#1b2e43"}
              linkColor={"#1b2e43"}
              linkOpacity={"1"}
              linkWidth={d => this.state.linkWidths[Math.floor(Math.random() * 3)]}
              linkDirectionalArrowResolution={50}
              onNodeClick={this._handleClick}
              nodeLabel={d => {
                return `<div class=${classes.tooltip}>Address : ${d.id}<br/>
          <div class=${classes.zeta}>Zeta score : ${scores[d.id]}</div>
          </div>`
              }}
            />

          </div>
          <div className="filter">
            <div className="filter-options">
              <div className="filter-label-2" />
              <div className="filter-name">
                Most malicious Node
              </div>
            </div>
            <div className="filter-options">
              <div className="filter-label-1" />
              <div className="filter-name">
                Least malicious Node
              </div>
            </div>
          </div>

        </Card>
        
      </div>
    )

  }
}

export default (withStyles(styles)(RightPanel));
