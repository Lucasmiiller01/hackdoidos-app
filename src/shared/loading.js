import React from "react";
import { ActivityIndicator, View, Text, Platform } from "react-native";

export default ({ text, size = "large", noStyle }) => {
    if (Platform.OS === "ios" && ["large", "small"].indexOf(size) === -1) {
        size = size > 20 ? "large" : "small";
    }
    return (
        <View
            style={
                !noStyle
                    ? {
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center"
                    }
                    : { marginVertical: 10 }
            }
        >
            <ActivityIndicator size={size} color="#4c88d6" />
            {text && (
                <Text style={{ color: "#4c88d6", fontSize: 18, marginTop: 5 }}>
                    {text}
                </Text>
            )}
        </View>
    );
};