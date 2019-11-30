import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import Card from '../Card';
import { getReports } from '../../../store/ducks/reports';
import { connect } from 'react-redux';

class AllReports extends Component {
  componentDidMount = () => {
    this.props.getReports();
  };

  render() {
    let { reportsData, loaded } = this.props;
    reportsData =
      reportsData && reportsData.length > 0
        ? reportsData.map((item, index) => {
          return { ...item, id: index + 1 };
        })
        : [];
    return (
      <View style={{ flex: 1 }}>
        {loaded && reportsData.length === 0 && (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

            <Text style={{ fontSize: 16, fontWeight: "400", color: "#6E6E6E" }}> Nenhuma denuncia foi encontrada</Text>
          </View>
        )}

        {loaded && reportsData.length > 0 && (

          <FlatList
            data={reportsData}
            renderItem={({ item }) => (
              <View style={{ margin: 20, marginBottom: 0 }}>
                <Card item={item} />
              </View>
            )}
            keyExtractor={item => item.id}
          />)}

      </View>
    );
  }
}

const mapStateToProps = state => ({
  reportsData: state.reports.data,
  loaded: state.reports.loaded,
  //  error: state.profile.error
});

export default connect(
  mapStateToProps,
  { getReports },
)(AllReports);
