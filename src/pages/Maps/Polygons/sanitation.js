import React, { Component, Fragment } from 'react';
import { Polyline } from 'react-native-maps';
import { connect } from 'react-redux'


class PolygonSanitation extends Component {


    render() {
        const { sanitationData } = this.props;
        const PolygonsRender = sanitationData.map(item => {
            if (item["Concluido"]) {
                const cood = item["Concluido"].map(latLong => { return { latitude: parseFloat(latLong.split(",")[1]), longitude: parseFloat(latLong.split(",")[0]) } })
                return <Polyline coordinates={cood} strokeWidth={1.5} strokeColor={"blue"} />
            }

            else if (item["Paralisada"]) {
                const cood = item["Paralisada"].map(latLong => { return { latitude: parseFloat(latLong.split(",")[1]), longitude: parseFloat(latLong.split(",")[0]) } })

                return <Polyline coordinates={cood} strokeWidth={1.5} strokeColor={"red"} />

            } else if (item["Licenciamento"]) {
                const cood = item["Licenciamento"].map(latLong => { return { latitude: parseFloat(latLong.split(",")[1]), longitude: parseFloat(latLong.split(",")[0]) } })

                return <Polyline coordinates={cood} strokeWidth={1.5} strokeColor={"purple"} />

            } else if (item["Em Execucao"]) {
                const cood = item["Em Execucao"].map(latLong => { return { latitude: parseFloat(latLong.split(",")[1]), longitude: parseFloat(latLong.split(",")[0]) } })

                return <Polyline coordinates={cood} strokeWidth={1.5} strokeColor={"#D7DF01"} />

            }


        })

        return (
            <Fragment>
                {PolygonsRender}
            </Fragment >
        );
    }
}



const mapStateToProps = state => ({
    sanitationData: state.layers.sanitation
});

export default connect(mapStateToProps, {})(PolygonSanitation);