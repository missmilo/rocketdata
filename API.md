## Functions

<dl>
<dt><a href="#getAstronomyPictureOfTheDay">getAstronomyPictureOfTheDay(params)</a> ⇒ <code><a href="#ApodResponse">Promise.&lt;ApodResponse&gt;</a></code></dt>
<dd><p>getAstronomyPictureOfTheDay is a function that returns the Astronomy Picture of the Day from NASA's API.</p></dd>
<dt><a href="#getMarsRoverPhotosByMartianSol">getMarsRoverPhotosByMartianSol(params)</a> ⇒ <code><a href="#MarsPhotoResponse">Promise.&lt;MarsPhotoResponse&gt;</a></code></dt>
<dd><p>Get Mars rover photos by Martian sol.</p></dd>
<dt><a href="#getMarsRoverPhotosByEarthDate">getMarsRoverPhotosByEarthDate(params)</a> ⇒ <code><a href="#MarsPhotoResponse">Promise.&lt;MarsPhotoResponse&gt;</a></code></dt>
<dd><p>Get Mars rover photos by earth date.</p></dd>
<dt><a href="#getMissionManifest">getMissionManifest(roverName)</a> ⇒ <code><a href="#RoverManifest">Promise.&lt;RoverManifest&gt;</a></code></dt>
<dd><p>A mission manifest is available for each Rover. This manifest will list details of the Rover's mission to help narrow down photo queries to the API.</p></dd>
</dl>

## Interfaces

<dl>
<dt><a href="#ApodResponse">ApodResponse</a></dt>
<dd><p>The response object from the NASA API.</p></dd>
<dt><a href="#ApodRequestParams">ApodRequestParams</a></dt>
<dd><p>The request parameters for getAstronomyPictureOfTheDay.</p></dd>
<dt><a href="#CameraInfo">CameraInfo</a></dt>
<dd><p>CameraInfo is the format for a camera.</p></dd>
<dt><a href="#SolQueryParams">SolQueryParams</a></dt>
<dd><p>Parameters to fetch Mars rover photos by sol (Martian day).</p></dd>
<dt><a href="#EarthDateQueryParams">EarthDateQueryParams</a></dt>
<dd><p>Parameters to fetch Mars rover photos by earth date.</p></dd>
<dt><a href="#RoverInfo">RoverInfo</a></dt>
<dd><p>RoverInfo is the format for a rover.</p></dd>
<dt><a href="#MarsPhoto">MarsPhoto</a></dt>
<dd><p>MarsPhoto is the format for a Mars rover photo.</p></dd>
<dt><a href="#MarsPhotoResponse">MarsPhotoResponse</a></dt>
<dd><p>MarsPhotoResponse is the response object for querying by Martian sol.</p></dd>
<dt><a href="#RoverManifest">RoverManifest</a></dt>
<dd><p>The rover manifest object type returned from getMissionManifest.</p></dd>
</dl>

<a name="ApodResponse"></a>

## ApodResponse
**Version**: 2.0.2  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| date | <code>string</code> | <p>The date of the APOD.</p> |
| explanation | <code>string</code> | <p>The explanation of the APOD.</p> |
| [hdurl] | <code>string</code> | <p>The HD URL of the APOD. May not be available for all media types.</p> |
| media_type | <code>string</code> | <p>The media type of the APOD.</p> |
| service_version | <code>string</code> | <p>The service version of the APOD.</p> |
| title | <code>string</code> | <p>The title of the APOD.</p> |
| url | <code>string</code> | <p>The URL of the APOD.</p> |

<p>The response object from the NASA API.</p>

<a name="ApodRequestParams"></a>

## ApodRequestParams
**Version**: 2.0.2  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [date] | <code>string</code> | <p>Optional, date of the APOD.</p> |
| [start_date] | <code>string</code> | <p>Optional, start date of the APOD.</p> |
| [end_date] | <code>string</code> | <p>Optional, end date of the APOD.</p> |
| [count] | <code>number</code> | <p>Optional, number of APODs to return.</p> |
| [thumbs] | <code>boolean</code> | <p>Optional, whether to return thumbnails.</p> |
| api_key | <code>string</code> | <p>The API key.</p> |

<p>The request parameters for getAstronomyPictureOfTheDay.</p>

<a name="CameraInfo"></a>

## CameraInfo
**Version**: 2.1.2  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| abbreviation | <code>string</code> | <p>The abbreviation of the camera.</p> |
| fullName | <code>string</code> | <p>The full name of the camera.</p> |
| supportedRovers | <code>Array.&lt;string&gt;</code> | <p>The rovers that support the camera.</p> |

<p>CameraInfo is the format for a camera.</p>

<a name="SolQueryParams"></a>

## SolQueryParams
**Version**: 2.2.2  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| sol | <code>number</code> | <p>The Martian sol (e.g., 1000).</p> |
| [camera] | <code>CameraAbbreviation</code> | <p>Abbreviation of the camera.</p> |
| [page] | <code>number</code> | <p>Optional, defaults to 1. 25 items per page returned.</p> |
| api_key | <code>string</code> | <p>NASA API key.</p> |

