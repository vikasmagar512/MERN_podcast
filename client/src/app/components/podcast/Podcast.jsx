import React, { Component } from 'react';
import * as actions from '../../actions/users';
import { connect } from 'react-redux';
export class ReusableImageLayout extends React.Component {
  render() {
    return (<div className="col-12 centerStyle" style={{ 'position': 'relative' }}>
                    <div className="row upload-btn-wrapper">
                        <img id="image" src="../../../../static/images/exp.png" className="uploadImage" />
                        {this.props.children}
                    </div>
                </div>)
  }
}

export class ImportFromFileBodyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.fileReader = null
  }

  handleFileChosen(file) {
    debugger
    this.fileReader = new FileReader();
    let k = this.props
    this.fileReader.onloadend = function (r) {
      const content = r.target.result;
      console.log(content);
      debugger
      k.callbackFn(content);
    };
    this.fileReader.readAsText(file);
  }
  /* render() {
    return (<div className="col-12" style={{ 'position': 'relative' }}>
          <div className="row upload-btn-wrapper">
              <img id="image" src="../../../../static/images/exp.png" className="uploadImage" />
              <input type="file"
                id="file"
                className="input-file"
                     // accept=".txt"
                onChange={e => this.handleFileChosen(e.target.files[0])}
              />
          </div>
      </div>)
  }*/
  render() {
    return (<ReusableImageLayout>
          <input type="file"
            id="file"
            className="input-file"
              // accept=".txt"
            onChange={e => this.handleFileChosen(e.target.files[0])}
          />
      </ReusableImageLayout>)
  }
}
class Podcast extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ready: false,
      content: '',
      step: 1,
      speakerChosen: 1,
      speakers: [
          { id: 1, name: 'John (US English)' },
          { id: 2, name: 'Kenny (UK English)' },
      ],
    }
    this.readText = this.readText.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentWillMount() {
    this.props.fetchUsers();
    this.user = JSON.parse(localStorage.getItem('user'));
  }
  readText(t) {
    this.setState({
      ready: true,
      content: t,
    })
  }
  changeNextState() {
    if (this.state.step === 3 && this.state.content !== '') {
      this.props.convertT2S(this.state.content)
    }
    this.setState({ step: this.state.step + 1 })
  }
  renderUsers() {
    const users = this.props.users || [];

    return users.map((user, i) => {
      return <li key={i}>{user.firstname}</li>
    })
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }


  render() {
    let self = this
    return (
      <div className="row content podcast">
          <div className="col-12">
              <div className="row enclosure">
                  {this.state.step === 1
                      ?
                        <ImportFromFileBodyComponent callbackFn={this.readText} />
                      :
                          this.state.step === 2
                              ?
                              <div className="col-6 editable"
                                ref={(e) => { this.userInput = e; }}
                                contentEditable
                                dangerouslySetInnerHTML={{ __html: this.state.content }}
                                onBlur={() => {
                                  this.setState({ content: this.userInput.textContent })
                                }}
                              />
                              :
                              this.state.step === 3
                                  ?
                                  (<div>
                                      <ReusableImageLayout>
                                        <span style={{ display: 'block' }}>LOADED</span>
                                      </ReusableImageLayout>
                                      <div className="form-group">
                                          <label htmlFor="exampleFormControlSelect1">Now choose your speaker</label>
                                          <select className="form-control" value={this.state.speakerChosen} onChange={this.handleChange}>
                                              {this.state.speakers.map((opt, i) => <option key={i} value={opt.id} >{opt.name}</option>)}
                                          </select>
                                      </div>
                                  </div>)
                                  :
                                  <div className="col-12 centerStyle" style={{ 'position': 'relative' }}>
                                      <h4>On Air</h4>
                                      <p>We are currently producing your podcast.<br /> Just a minute</p>
                                      <div className="row">
                                        <img id="image" src="../../../../static/images/waiting_podcast.png" className="uploadImage" />
                                      </div>
                                  </div>
                  }
              </div>
              {this.state.step < 4
              ?
              (<div className="row actions align-items-center" >
                  <div className="col-12 centerDiv">
                      <div className="col-4 centerDiv">
                          {this.state.step > 1 ? <div className="col-6" >
                                      <button type="button" className="btn btn-primary btn-md btnPink">Abort</button>
                                  </div>
                              :
                                  null
                          }
                          <div className="col-6">
                            <button type="button" className="btn btn-primary btn-md btnPink" disabled={!this.state.step > 1} onClick={() => this.changeNextState()}>next</button>
                          </div>
                      </div>
                  </div>
              </div>)
                  : null
              }

          </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { users: state.user.list };
}

export default connect(mapStateToProps, actions)(Podcast);
