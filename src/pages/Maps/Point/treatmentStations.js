import React, { PureComponent, Fragment } from 'react';
import { Marker } from 'react-native-maps';
import { Image } from "react-native"

import { connect } from 'react-redux'
import ImageSrc from "../../../shared/imgs/green_triangle.png"
import ImageSrc2 from "../../../shared/imgs/yellow_pentagon.png"
import ImageSrc3 from "../../../shared/imgs/liteblue_square.png"


class TreatmentStations extends PureComponent {
    state = {
        tracksViewChanges: true
    }
    getSnapshotBeforeUpdate(nextProps) {
        const { treatmentStationsData } = this.props;

        if (treatmentStationsData.length > 0 && this.props != nextProps) {
            this.setState({
                tracksViewChanges: true,
            })
        }
    }
    componentDidUpdate() {
        const { treatmentStationsData } = this.props;

        if (treatmentStationsData.length > 0 && this.state.tracksViewChanges) {
            this.setState({
                tracksViewChanges: false,
            })
        }
    }

    render() {
        const { treatmentStationsData } = this.props;
        const MarkersRender = treatmentStationsData.map(item => {
            if (item["Elevatoria"]) {
                const cood = { latitude: parseFloat(item["Elevatoria"].split(" ")[1]), longitude: parseFloat(item["Elevatoria"].split(" ")[0]) }

                return <Marker coordinate={cood} tracksViewChanges={this.state.tracksViewChanges}
                >
                    <Image
                        source={ImageSrc}
                        style={{ height: 10, width: 10 }}
                    />
                </Marker>
            }

            else if (item["Primario"]) {
                const cood = { latitude: parseFloat(item["Primario"].split(" ")[1]), longitude: parseFloat(item["Primario"].split(" ")[0]) }
                return <Marker coordinate={cood} tracksViewChanges={this.state.tracksViewChanges}
                >
                    <Image
                        source={ImageSrc2}
                        style={{ height: 10, width: 10 }}
                    />
                </Marker>

            } else if (item["Lodos Ativados"]) {
                const cood = { latitude: parseFloat(item["Lodos Ativados"].split(" ")[1]), longitude: parseFloat(item["Lodos Ativados"].split(" ")[0]) }

                return <Marker coordinate={cood} tracksViewChanges={this.state.tracksViewChanges}
                >
                    <Image
                        source={ImageSrc3}
                        style={{ height: 10, width: 10 }}
                    />
                </Marker>

            }


        })

        return (
            <Fragment>
                {MarkersRender}
            </Fragment >
        );
    }
}



const mapStateToProps = state => ({
    treatmentStationsData: state.layers.treatmentStations
});

export default connect(mapStateToProps, {})(TreatmentStations);