<p>Parameters to fetch Mars rover photos by sol (Martian day).</p>

<a name="EarthDateQueryParams"></a>

## EarthDateQueryParams
**Version**: 2.2.2  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| earth_date | <code>string</code> | <p>The earth date of the rover (e.g., '2023-06-25').</p> |
| [camera] | <code>CameraAbbreviation</code> | <p>Abbreviation of the camera.</p> |
| [page] | <code>number</code> | <p>Optional, defaults to 1. 25 items per page returned.</p> |
| api_key | <code>string</code> | <p>NASA API key.</p> |

<p>Parameters to fetch Mars rover photos by earth date.</p>

<a name="RoverInfo"></a>

## RoverInfo
**Version**: 2.1.2  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | <p>The id of the rover.</p> |
| name | <code>Rover</code> | <p>The name of the rover.</p> |
| landing_date | <code>string</code> | <p>The landing date of the rover.</p> |
| launch_date | <code>string</code> | <p>The launch date of the rover.</p> |
| status | <code>string</code> | <p>The status of the rover.</p> |

<p>RoverInfo is the format for a rover.</p>

<a name="MarsPhoto"></a>

## MarsPhoto
**Version**: 2.1.2  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | <p>The id of the Mars rover photo.</p> |
| sol | <code>number</code> | <p>The mars day.</p> |
| camera | [<code>CameraInfo</code>](#CameraInfo) | <p>The camera of the rover.</p> |
| img_src | <code>string</code> | <p>The image source of the Mars rover photo.</p> |
| earth_date | <code>string</code> | <p>The earth date of the Mars rover photo.</p> |
| rover | [<code>RoverInfo</code>](#RoverInfo) | <p>The rover of the Mars rover photo.</p> |

<p>MarsPhoto is the format for a Mars rover photo.</p>

<a name="MarsPhotoResponse"></a>

## MarsPhotoResponse
**Version**: 2.1.2  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| photos | [<code>Array.&lt;MarsPhoto&gt;</code>](#MarsPhoto) | <p>The list of Mars rover photos.</p> |

<p>MarsPhotoResponse is the response object for querying by Martian sol.</p>

<a name="RoverManifest"></a>

## RoverManifest
**Version**: 2.3.2  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | <p>The name of the rover.</p> |
| landing_date | <code>string</code> | <p>The landing date of the rover.</p> |
| launch_date | <code>string</code> | <p>The launch date of the rover.</p> |
| status | <code>string</code> | <p>The status of the rover.</p> |
| max_sol | <code>string</code> | <p>The most recent Martian sol from which photos exist.</p> |
| max_date | <code>string</code> | <p>The most recent Earth date from which photos exist.</p> |
| total_photos | <code>string</code> | <p>The total number of photos taken by the rover.</p> |

<p>The rover manifest object type returned from getMissionManifest.</p>

<a name="getAstronomyPictureOfTheDay"></a>

## getAstronomyPictureOfTheDay(params)
**Fulfill**: [<code>ApodResponse</code>](#ApodResponse) - The astronomy picture of the day.  
**Reject**: <code>Error</code> - The error object.  
**Version**: 2.0.2  

| Param | Type | Description |
| --- | --- | --- |
| params | [<code>ApodRequestParams</code>](#ApodRequestParams) | <p>The request parameters.</p> |

<p>getAstronomyPictureOfTheDay is a function that returns the Astronomy Picture of the Day from NASA's API.</p>

<a name="getMarsRoverPhotosByMartianSol"></a>

## getMarsRoverPhotosByMartianSol(params)
**Fulfill**: [<code>MarsPhotoResponse</code>](#MarsPhotoResponse) - The Mars rover photos.  
**Reject**: <code>Error</code> - The error object.  
**Version**: 2.1.2  

| Param | Type | Description |
| --- | --- | --- |
| params | [<code>SolQueryParams</code>](#SolQueryParams) | <p>The request parameters.</p> |

<p>Get Mars rover photos by Martian sol.</p>

<a name="getMarsRoverPhotosByEarthDate"></a>

## getMarsRoverPhotosByEarthDate(params)
**Fulfill**: [<code>MarsPhotoResponse</code>](#MarsPhotoResponse) - The Mars rover photos.  
**Reject**: <code>Error</code> - The error object.  
**Version**: 2.2.2  

| Param | Type | Description |
| --- | --- | --- |
| params | [<code>EarthDateQueryParams</code>](#EarthDateQueryParams) | <p>The request parameters.</p> |

<p>Get Mars rover photos by earth date.</p>

<a name="getMissionManifest"></a>

## getMissionManifest(roverName)
**Fulfill**: [<code>RoverManifest</code>](#RoverManifest) - The rover manifest.  
**Reject**: <code>Error</code> - The error object.  
**Version**: 2.3.2  

| Param | Type | Description |
| --- | --- | --- |
| roverName | <code>Rover</code> | <p>The name of the rover. Curiosity, Opportunity or Spirit.</p> |

<p>A mission manifest is available for each Rover. This manifest will list details of the Rover's mission to help narrow down photo queries to the API.</p>

