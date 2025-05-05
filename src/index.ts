import axios from 'axios';


/**
 * @interface ApodResponse
 * @description The response object from the NASA API.
 * @property {string} date - The date of the APOD.
 * @property {string} explanation - The explanation of the APOD.
 * @property {string} [hdurl] - The HD URL of the APOD. May not be available for all media types.
 * @property {string} media_type - The media type of the APOD.
 * @property {string} service_version - The service version of the APOD.
 * @property {string} title - The title of the APOD.
 * @property {string} url - The URL of the APOD.
 */
export type ApodResponse = {
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: 'image' | 'video';
  service_version: string;
  title: string;
  url: string;
}

/**
 * @interface ApodRequestParams
 * @description The request parameters for getAstronomyPictureOfTheDay.
 * @property {string} [date] - Optional date of the APOD.
 * @property {string} [start_date] - Optional start date of the APOD.
 * @property {string} [end_date] - Optional end date of the APOD.
 * @property {number} [count] - Optional number of APODs to return.
 * @property {boolean} [thumbs] - Optional whether to return thumbnails.
 * @property {string} api_key - The API key.
 */
export type ApodRequestParams = {
  date?: string;
  start_date?: string;
  end_date?: string;
  count?: number;
  thumbs?: boolean;
  api_key: string;
};


/**
 * @interface CameraInfo
 * @description CameraInfo is the format for a camera.
 * @property {string} abbreviation - The abbreviation of the camera.
 * @property {string} fullName - The full name of the camera.
 * @property {Array<string>} supportedRovers - The rovers that support the camera.
 */
export interface CameraInfo {
  abbreviation: CameraAbbreviation;
  fullName: string;
  supportedRovers: Rover[];
}


export type CameraAbbreviation =
  | 'FHAZ'
  | 'RHAZ'
  | 'MAST'
  | 'CHEMCAM'
  | 'MAHLI'
  | 'MARDI'
  | 'NAVCAM'
  | 'PANCAM'
  | 'MINITES';

export type Rover = 'Curiosity' | 'Opportunity' | 'Spirit';


export const CAMERAS: CameraInfo[] = [
  { abbreviation: 'FHAZ', fullName: 'Front Hazard Avoidance Camera', supportedRovers: ['Curiosity', 'Opportunity', 'Spirit'] },
  { abbreviation: 'RHAZ', fullName: 'Rear Hazard Avoidance Camera', supportedRovers: ['Curiosity', 'Opportunity', 'Spirit'] },
  { abbreviation: 'MAST', fullName: 'Mast Camera', supportedRovers: ['Curiosity'] },
  { abbreviation: 'CHEMCAM', fullName: 'Chemistry and Camera Complex', supportedRovers: ['Curiosity'] },
  { abbreviation: 'MAHLI', fullName: 'Mars Hand Lens Imager', supportedRovers: ['Curiosity'] },
  { abbreviation: 'MARDI', fullName: 'Mars Descent Imager', supportedRovers: ['Curiosity'] },
  { abbreviation: 'NAVCAM', fullName: 'Navigation Camera', supportedRovers: ['Curiosity', 'Opportunity', 'Spirit'] },
  { abbreviation: 'PANCAM', fullName: 'Panoramic Camera', supportedRovers: ['Opportunity', 'Spirit'] },
  { abbreviation: 'MINITES', fullName: 'Miniature Thermal Emission Spectrometer (Mini-TES)', supportedRovers: ['Opportunity', 'Spirit'] },
];

/**
 * @interface RoverQueryParams
 * @description RoverQueryParams is the request parameters for querying by Martian sol.
 * @property {number} sol - The mars day.
 * @property {string} [camera] - The camera of the rover. Optional, defaults to all.
 * @property {number} [page] - The page of the APOD. Optional, defaults to 1.
 * @property {string} api_key - The API key.
 */
export interface RoverQueryParams {
  sol: number;
  camera?: CameraAbbreviation; 
  page?: number; 
  api_key: string; 
}

/**
 * @interface RoverInfo
 * @description RoverInfo is the format for a rover.
 * @property {number} id - The id of the rover.
 * @property {string} name - The name of the rover.
 * @property {string} landing_date - The landing date of the rover.
 * @property {string} launch_date - The launch date of the rover.
 * @property {string} status - The status of the rover.
 */
export interface RoverInfo {
  id: number;
  name: 'Curiosity' | 'Opportunity' | 'Spirit';
  landing_date: string; // ISO date string
  launch_date: string;
  status: 'active' | 'complete';
}

/**
 * @interface MarsPhoto
 * @description MarsPhoto is the format for a Mars rover photo.
 * @property {number} id - The id of the Mars rover photo.
 * @property {number} sol - The mars day.
 * @property {CameraInfo} camera - The camera of the rover.
 * @property {string} img_src - The image source of the Mars rover photo.
 * @property {string} earth_date - The earth date of the Mars rover photo.
 * @property {RoverInfo} rover - The rover of the Mars rover photo.
 */
export interface MarsPhoto {
  id: number;
  sol: number;
  camera: CameraInfo;
  img_src: string;
  earth_date: string;
  rover: RoverInfo;
}

/**
 * @interface MarsPhotoResponse
 * @description MarsPhotoResponse is the response object for querying by Martian sol.
 * @property {Array<MarsPhoto>} photos - The list of Mars rover photos.
 */
export interface MarsPhotoResponse {
  photos: MarsPhoto[];
}

const NASA_API_URL = 'https://api.nasa.gov';
const APOD_API = `${NASA_API_URL}/planetary/apod`;
const MARS_ROVER_API = `${NASA_API_URL}/mars-photos/api/v1/rovers`;


function buildQueryParams(params: Record<string, any>): string {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      query.append(key, String(value));
    }
  }
  return query.toString();
}

/**
 * @function getAstronomyPictureOfTheDay
 * @version 2.0.2
 * @param {ApodRequestParams} params - The request parameters.
 * @returns {Promise<ApodResponse>} 
 * @fulfill {ApodResponse} - The astronomy picture of the day.
 * @reject {Error} - The error object.
 * @description getAstronomyPictureOfTheDay is a function that returns the Astronomy Picture of the Day from NASA's API.
 */
export const getAstronomyPictureOfTheDay = async (
  params: ApodRequestParams
): Promise<ApodResponse | ApodResponse[]> => {
  const query = buildQueryParams(params);
  const response = await axios.get<ApodResponse | ApodResponse[]>(
    `${APOD_API}?${query}`
  );
  return response.data;
};


/**
 * @function getMarsRoverPhotosByMartianSol
 * @async
 * @version 2.1.2
 * @param {RoverQueryParams} params - The request parameters.
 * @returns {Promise<MarsPhotoResponse>}
 * @fulfill {MarsPhotoResponse} - The Mars rover photos.
 * @reject {Error} - The error object.
 */
export const getMarsRoverPhotosByMartianSol = async (params: RoverQueryParams): Promise<MarsPhotoResponse> => {
  const query = buildQueryParams(params);
  const response = await axios.get<MarsPhotoResponse>(`${MARS_ROVER_API}/curiosity/photos?${query}`);
  return response.data;
}

export const getMarsRoverPhotosByEarthDate = async () => {

}