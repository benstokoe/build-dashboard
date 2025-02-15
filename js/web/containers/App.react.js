import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getProjects } from '../../actions/circleActions';
import { toggleSettings, updateSettings } from '../../actions/settingsActions';

import Spinner from '../components/Spinner.react';
import Setup from '../components/Setup.react';
import ProjectList from '../components/ProjectList.react';
import SettingsPod from '../components/SettingsPod.react';
import Header from '../components/Header.react';

export class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    projects: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.getProjects();

    this.getProjects = this.getProjects.bind(this);
    this.handleUpdateSettings = this.handleUpdateSettings.bind(this);
    this.handleVisibilityClick = this.handleVisibilityClick.bind(this);
    this.handleTokenEnter = this.handleTokenEnter.bind(this);
  }

  handleUpdateSettings(setting, value) {
    const { dispatch } = this.props;
    dispatch(updateSettings(setting, value));
  }

  handleVisibilityClick() {
    const { dispatch } = this.props;
    dispatch(toggleSettings());
  }

  handleTokenEnter(value) {
    const { dispatch } = this.props;
    dispatch(updateSettings('UPDATE_CIRCLE_TOKEN', value));
  }

  getProjects() {
    const { settings, dispatch } = this.props;
    dispatch(getProjects(settings.circleToken));

    setInterval(() => {
      dispatch(getProjects(settings.circleToken));
    }, 10000);
  }

  getDashboard() {
    const { settings } = this.props;

    if (settings.circleToken === '') {
      return <Setup onTokenEnter={ this.handleTokenEnter } />;
    }

    const { projects } = this.props;

    if (Object.keys(projects).length > 0) {
      return (
        <div>
          <ProjectList projects={ projects.items } settings={ settings } />
          <SettingsPod
            projects={ projects.items }
            settings={ settings }
            onSettingsClick={ this.handleUpdateSettings }
            onVisibilityClick={ this.handleVisibilityClick }
          />
        </div>
      );
    }

    return <Spinner />;
  }

  render() {
    const { settings } = this.props;

    return (
      <div className="container-fluid">
        <Header title={ settings.dashboardName } />

        <div className="build-dashboard">
          { this.getDashboard() }
        </div>
      </div>
    );
  }
}

export default connect(state => {
  return {
    projects: state.projects,
    settings: state.settings
  };
})(App);
