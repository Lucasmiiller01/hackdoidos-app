import React, { PureComponent, Fragment } from 'react';
import { Marker } from 'react-native-maps';
import { connect } from 'react-redux'
import { Image } from "react-native"
import ImageSrc from "../../../shared/imgs/dyellow_diamond.png"



class PostsPoints extends PureComponent {

    state = {
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
    }

    render() {
        const { postsPointsData } = this.props;
        const MarkersRender = postsPointsData.map(item => {
            const cood = { latitude: parseFloat(item.lat), longitude: parseFloat(item.lng) }
            return <Marker coordinate={cood} tracksViewChanges={this.state.tracksViewChanges}
            >
            
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
    postsPointsData: state.main.postsPointsData
});

export default connect(mapStateToProps, {})(PostsPoints);