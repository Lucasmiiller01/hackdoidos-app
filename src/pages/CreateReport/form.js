import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {View, StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native';

import {Button, Text} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SelectDialogRedux from '../../shared/form/selectRedux';

import {reduxForm, Field} from 'redux-form';
import { createReport } from '../../store/ducks/createReports';

const getOptionsSelect = () => {
  return [
    { value: 1, label: 'Pneus'},
    { value: 2, label: 'Caixa D\'água, Cisterna, balde'},
    { value: 3, label: 'Lixo doméstico'},
    { value: 4, label: 'Ferro velho, Terreno Baldio'},
    { value: 5, label: 'Esgoto à céu aberto'},
    { value: 6, label: 'Plantas, Folhas, Troncos'},
    { value: 7, label: 'Outros'},
  ];
}

const FormCreateReport = ({submitting, handleSubmit, coordinate, navigation}) => {

  const image = navigation.getParam('image');

  const dispatch = useDispatch();
  
  const submitCreateReport = useCallback((values) => dispatch(
     createReport({
      ...values,
      image: image || null
     })
   ), [dispatch]);
  

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Confirmação
      </Text>

      <View style={ styles.root }>
        
        {image ? 
          <Image  source={{ uri: image.uri }} style={styles.preview} /> :
          <TouchableOpacity style={[styles.preview, styles.previewDefault]} onPress={() => navigation.goBack()}>
            <Icon name="camera-alt" size={80} color="#EEE" />
          </TouchableOpacity>
        }

        <View style={{ marginTop: 10 }} />
        <Field
          name="type_event_id"
          label="Tipo de Criadouro"
          dialogTitle="Selecione um Tipo de Criadouro"
          options={getOptionsSelect()}
          component={SelectDialogRedux}
        />
        <View style={{ marginTop: 10 }} />

        <Button loading={submitting} disabled={submitting} mode="contained" onPress={handleSubmit(submitCreateReport)}
          style={{ marginBottom: 6, marginTop: 10, backgroundColor: '#4c88d6' }} >
          {submitting ? 'Enviando' : 'Enviar'}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  root: {
    backgroundColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 10,
    flex: 1,
  },

  preview: {
    width: Dimensions.get('window').width - 20,
    height: Dimensions.get('window').width - 140
  },

  previewDefault: {
    backgroundColor: '#7e7e7e',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4d000000'
  },

  title: { textAlign: 'center', fontSize: 20, color: '#707070', paddingTop: 20, paddingBottom: 10 }
});

export default reduxForm({
  form: 'FORM_CREATE_REPORT',
})(FormCreateReport);
