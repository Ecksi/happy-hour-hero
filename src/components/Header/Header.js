import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.css';
import SearchBar from '../SearchBar/SearchBar';

class Header extends Component {
  constructor (props) {
    super(props);

    this.state = {
      dropdownSelected: false
    }
    
  }

  handleSubmit = () => {
    this.setState({
      dropdownSelected: true
    });
  }

  render() {
    const { address } = this.props.location;

    return (
      <header>
        <section className="headerContainer">
          <i className="fas fa-bars"></i>
          <div className="headerLocation">
            <p>{ address }</p>
            <i className="fas fa-caret-down" onClick={ this.handleSubmit }></i>
            { this.state.dropdownSelected ? <SearchBar /> : null }
          </div>
        </section>
      </header>
    );
  }
}

export const mapStateToProps = (state) => ({
  location: state.location
});

export default connect(mapStateToProps)(Header);
