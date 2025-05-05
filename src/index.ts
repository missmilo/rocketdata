import axios from 'axios';

/**
 * @interface ApodResponse
 * @description ApodResponse is the response from the NASA API.
 * @property {string} date - The date of the APOD.
 * @property {string} explanation - The explanation of the APOD.
 * @property {string} hdurl - The HD URL of the APOD.
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
 * @description ApodRequestParams is the request parameters for the NASA API.
 * @property {string} date - The date of the APOD.
 * @property {string} start_date - The start date of the APOD.
 * @property {string} end_date - The end date of the APOD.
 * @property {number} count - The number of APODs to return.
 * @property {boolean} thumbs - Whether to return thumbnails.
 * @property {string} api_key - The API key.
 */
export type ApodRequestParams = {
  date?: string;
  start_date?: string;
  end_date?: string;
  count?: number;
  thumbs?: boolean;
  api_key?: string;
};

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
 * @property {string} camera - The camera of the rover.
 * @property {number} page - The page of the APOD.
 * @property {string} api_key - The API key.
 */
export interface RoverQueryParams {
  sol: number;
  camera?: CameraAbbreviation; // optional, defaults to all
  page?: number; // optional, defaults to 1
  api_key?: string; // optional, defaults to DEMO_KEY
}

export interface RoverInfo {
  id: number;
  name: 'Curiosity' | 'Opportunity' | 'Spirit';
  landing_date: string; // ISO date string
  launch_date: string;
  status: 'active' | 'complete';
}

export interface MarsPhoto {
  id: number;
  sol: number;
  camera: CameraInfo;
  img_src: string;
  earth_date: string;
  rover: RoverInfo;
}

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
 * @returns {ApodResponse} Returns the Astronomy Picture of the Day.
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

export const getMarsRoverPhotosByMartianSol = async (params: RoverQueryParams): Promise<MarsPhotoResponse> => {
  const query = buildQueryParams(params);
  const response = await axios.get<MarsPhotoResponse>(`${MARS_ROVER_API}/curiosity/photos?${query}`);
  return response.data;
}

