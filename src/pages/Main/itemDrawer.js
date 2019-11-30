import React, { Component } from 'react';
import {
    Text,
    View
} from 'react-native';
import IconComm from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { types as typesMain } from "../../store/ducks/main"
import { Switch } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux'


const ItemDrawer = ({ item }) => {
    const layers = useSelector(state => state.main.layers);
    const enable = layers.includes(item.name);
    const dispatch = useDispatch();

    return (
        <View>
            <View style={{ justifyContent: "space-between", flexDirection: "row", marginTop: 20, alignItems: "stretch", margin: 0 }}>
                <Text style={{ fontWeight: "normal", fontSize: 15 }}>
                    {item.title}
                </Text>
                <Switch
                    color={"#ef6c00"}
                    value={enable}
                    onValueChange={() => enable ? dispatch({ type: typesMain.ASYNC_REMOVE_SELECTED_LAYER, payload: item.name }) : dispatch({ type: typesMain.ASYNC_ADD_SELECTED_LAYER, payload: item.name })}
                />

            </View>

            {enable && item.legenda.map(legend => <View style={{ flexDirection: "row", marginTop: 4 }}>
                {item.commun ? <Icon name={legend.icon} color={legend.color} size={15} /> : <IconComm name={legend.icon} color={legend.color} size={14} />}
                <Text style={!item.commun ? { fontWeight: "bold", fontSize: 11, marginLeft: 10 } : { fontWeight: "bold", fontSize: 11, marginTop: -0, marginLeft: 10 }}>
                    {legend.title}
                </Text>
            </View>)}
        </View>
    );
}



export default ItemDrawer
