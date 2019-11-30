import React, { PureComponent, Fragment } from 'react';
import { Marker } from 'react-native-maps';
import { connect } from 'react-redux'
import { Image } from "react-native"
import ImageSrc from "../../../shared/imgs/point_green.png"



class CondosPoints extends PureComponent {

    state = {
        tracksViewChanges: true
    }
    getSnapshotBeforeUpdate(nextProps) {
        const { pointsCondosData } = this.props;

        if (pointsCondosData.length > 0 && this.props != nextProps) {
            this.setState({
                tracksViewChanges: true,
            })
        }
    }

    componentDidUpdate() {
        const { pointsCondosData } = this.props;

        if (pointsCondosData.length > 0 && this.state.tracksViewChanges) {
            this.setState({
                tracksViewChanges: false,
            })
        }
    }
    render() {
        const { pointsCondosData } = this.props;
        const MarkersRender = pointsCondosData.map(item => {
            const cood = { latitude: parseFloat(item.split(" ")[1]), longitude: parseFloat(item.split(" ")[0]) }
            return <Marker coordinate={cood} tracksViewChanges={this.state.tracksViewChanges}
            >
                <Image
                    source={ImageSrc}
                    style={{ height: 5, width: 5 }}
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
    pointsCondosData: state.layers.pointsCondos
});

export default connect(mapStateToProps, {})(CondosPoints);