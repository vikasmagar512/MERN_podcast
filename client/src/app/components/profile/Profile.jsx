import React, { Component } from 'react';
import * as actions from '../../actions/users';

import { connect } from 'react-redux';
import { Link } from 'react-router';

class Profile extends Component {

  componentWillMount() {
    this.props.loadProfileData()
  }

  render() {
      let user= this.props.user
      return user
          ?
          (<div className="content">
              <div className="row profile">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 "><div className="textDiv"><p>{this.props.user.firstname}</p></div></div>
              </div>
          </div>)
          : null
    }
}

function mapStateToProps(state) {
    debugger
  return {user: state.user.profile }
}

export default connect(mapStateToProps, actions)(Profile);
