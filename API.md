## Functions

<dl>
<dt><a href="#getAstronomyPictureOfTheDay">getAstronomyPictureOfTheDay(params)</a> ⇒ <code><a href="#ApodResponse">Promise.&lt;ApodResponse&gt;</a></code></dt>
<dd><p>getAstronomyPictureOfTheDay is a function that returns the Astronomy Picture of the Day from NASA's API.</p></dd>
<dt><a href="#getMarsRoverPhotosByMartianSol">getMarsRoverPhotosByMartianSol(params)</a> ⇒ <code><a href="#MarsPhotoResponse">Promise.&lt;MarsPhotoResponse&gt;</a></code></dt>
<dd></dd>
</dl>

## Interfaces

<dl>
<dt><a href="#ApodResponse">ApodResponse</a></dt>
<dd><p>The response object from the NASA API.</p></dd>
<dt><a href="#ApodRequestParams">ApodRequestParams</a></dt>
<dd><p>The request parameters for getAstronomyPictureOfTheDay.</p></dd>
<dt><a href="#CameraInfo">CameraInfo</a></dt>
<dd><p>CameraInfo is the format for a camera.</p></dd>
<dt><a href="#RoverQueryParams">RoverQueryParams</a></dt>
<dd><p>RoverQueryParams is the request parameters for querying by Martian sol.</p></dd>
<dt><a href="#RoverInfo">RoverInfo</a></dt>
<dd><p>RoverInfo is the format for a rover.</p></dd>
<dt><a href="#MarsPhoto">MarsPhoto</a></dt>
<dd><p>MarsPhoto is the format for a Mars rover photo.</p></dd>
<dt><a href="#MarsPhotoResponse">MarsPhotoResponse</a></dt>
<dd><p>MarsPhotoResponse is the response object for querying by Martian sol.</p></dd>
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
| [date] | <code>string</code> | <p>Optional date of the APOD.</p> |
| [start_date] | <code>string</code> | <p>Optional start date of the APOD.</p> |
| [end_date] | <code>string</code> | <p>Optional end date of the APOD.</p> |
| [count] | <code>number</code> | <p>Optional number of APODs to return.</p> |
| [thumbs] | <code>boolean</code> | <p>Optional whether to return thumbnails.</p> |
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

<a name="RoverQueryParams"></a>

## RoverQueryParams
**Version**: 2.0.2  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| sol | <code>number</code> | <p>The mars day.</p> |
| [camera] | <code>string</code> | <p>The camera of the rover. Optional, defaults to all.</p> |
| [page] | <code>number</code> | <p>The page of the APOD. Optional, defaults to 1.</p> |
| api_key | <code>string</code> | <p>The API key.</p> |

<p>RoverQueryParams is the request parameters for querying by Martian sol.</p>

<a name="RoverInfo"></a>

## RoverInfo
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | <p>The id of the rover.</p> |
| name | <code>string</code> | <p>The name of the rover.</p> |
| landing_date | <code>string</code> | <p>The landing date of the rover.</p> |
| launch_date | <code>string</code> | <p>The launch date of the rover.</p> |
| status | <code>string</code> | <p>The status of the rover.</p> |

<p>RoverInfo is the format for a rover.</p>

<a name="MarsPhoto"></a>

## MarsPhoto
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
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| photos | [<code>Array.&lt;MarsPhoto&gt;</code>](#MarsPhoto) | <p>The list of Mars rover photos.</p> |

<p>MarsPhotoResponse is the response object for querying by Martian sol.</p>

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
| params | [<code>RoverQueryParams</code>](#RoverQueryParams) | <p>The request parameters.</p> |

