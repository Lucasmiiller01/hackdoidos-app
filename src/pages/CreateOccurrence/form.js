import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {View, StyleSheet} from 'react-native';

import {Button} from 'react-native-paper';

import inputRedux from '../../shared/form/inputRedux';

import {reduxForm, Field} from 'redux-form';
import { createReport } from '../../store/ducks/createReports';

const FormCreateOccurrence = ({submitting, handleSubmit, coordinate}) => {

  const dispatch = useDispatch();
  const submitCreateReport = useCallback((values) => dispatch(
    createReport({
      ...values,
      x_coord: coordinate.latitude,
      y_coord: coordinate.longitude,
      layer_name: values.layer_name || ''
    })
  ), [dispatch]);

  return (
    <View style={styles.root}>

      <View style={{ marginVertical: 10 }} />

      <Field
        name="message"
        disabled={submitting}
        component={inputRedux}
        multiline={true}
        label="Descrição"
        numberOfLines={3}
      />

      <Button loading={submitting} disabled={submitting} mode="contained"
        style={{ marginBottom: 6}} onPress={handleSubmit(submitCreateReport)}>
        {submitting ? 'Enviando' : 'Enviar'}
      </Button>

    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 10,
    flex: 1,
  },
});

export default reduxForm({
  form: 'FORM_CREATE_REPORT',
})(FormCreateOccurrence);
