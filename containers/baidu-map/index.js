/**
 * Created by yoe on 2017/6/20.
 */
import React, {
    Component,
    PropTypes
} from 'react';

import {
    MapView,
    MapTypes,
    Geolocation
} from 'react-native-baidu-map';

import {
    Button,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';

import Dimensions from 'Dimensions';

export default class BaiduMapDemo extends Component {

    constructor() {
        super();

        this.state = {
            mayType: MapTypes.SATELLITE,
            zoom: 15,
            center: {
                longitude: 113.981718,
                latitude: 22.542449
            },
            trafficEnabled: false,
            baiduHeatMapEnabled: false
        };
    }

    componentDidMount() {

    }

    render() {
        const markers = this.props.data.map(data => {
           return {
               longitude: data.long,
               latitude: data.lat,
               title: data.name
           };
        });
        let center = {
            longitude: 113.981718,
            latitude: 22.542449
        };
        if(markers.length > 0) {
            center = markers[0];
        }
        return (
            <View style={styles.container}>
                <MapView
                    trafficEnabled={this.state.trafficEnabled}
                    baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
                    zoom={this.state.zoom}
                    mapType={this.state.mapType}
                    center={center}
                    marker={this.state.marker}
                    markers={markers}
                    style={styles.map}
                    onMarkerClick={(e) => {
                        console.warn(JSON.stringify(e));
                    }}
                    onMapClick={(e) => {
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        height: 40
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 145
    }
});