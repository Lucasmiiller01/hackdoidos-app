import React, {Fragment, PureComponent} from 'react';

import {TextInput, HelperText} from 'react-native-paper';

export default class inputRedux extends PureComponent {
  state = {
    text: '',
  };

  render() {
    const {
      input: {onChange},
      meta: {touched, error},
      label = null,
      placeholder = '',
      secureTextEntry = false,
      style = {},
      mode = null,
      autoFocus = false,
      theme = {},
      maxLength = null,
      disabled = false,
      multiline = false,
      numberOfLines = null,
    } = this.props;

    const hasError = (error || false) !== false;
    return (
      <Fragment>

        <TextInput
          mode={mode}
          ref
          onChangeText={onChange}
          onChange={e => this.setState({text: e.nativeEvent.text})}
          placeholder={placeholder}
          error={hasError}
          value={this.state.text}
          label={label}
          autoCompleteType="off"
          secureTextEntry={secureTextEntry}
          style={style}
          autoFocus={autoFocus}
          theme={theme}
          maxLength={maxLength}
          disabled={disabled}
          multiline={multiline}
          numberOfLines={numberOfLines}
        />

        <HelperText
          type="error"
          style={{textAlign: 'center'}}
          visible={hasError}>
          {error && error.join('\n')}
        </HelperText>
      </Fragment>
    );
  }
}
