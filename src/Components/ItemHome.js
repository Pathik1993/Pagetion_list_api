import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet
} from "react-native";
import ImageLoad from "./ImageLoad";

const { width } = Dimensions.get("window");

const boxCount = 3;
const boxWidth = width / boxCount;

export default class ItemHome extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.8} onPress={this.props.onClickItem}>
          <View>
            <View>
              <View style={{ flexDirection: "row", overflow: "hidden" }}>
                <ImageLoad
                  source={this.props.image}
                  style={{
                    height: 130,
                    width: 130,
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5
                  }}
                />

                <View style={{ backgroundColor: "#ffff", flex: 1 }}>
                  <View style={{ marginTop: 10, marginLeft: 10 }}>
                    <Text
                      allowFontScaling={false}
                      numberOfLines={1}
                      style={styles.resnametextStyle}
                    >
                      {this.props.titletype}
                    </Text>
                    <Text
                      allowFontScaling={false}
                      numberOfLines={1}
                      style={styles.addresstextStyle}
                    >
                      {this.props.address}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderBottomColor: "red",
                      borderBottomWidth: 1.5,
                      marginTop: 10,
                      width: 25,
                      marginLeft: 10
                    }}
                  />

                  <View style={{ marginTop: 5, marginLeft: 10 }}>
                    <Text
                      allowFontScaling={false}
                      numberOfLines={1}
                      style={styles.areatextStyle}
                    >
                      {this.props.area}
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={styles.pricetextStyle}
                    >
                      Rs. {this.props.price}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    height: 140
  },
  addresstextStyle: {
    color: "#666666",
    fontSize: 10,
    flexWrap: "wrap",
    paddingRight: 10
  },
  pricetextStyle: {
    color: "#666666",
    fontSize: 10,
    marginTop: 4,
    flexWrap: "wrap"
  },
  areatextStyle: {
    color: "#666666",
    fontSize: 10,
    marginTop: 5,
    flexWrap: "wrap"
  },
  resnametextStyle: {
    color: "#000000",
    fontSize: 14,
    marginRight: 50,
    flexWrap: "wrap"
  }
});
