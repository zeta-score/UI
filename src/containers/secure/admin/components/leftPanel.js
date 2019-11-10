import React from 'react';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";

import Card from '../../../../components/Card/Card'
import ImageProvider from '../../../../components/ImageProvider'
import Loader from '../../../../components/common/loader'
import logo from '../../../../assets/logo-white.png';
import dashboard from '../../../../assets/dashboard.svg';
import tree from '../../../../assets/tree.svg';
import search from '../../../../assets/search.svg';

import './leftPanel.css';

class LeftPanel extends React.Component {
  state = {
    parties: this.props.parties,
  };
  render() {
    const {classes, parties} = this.props;
    return (
      <div className="left-panel">
        <div>
          <ImageProvider src={logo} className="left-logo"/>
        </div>
        <div>
          <Link to='/'>

          <ImageProvider src={dashboard} className="dashboard-logo background-white" />
      </Link>
        </div>
        <div>
          <Link to='/malicious'>
            <ImageProvider src={search} className="dashboard-logo" />
          </Link>
        </div>
        <div>
          <Link to='/tree'>
          <ImageProvider src={tree} className="dashboard-logo" />
          </Link>
        </div>

      </div>
    )

    }
}

const mapStateToProps = state => {
  return { parties: state.main.parties };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllParties: () => {
      dispatch({ type: 'GET_ALL_PARTIES_INIT' })
    },
    voteForParty:(partyId) => {
      dispatch({ type: 'VOTE_INIT', partyId })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftPanel);
