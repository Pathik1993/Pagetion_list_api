/* @flow */

import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import ItemHome from "./ItemHome";
import { connect } from "react-redux";
import { NavigationActions, StackActions } from "react-navigation";
import { getrestaurants, getcountry, countryEdit } from "../Actions";
import ModalDropdown from "./ModalDropdown";

const country = "AW";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageCount: 1,
      visible: false,
      country: '',
    };
  }
  componentWillMount() {
    this.willFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      () => {
        this.props.getcountry();
        this.setState({country: this.props.country});
        console.log(this.state.country);
        // this.setState({ pageCount: 1 });
        // this.props.getrestaurants({ country: country, page: this.state.pageCount });

      }
    );

  }
  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  handleLoadMore = () => {
    this.setState(
      {
        pageCount: this.state.pageCount + 1
      },
      () => {
        console.log(this.state.pageCount);

        if (this.props.isdata) {
          this.props.getrestaurants({
            country: this.props.country,
            page: this.state.pageCount + 1,
            restaurants: this.props.restaurants
          });
        }
      }
    );
  };
  ActivityIndicator = () => {
    return <ActivityIndicator color="#000000" size="small" />;
  };

  professtionDropDown(rowData) {
    return (
      <TouchableOpacity style={{ width: "90%" }}>
        <Text
          allowFontScaling={false}
          style={{
            fontSize: 14,
            marginBottom: 10,
            paddingLeft: 10,
            paddingTop: 10,
            paddingRight: 10,
            width: "90%"
          }}
        >
          {rowData}
        </Text>
      </TouchableOpacity>
    );
  }

  onCountryChange(text) {
      this.props.countryEdit(text);
    }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerHeder}>


          <View
            style={{
              flex:1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text allowFontScaling={false} style={styles.textStyle}>
              {"Home"}
            </Text>
          </View>

          <View>
            <ModalDropdown
              ref="professtionDropDown"
              style={{
                width: "160%",
                borderBottomWidth: 0.2,
                borderColor: "#261d1d26",
                marginTop: 10,
                height: 30,
              }}
              textStyle={{
                fontSize: 16,
                width: "50%",
                color: "#1d1d26",
                paddingLeft: 10
              }}
              defaultValue={this.props.country}
              options={this.props.countries}
              renderButtonText={rowData => rowData.name}
              dropdownStyle={{ width: 150 }}
              onSelect={(idx, value) => {
                console.log(value, "onSelect");
                this.props.countryEdit(value);
                this.props.getrestaurants({ country: value, page: this.state.pageCount });
              }}
              renderRow={this.professtionDropDown.bind(this)}
            />
          </View>
        </View>
        <View>
          {
            (!this.props.isLoading && this.props.restaurants != null && this.props.restaurants.length > 0) ?
            <FlatList
              style={{ marginBottom: 50 }}
              data={this.props.restaurants}
              onEndReached={this.handleLoadMore.bind(this)}
              onEndReachedThreshold={1}
	      keyExtractor={(_, index) => index.toString()}
              ListFooterComponent={this.ActivityIndicator.bind(this)}
              renderItem={({ item, index }) => {
                return (
                  <ItemHome
                    image={{ uri: item.image_url }}
                    titletype={item.name}
                    address={item.address}
                    price={item.price}
                    area={item.area}
		    key={index.toString()}
                  />
                );
              }}
            />
            :
            <View style={{ height: 500, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{  fontSize: 16}}>Please Select country </Text>
            </View>

          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  nametextStyle: { color: "black", fontSize: 14 },
  containerHeder: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    backgroundColor: "white"
  },
  textStyle: {
    fontSize: 20,
    color: "black",
    marginLeft: 10
  }
});

const mapStateToProps = state => {
  return {
    restaurants: state.Home.restaurants,
    countries: state.Home.countries,
    country: state.Home.country,
    authResult: state.Home.authResult,
    isLoading: state.Home.isLoading,
    isdata: state.Home.isdata
  };
};

export default connect(
  mapStateToProps,
  {
    getrestaurants,
    getcountry,
    countryEdit
  }
)(Home);
