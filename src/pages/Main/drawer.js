import React from 'react';
import {
    Text,
    View
} from 'react-native';
import LayersData from "../../shared/layers_config.json";
import ItemDrawer from "./itemDrawer";
import { Drawer } from 'native-base';
import { useDispatch, useSelector } from 'react-redux'
import { types as typesMain } from "../../store/ducks/main"


const SideBar = ({ }) => {
    return (
        <View style={{ justifyContent: "flex-start", alignItems: "flex-start", backgroundColor: '#FFF', flex: 1 }}>
            <View style={{ margin: 15 }}>

                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    Camadas
            </Text>
                <Text style={{ fontWeight: "900", fontSize: 10, color: "grey" }}>
                    selecione as camadas para visualizar no mapa
            </Text>
                {LayersData["Camadas"].map(item =>
                    <ItemDrawer item={item} />
                )}

            </View>
        </View>
    );
};

const DrawerComponent = ({ }) => {
    const openModal = useSelector(state => state.main.openModal);
    const dispatch = useDispatch();
    return (
        <Drawer
            open={openModal}
            onCloseStart={() => openModal && dispatch({ type: typesMain.CHANGE_MODAL_DRAWER, payload: false })}
            content={<SideBar />}
        >
        </Drawer>
    );
}


export default DrawerComponent;