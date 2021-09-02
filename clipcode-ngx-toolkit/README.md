# Clipcode NG Toolkit

Clipcode NG Toolkit offers a range of Angular components in the area of geospatial programming (using Google Maps JavaScript API and the Angular Component/google-maps library). 

Clipcode NG Toolkit is provided under [Apache Licensing](https://www.apache.org/licenses/LICENSE-2.0)

# API Key
To use Google Maps, you need to set up a billing account with Google and to generate an API Key. You need to supply this API key to Clipcode NG Toolkit via an instance of `GeoServiceOptions`, like so:
```
providers: [
    {provide: GeoServiceOptions, useValue: { apiKey: 'YOUR-KEY-HERE' } },
],
```


