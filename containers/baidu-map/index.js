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
            mayType: MapTypes.NORMAL,
            zoom: 15,
            center: {
                longitude: 113.981718,
                latitude: 22.542449
            },
            trafficEnabled: false,
            baiduHeatMapEnabled: false,
            markers: [{
                longitude: 113.981718,
                latitude: 22.542449,
                title: "Window of the world"
            },{
                longitude: 113.995516,
                latitude: 22.537642,
                title: ""
            }]
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    trafficEnabled={this.state.trafficEnabled}
                    baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
                    zoom={this.state.zoom}
                    mapType={this.state.mapType}
                    center={this.state.center}
                    marker={this.state.marker}
                    markers={this.state.markers}
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
        height: Dimensions.get('window').height - 24
    }
});