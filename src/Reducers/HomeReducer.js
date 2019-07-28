import {
  RESTAURANTLIST_DATA,
  RESTAURANTLIST_ERROR_DATA,
  RESTAURANTLIST_LOADING,
  RESTAURANTLIST_INITIAL_STATE,
  COUNTRY_DATA,
  COUNTRY_ERROR_DATA,
  COUNTRY_LOADING,
  COUNTRY_INITIAL_STATE,
  COUNTRY_CHANGED
} from "../Actions/type";

const INTIAL_STATE = {
  restaurants: [],
  countries: [],
  country: 'Select country',
  authResult: "",
  isdata: false,
  isLoading: false
};

export default (state = INTIAL_STATE, action) => {
  const responce = action.payload;
  switch (action.type) {
    case RESTAURANTLIST_LOADING:
      return {
        ...state,
        isLoading: true,
        authResult: ""
      };
    case RESTAURANTLIST_DATA:
      console.log("response restaurantslist", action.payload);
      return {
        ...state,
        authResult: "success",
        isLoading: false,
        restaurants: action.payload.list,
        isdata: action.payload.isData
      };
    case RESTAURANTLIST_ERROR_DATA:
      console.log("Error");
      return {
        ...state,
        authResult: "fail",
        isLoading: false
      };

    case COUNTRY_LOADING:
      return {
        ...state,
        isLoading: true,
        authResult: ""
      };
    case COUNTRY_DATA:
      console.log("response countrylist", action.payload);
      return {
        ...state,
        authResult: "success",
        isLoading: false,
        countries: action.payload
      };
    case COUNTRY_ERROR_DATA:
      console.log("Error");
      return {
        ...state,
        authResult: "fail",
        isLoading: false
      };

      case COUNTRY_CHANGED:
      console.log(
        "COUNTRY_CHANGED",
        action.payload,
      );
      return {
        ...state,
        country: action.payload
      };

    default:
      return state;
  }
};
