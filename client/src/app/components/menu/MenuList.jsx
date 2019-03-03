import React, { Component } from 'react';
import * as actions from '../../actions/users';
import { connect } from 'react-redux';
import { Link } from 'react-router';
class Menu extends Component {
  render() {
    return (
      <div className="content">
          <div className="row menu">
              <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 button"><Link to="/Profile">
                      <div className="textDiv"><p>Create Episode</p></div></Link>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 button"><Link to="/Profile">
                      <div className="textDiv"><p>Edit Episode</p></div></Link>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 button"><Link to="/Podcast">
                      <div className="textDiv"><p>Upload Media</p></div></Link>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 button"><Link to="/Profile">
                      <div className="textDiv"><p>Library</p></div></Link>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 button"><Link to="/Profile">
                      <div className="textDiv"><p>Manage Show</p></div></Link>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 button">
                  <Link to="/Profile">
                      <div className="textDiv">
                          <p>
                            Profile
                          </p>
                      </div>
                  </Link>
              </div>
          </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {

  };
}

export default connect(mapStateToProps, actions)(Menu);
