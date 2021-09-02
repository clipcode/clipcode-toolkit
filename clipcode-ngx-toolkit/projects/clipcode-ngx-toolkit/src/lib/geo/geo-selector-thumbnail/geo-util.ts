export class GeoUtil {
  static dumpGeocodedAddressComponent(address: google.maps.GeocoderAddressComponent): void {
    console.log('address.long_name:  ' + address.long_name);
    console.log('address.short_name: ' + address.short_name);
    if (address.types) {
      console.log('address.types.length: ' 
         + address.types.length.toString());
      address.types.forEach ( s => console.log('types: ' + s));                    
    }        
  }  
    
  static checkPolygon(location: google.maps.LatLng, 
    dataPolygon: google.maps.Data.Polygon): boolean {
    let found = false;
          
    dataPolygon.getArray().forEach ( lr => {
      const myPolygon = new google.maps.Polygon();
      myPolygon.setPath(lr.getArray());
      if (google.maps.geometry.poly.containsLocation(location, myPolygon)) {
        found = true;
        }
      });
    
    return found; 
  }
    
  static checkMultiPolygon(location: google.maps.LatLng, 
    dataPolygon: google.maps.Data.MultiPolygon): boolean {
    let found = false;
          
    dataPolygon.getArray().forEach ( p => {
      if (this.checkPolygon(location, p)){
        found = true;
      }
    });
    
    return found; 
  }
     
  static dumpGeocodedData(typedResult: Array<google.maps.GeocoderResult>): void {
    console.log('typedResult.length = ' + typedResult.length.toString());
    let adminArea = '';

    if (typedResult.length > 0) {
      typedResult.forEach( tr => {
        console.log('========== TYPED RESULT ===============');
        if (tr.formatted_address ) {
          console.log('tr.formatted_address: ' + tr.formatted_address);
        }
        if (tr.place_id ) {
          console.log('tr.place_id: ' + tr.place_id);
        }
        if (tr.types ) {
          console.log('tr.types.length = ' + tr.types.length.toString());
          tr.types.forEach ( s => console.log('tr.types: ' + s));
        }

        if (tr.address_components) {
        console.log('tr.address_components.length = ' + tr.address_components.length.toString());
        if (tr.address_components.length>0){
          tr.address_components.forEach( ac => { 
            console.log('........ ADDR COMPONENT ..................');
              this.dumpGeocodedAddressComponent(ac);
              if (adminArea == ''){
                if (ac.types && ac.long_name != '' && ac.long_name != undefined 
                    && ac.types.includes ('administrative_area_level_1')){
                  adminArea = ac.long_name;
                }
              }
            });
          }
        } else {
          console.log('address_components empty');
        }
      });
      if (adminArea == ''){
        console.log('NOT FOUND - Adminarea');
      } else {
        console.log('FOUND - AdminArea = ' + adminArea);
      }
    }
  }
}