
## Functions

Name | Description
------ | -----------
[getAstronomyPictureOfTheDay(params)] | <p>getAstronomyPictureOfTheDay is a function that returns the Astronomy Picture of the Day from NASA's API.</p>

## Interfaces

Name | Description
------ | -----------
[ApodResponse] | <p>ApodResponse is the response from the NASA API.</p>
[ApodRequestParams] | <p>ApodRequestParams is the request parameters for the NASA API.</p>
[RoverQueryParams] | <p>RoverQueryParams is the request parameters for the NASA API.</p>


## ApodResponse

<p>ApodResponse is the response from the NASA API.</p>

**Kind**: global interface  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| date | `string` | <p>The date of the APOD.</p> |
| explanation | `string` | <p>The explanation of the APOD.</p> |
| hdurl | `string` | <p>The HD URL of the APOD.</p> |
| media_type | `string` | <p>The media type of the APOD.</p> |
| service_version | `string` | <p>The service version of the APOD.</p> |
| title | `string` | <p>The title of the APOD.</p> |
| url | `string` | <p>The URL of the APOD.</p> |


## ApodRequestParams

<p>ApodRequestParams is the request parameters for the NASA API.</p>

**Kind**: global interface  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| date | `string` | <p>The date of the APOD.</p> |
| start_date | `string` | <p>The start date of the APOD.</p> |
| end_date | `string` | <p>The end date of the APOD.</p> |
| count | `number` | <p>The number of APODs to return.</p> |
| thumbs | `boolean` | <p>Whether to return thumbnails.</p> |
| api_key | `string` | <p>The API key.</p> |


## RoverQueryParams

<p>RoverQueryParams is the request parameters for the NASA API.</p>

**Kind**: global interface  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| sol | `number` | <p>The sol of the APOD.</p> |
| camera | `string` | <p>The camera of the APOD.</p> |
| page | `number` | <p>The page of the APOD.</p> |
| api_key | `string` | <p>The API key.</p> |


## getAstronomyPictureOfTheDay(params)

<p>getAstronomyPictureOfTheDay is a function that returns the Astronomy Picture of the Day from NASA's API.</p>

**Kind**: global function  
**Returns**: <p>ApodResponse | ApodResponse[]</p>  

| Param | Description |
| --- | --- |
| params | <p>ApodRequestParams</p> |

<!-- LINKS -->

[ApodResponse]:#apodresponse
[ApodRequestParams]:#apodrequestparams
[RoverQueryParams]:#roverqueryparams
[getAstronomyPictureOfTheDay(params)]:#getastronomypictureofthedayparams
