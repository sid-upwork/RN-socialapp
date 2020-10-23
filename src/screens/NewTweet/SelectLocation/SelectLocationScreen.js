import React from "react";
import { BackHandler, View } from "react-native";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import IconFeather from "react-native-vector-icons/Feather";
import { Dimens } from "../../../utils/Dimens";
import colors from "../../../utils/Colors";

import Header from '../../Common/BackHeader/BackHeader';
// const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } } };
// const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } } };

export default class SelectLocationScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    console.log(this.props)
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.goBack()
    return true
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header title="Select Location"
          backValue={false}
          showDoneButton={false}
          goBackProp={this.props.navigation} />

        <GooglePlacesAutocomplete
          placeholder='Search'
          minLength={2} // minimum length of text to search
          autoFocus={false}
          fetchDetails={true}
          onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
            this.props.navigation.state.params.returnData(details);
            this.props.navigation.goBack();
          }}
          getDefaultValue={() => {
            return ''; // text input default value
          }}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: 'AIzaSyDnQH9U1GT_MGX9JwMI4p4dA0vOFTrKySI',
            language: 'en', // language of the results
            types: '(cities)', // default: 'geocode'
          }}
          styles={{
            textInputContainer: {
              width: '100%',
              backgroundColor: colors.appRed
            },
            description: {
              fontWeight: 'bold'
            },
            textInput: {
              marginHorizontal: Dimens.five,
              color: colors.appRed,
              fontSize: Dimens.extraLargerTextSize
            },
            predefinedPlacesDescription: {
              color: '#1faadb'
            },
          }}

          currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
          currentLocationLabel="Current location"
          nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={{
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }}
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance',
            types: 'food',
          }}


          filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

          // predefinedPlaces={[homePlace, workPlace]}

          predefinedPlacesAlwaysVisible={true}

          debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
          renderLeftButton={() => { }}
          renderRightButton={() => { }}
        />
      </View>
    );
  }

}
