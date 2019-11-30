import React, { PureComponent, Fragment } from 'react';
import { Marker } from 'react-native-maps';
import { connect } from 'react-redux'
import { Image } from "react-native"
import ImageSrc from "../../../shared/imgs/point_red.png"



class PointReport extends PureComponent {
    state = {
        tracksViewChanges: true
    }
    getSnapshotBeforeUpdate(nextProps) {
        const { reportsData } = this.props;

        if (reportsData.length > 0 && this.props != nextProps) {
            this.setState({
                tracksViewChanges: true,
            })
        }
    }
    componentDidUpdate() {
        const { reportsData } = this.props;

        if (reportsData.length > 0 && this.state.tracksViewChanges) {
            this.setState({
                tracksViewChanges: false,
            })
        }
    }

    render() {
        const { reportsData } = this.props;
        const MarkersRender = reportsData.map(item => {
            const cood = { latitude: parseFloat(item.split(" ")[0]), longitude: parseFloat(item.split(" ")[1]) }
            return <Marker coordinate={cood} tracksViewChanges={this.state.tracksViewChanges}
            >
                <Image
                    source={ImageSrc}
                    style={{ height: 10, width: 10 }}
                />
            </Marker>
        })

        return (
            <Fragment>
                {MarkersRender}
            </Fragment >
        );
    }
}



const mapStateToProps = state => ({
    reportsData: state.layers.reports
});

export default connect(mapStateToProps, {})(PointReport);