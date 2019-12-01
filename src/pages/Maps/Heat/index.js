import React, { PureComponent, Fragment } from 'react';
import  { View} from 'react-native';

import { Heatmap } from 'react-native-maps';
import { connect } from 'react-redux'
import { getReports } from '../../../store/ducks/reports';




class HeatMap extends PureComponent {
  intervalID = 0;
  
  componentDidMount = async () => {
    await this.props.getReports();

    this.intervalID = await setInterval(async () => {
        await this.props.getReports();
    }, 5000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  /*  state = {
        tracksViewChanges: true
    }
    getSnapshotBeforeUpdate(nextProps) {
        const { postsPointsData } = this.props;

        if (postsPointsData.length > 0 && this.props != nextProps) {
            this.setState({
                tracksViewChanges: true,
            })
        }
    }
    componentDidUpdate() {
        const { postsPointsData } = this.props;

        if (postsPointsData.length > 0 && this.state.tracksViewChanges) {
            this.setState({
                tracksViewChanges: false,
            })
        }
    }*/

    render() {
        const { reports } = this.props;
        const points = reports && reports.length > 0 && reports.map(item =>  {
            const cood = { latitude: parseFloat(item.lat), longitude: parseFloat(item.lng) };
            return cood;
        })

        return points && points.length > 0 ? <Heatmap points={points} /> : <View/>
        
    }
}



const mapStateToProps = state => ({
    reports: state.reports.data
});

export default connect(mapStateToProps, {getReports})(HeatMap);