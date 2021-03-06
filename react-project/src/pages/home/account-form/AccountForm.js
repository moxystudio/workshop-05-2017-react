import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Picker from 'react-emojipicker'
import classnames from 'classnames';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import './AccountForm.css';

class AccountForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: undefined,
      emoji: undefined,
      selectEmoji: false,
    };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleUsernameChange = this._handleUsernameChange.bind(this);
    this._handleEmojiChoose = this._handleEmojiChoose.bind(this);
    this._handleEmojiChange = this._handleEmojiChange.bind(this);
  }

  render() {
    const { name, emoji, selectEmoji } = this.state;
    const { authenticated } = this.props;

    if (authenticated) {
      return (
        <div className="home-register">
          <MuiThemeProvider>
            <Card>
              <CardHeader title="Ready to Go"/>
              <CardText>
                Welcome { name } { emoji.unicode }
              </CardText>
            </Card>
          </MuiThemeProvider>
        </div>
      )
    }

    return (
      <form className="home-register"
        onSubmit={ this._handleSubmit }>

        <MuiThemeProvider>
          <Card>
            <CardHeader title="Create account"/>
            <CardText>
              <div className="home-register-input">
                <div className="home-register-input-cel">
                  <div className="home-register-input-label">name: </div>
                  <input type="text" className="home-register-input-value"
                    value={ name } onChange={ this._handleUsernameChange } />
                </div>
                <div className="home-register-input-cel">
                  <div className="home-register-input-emoji-label">emoji: </div>
                  <div className="home-register-input-emoji-choose">
                    <button className="home-register-input-emoji-choose-cta"
                      onClick={ this._handleEmojiChoose }>
                      pick
                    </button>
                    <div className={ classnames({ "home-register-input-emoji-choose-set": !selectEmoji }) }>
                        <Picker modal visible={ selectEmoji }
                          onEmojiSelected={ this._handleEmojiChange } />
                    </div>
                  </div>
                  <div className="home-register-input-emoji-value">
                    { emoji ? emoji.unicode : null }
                  </div>
                </div>
              </div>
            </CardText>
            <CardActions>
              <FlatButton type="submit" value="Submit">
                Get In
              </FlatButton>
            </CardActions>
          </Card>
        </MuiThemeProvider>

      </form>
    );
  }

  _handleSubmit(event) {
    const { name, emoji } = this.state;

    if (name && emoji) {
      this.props.authTry(name, emoji);
    }
    event.preventDefault();
  }

  _handleEmojiChoose(e) {
    this.setState({ selectEmoji: true });
    e.preventDefault();
  }

  _handleEmojiChange(data) {
    this.setState({ selectEmoji: false, emoji: data });
  }

  _handleUsernameChange(event) {
    this.setState({ name: event.target.value });
  }
}

AccountForm.propTypes = {
    authTry: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,
};

export default AccountForm;
