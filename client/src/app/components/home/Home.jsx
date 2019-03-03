import React, { Component } from 'react';
export default class Home extends Component {

  render() {
      return (
          <div>
            {this.props.children}
          </div>
      )
  }
    /*render() {
      /!*return (
          <Route path="/" component={MenuList}>
            <IndexRoute component={requireNotAuth(MenuList)} />
            <Route path="profile" component={requireNotAuth(Profile)} />
          </Route>
      )*!/
  }*/
}
