import React, {useCallback} from 'react';
import {View, StyleSheet} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import {Appbar, Paragraph} from 'react-native-paper';

import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import FormCreateOccurrence from './form';
import {ScrollView} from 'react-native-gesture-handler';

const CreateReport = ({navigation}) => {
  const closeModal = useCallback(() => navigation.goBack());

  const coordinate = navigation.getParam('coordinate');

  return (
    <View style={styles.root}>
      <Appbar.Header dark={true}>
        <Appbar.BackAction onPress={closeModal} />
        <Appbar.Content title="Nova Denuncia" />
      </Appbar.Header>

      <ScrollView>
        <FormCreateOccurrence coordinate={coordinate} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {height: 100, width: '100%'},
  locationSelected: {
    backgroundColor: '#666',
    color: '#FFF',
    textAlign: 'center',
    padding: 6,
  },
});

export default CreateReport;
