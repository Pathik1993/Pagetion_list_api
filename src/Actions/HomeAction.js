import axios from "axios";
import {
  RESTAURANTLIST_DATA,
  RESTAURANTLIST_ERROR_DATA,
  RESTAURANTLIST_LOADING,
  RESTAURANTLIST_INITIAL_STATE,
  BASE_URL,

  COUNTRY_DATA,
  COUNTRY_ERROR_DATA,
  COUNTRY_LOADING,
  COUNTRY_INITIAL_STATE,
  COUNTRY_CHANGED
} from "./type";


// export const professionChangeEdit = (text) => {
//   return {
//     type: COUNTRY_CHANGED,
//     payload: text
//   };
// };
export const countryEdit = (country) => {
  console.log('Action call')
  console.log(country)
  return {
    type: COUNTRY_CHANGED,
    payload: country
  };
};

export const getrestaurants = ({ country, page,  restaurants  }) => {
  console.log(country);
  console.log(page);
  return dispatch => {
    if (page === 1) {
      dispatch({
        type: RESTAURANTLIST_LOADING
      });
    }

    axios
      // .get(`${BASE_URL}restaurants?price=${price}&name=${restoname}&address=${address}&state=${gujart}&city=${city}&zip=${zip}&country=${country}&page=${page}&per_page=5`, {
      .get(`${BASE_URL}restaurants?country=${country}&page=${page}&per_page=5`, {
      })
      .then(response => {
        if (response.data == "") {
          dispatch({
            type: RESTAURANTLIST_DATA,
            payload: "Something went wrong please try again"
          });
        } else {
          if (response.data) {
            console.log(response.data.restaurants);
            var isData = true;
            if (response.data.restaurants.length === 0) {
              console.log("false");
              isData = false;
            }
            console.log("second time, 20001", response.data.restaurants);
            if (page === 1) {
              dispatch({
                type: RESTAURANTLIST_DATA,
                payload: {
                  list: response.data.restaurants,
                  isData
                }
              });
            } else {
              if (response.data.restaurants.length > 0) {
                dispatch({
                  type: RESTAURANTLIST_DATA,
                  payload: {
                    list: restaurants.concat(response.data.restaurants),
                    isData
                  }
                });
              }
            }
          } else {
            console.log("not true");
            dispatch({
              type: RESTAURANTLIST_ERROR_DATA,
              payload: "Something went wrong please try again"
            });
          }
        }
      })
      .catch(error => {
        console.log("RESTAURANTLIST_ERROR_DATA  " + error);
        dispatch({
          type: RESTAURANTLIST_ERROR_DATA,
          payload: "Something went wrong please try again"
        });
      });
  };
};

export const getcountry = () => {
  return dispatch => {
      dispatch({
        type: COUNTRY_LOADING
      });

    axios
      .get(`${BASE_URL}countries`, {
      })
      .then(response => {
        dispatch({
          type: COUNTRY_DATA,
          payload: response.data.countries
        });
      })
      .catch(error => {
        console.log("RESTAURANTLIST_ERROR_DATA  " + error);
        dispatch({
          type: COUNTRY_ERROR_DATA,
          payload: "Something went wrong please try again"
        });
      });
  };
};
