import React, { PureComponent } from "react";

import { ScrollView, View, StyleSheet, Text } from "react-native";

import {
  Subheading,
  Button,
  Portal,
  Dialog,
  RadioButton,
  TouchableRipple,
} from "react-native-paper";

export default class SelectDialogRedux extends PureComponent {
  state = {
    visible: false
  };

  show = () => this.setState({ visible: true });
  hide = () => this.setState({ visible: false });

  isChecked = value =>
    this.props.input.value === value ? "checked" : "unchecked";

  label = () => {
    const {
      label,
      input: { value },
      options,
    } = this.props;

    return !value ? label : options.find(item => item.value === value).label;
  };

  render() {
    const {
      input: { onChange, name },
      options = [],
      dialogTitle = "Escolha uma opção"
    } = this.props;

    return (
      <View>

        {/* <View style={{ border: '1px solid #CCC' }} onPress={this.show}>
          <Text style={styles.selectText}>{this.label()}</Text>
        </View> */}

        <Button
          mode="contained"
          color="#DDD"
          uppercase={false}
          onPress={this.show}
          style={styles.select}
        >
           <Text style={styles.selectText}>{this.label()}</Text>
        </Button>

        <Portal>
          <Dialog onDismiss={this.hide} visible={this.state.visible}>
            <Dialog.Title>{dialogTitle}</Dialog.Title>
            <Dialog.ScrollArea style={styles.contentSelectScrollArea}>
              <ScrollView>
                <View>
                  {options.map(option => (
                    <TouchableRipple
                      key={name + option.value}
                      onPress={() => {
                        onChange(option.value);
                        this.hide();
                      }}
                    >
                      <View style={styles.row}>
                      <View pointerEvents="none">
                          <RadioButton
                            color="#4c88d6"
                            value={option.value}
                            status={this.isChecked(option.value)}
                          />
                        </View>
                        <Subheading style={styles.text}>
                          {option.label}
                        </Subheading>
                      </View>
                    </TouchableRipple>
                  ))}
                </View>
              </ScrollView>
            </Dialog.ScrollArea>
          </Dialog>
        </Portal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  select: {
    borderColor: "#CCC",
    borderWidth: 1,
    paddingVertical: 10,
    marginTop: 5,
  },
  selectText: {
    textAlign: "left",
    color: '#666',
    fontSize: 16,
    fontWeight: "normal"
  },
  contentSelectScrollArea: {
    maxHeight: 320,
    paddingHorizontal: 0,
    paddingBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  text: {
    paddingLeft: 8
  }
});
