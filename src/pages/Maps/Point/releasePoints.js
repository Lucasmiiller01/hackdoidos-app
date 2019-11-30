import React, { PureComponent, Fragment } from 'react';
import { Marker } from 'react-native-maps';
import { connect } from 'react-redux'
import { Image } from "react-native"
import ImageSrc from "../../../shared/imgs/dyellow_diamond.png"



class ReleasePoints extends PureComponent {

    state = {
        tracksViewChanges: true
    }
    getSnapshotBeforeUpdate(nextProps) {
        const { releasePointsData } = this.props;

        if (releasePointsData.length > 0 && this.props != nextProps) {
            this.setState({
                tracksViewChanges: true,
            })
        }
    }
    componentDidUpdate() {
        const { releasePointsData } = this.props;

        if (releasePointsData.length > 0 && this.state.tracksViewChanges) {
            this.setState({
                tracksViewChanges: false,
            })
        }
    }

    render() {
        const { releasePointsData } = this.props;
        const MarkersRender = releasePointsData.map(item => {
            const cood = { latitude: parseFloat(item.split(" ")[1]), longitude: parseFloat(item.split(" ")[0]) }
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
    releasePointsData: state.layers.releasePoints
});

export default connect(mapStateToProps, {})(ReleasePoints);