import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { googleApiKey } from '../../apiCalls/apiKeys/googleApiKey';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class GoogleMap extends Component {
  static defaultProps = {
    center: {
      lat: 39.750801,
      lng: -104.996595
    },
    zoom: 16
  };
 
  render() {
    return (
      <div style={{ height: '400px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: googleApiKey }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={39.750801}
            lng={-104.996595}
            text={'Denver, CO'}
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default GoogleMap;