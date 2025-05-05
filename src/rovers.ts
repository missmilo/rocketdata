import axios from 'axios';
import { buildQueryParams } from './util';

/**
 * @interface CameraInfo
 * @version 2.1.2
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

export type Rover = 'curiosity' | 'opportunity' | 'spirit';

export const CAMERAS: CameraInfo[] = [
  { abbreviation: 'FHAZ', fullName: 'Front Hazard Avoidance Camera', supportedRovers: ['curiosity', 'opportunity', 'spirit'] },
  { abbreviation: 'RHAZ', fullName: 'Rear Hazard Avoidance Camera', supportedRovers: ['curiosity', 'opportunity', 'spirit'] },
  { abbreviation: 'MAST', fullName: 'Mast Camera', supportedRovers: ['curiosity'] },
  { abbreviation: 'CHEMCAM', fullName: 'Chemistry and Camera Complex', supportedRovers: ['curiosity'] },
  { abbreviation: 'MAHLI', fullName: 'Mars Hand Lens Imager', supportedRovers: ['curiosity'] },
  { abbreviation: 'MARDI', fullName: 'Mars Descent Imager', supportedRovers: ['curiosity'] },
  { abbreviation: 'NAVCAM', fullName: 'Navigation Camera', supportedRovers: ['curiosity', 'opportunity', 'spirit'] },
  { abbreviation: 'PANCAM', fullName: 'Panoramic Camera', supportedRovers: ['opportunity', 'spirit'] },
  { abbreviation: 'MINITES', fullName: 'Miniature Thermal Emission Spectrometer (Mini-TES)', supportedRovers: ['opportunity', 'spirit'] },
];

interface RoverQueryParams {
  sol?: number;
  earth_date?: string; // YYYY-MM-DD
  camera?: CameraAbbreviation; 
  page?: number; 
  api_key: string; 
}

/**
 * @interface SolQueryParams
 * @version 2.2.2
 * @description Parameters to fetch Mars rover photos by sol (Martian day).
 * @property {number} sol - The Martian sol (e.g., 1000).
 * @property {CameraAbbreviation} [camera] - Abbreviation of the camera.
 * @property {number} [page] - Optional, defaults to 1. 25 items per page returned.
 * @property {string} api_key - NASA API key.
 */
export type SolQueryParams = Pick<RoverQueryParams, 'sol' | 'camera' | 'page' | 'api_key'>;

/**
 * @interface EarthDateQueryParams
 * @version 2.2.2
 * @description Parameters to fetch Mars rover photos by earth date.
 * @property {string} earth_date - The earth date of the rover (e.g., '2023-06-25').
 * @property {CameraAbbreviation} [camera] - Abbreviation of the camera.
 * @property {number} [page] -Optional, defaults to 1. 25 items per page returned.
 * @property {string} api_key - NASA API key.
 */
export type EarthDateQueryParams = Pick<RoverQueryParams, 'earth_date' | 'camera' | 'page' | 'api_key'>;

/**
 * @interface RoverInfo
 * @version 2.1.2
 * @description RoverInfo is the format for a rover.
 * @property {number} id - The id of the rover.
 * @property {Rover} name - The name of the rover.
 * @property {string} landing_date - The landing date of the rover.
 * @property {string} launch_date - The launch date of the rover.
 * @property {string} status - The status of the rover.
 */
export interface RoverInfo {
  id: number;
  name: Rover;
  landing_date: string; 
  launch_date: string;
  status: 'active' | 'complete';
}

/**
 * @interface MarsPhoto
 * @version 2.1.2
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
 * @version 2.1.2
 * @description MarsPhotoResponse is the response object for querying by Martian sol.
 * @property {Array<MarsPhoto>} photos - The list of Mars rover photos.
 */
export interface MarsPhotoResponse {
  photos: MarsPhoto[];
}


/**
 * @interface RoverManifest
 * @description The rover manifest object type returned from getMissionManifest.
 * @version 2.3.5
 * @property {string} name - The name of the rover. 
 * @property {string} landing_date - The landing date of the rover.
 * @property {string} launch_date - The launch date of the rover.
 * @property {string} status - The status of the rover.
 * @property {string} max_sol - The most recent Martian sol from which photos exist.
 * @property {string} max_date - The most recent Earth date from which photos exist.
 * @property {string} total_photos - The total number of photos taken by the rover.
 */
export interface RoverManifest {
  name: string;
  landing_date: string;
  launch_date: string;
  status: string;
  max_sol: number;
  max_date: string;
  total_photos: number;
}

const NASA_API_URL = 'https://api.nasa.gov';
const MARS_ROVER_API = `${NASA_API_URL}/mars-photos/api/v1`;
/**
 * @function getMarsRoverPhotosByMartianSol
 * @description Get Mars rover photos by Martian sol.
 * @async
 * @version 2.1.2
 * @param {SolQueryParams} params - The request parameters.
 * @returns {Promise<MarsPhotoResponse>}
 * @fulfill {MarsPhotoResponse} - The Mars rover photos.
 * @reject {Error} - The error object.
 * @example
 * const result = await getMarsRoverPhotosByMartianSol({
 *   sol: 1000,
 *   camera: 'FHAZ',
 *   page: 1,
 *   api_key: 'DEMO_KEY',
 * });
 */
export const getMarsRoverPhotosByMartianSol = async (params: SolQueryParams): Promise<MarsPhotoResponse> => {
  const query = buildQueryParams(params);
  const response = await axios.get<MarsPhotoResponse>(`${MARS_ROVER_API}/rovers/curiosity/photos?${query}`);
  return response.data;
}

/**
 * @function getMarsRoverPhotosByEarthDate
 * @description Get Mars rover photos by earth date.
 * @async
 * @version 2.2.2
 * @param {EarthDateQueryParams} params - The request parameters.
 * @returns {Promise<MarsPhotoResponse>}
 * @fulfill {MarsPhotoResponse} - The Mars rover photos.
 * @reject {Error} - The error object.
 * @example
 * const result = await getMarsRoverPhotosByEarthDate({
 *   earth_date: '2023-06-25',
 *   camera: 'FHAZ',
 *   page: 1,
 *   api_key: 'DEMO_KEY',
 * });
 */
export const getMarsRoverPhotosByEarthDate = async (params: EarthDateQueryParams): Promise<MarsPhotoResponse> => {
  const query = buildQueryParams(params);
  const response = await axios.get<MarsPhotoResponse>(`${MARS_ROVER_API}/rovers/curiosity/photos?${query}`);
  return response.data;
}

/**
 * @function getMissionManifest
 * @description A mission manifest is available for each Rover. This manifest will list details of the Rover's mission to help narrow down photo queries to the API. 
 * @async
 * @version 2.3.5 
 * @param {Rover} rover - The name of the rover. Curiosity, Opportunity or Spirit.
 * @returns {Promise<RoverManifest>}
 * @fulfill {RoverManifest} - The rover manifest.
 * @reject {Error} - The error object.
 * @example
 * const result = await getMissionManifest('curiosity', 'DEMO_KEY);
*/
export const getRoverMissionManifest = async (rover: Rover, api_key: string): Promise<RoverManifest> => {
  const URL = `${MARS_ROVER_API}/manifests/${rover}?api_key=${api_key}`;
  console.log('Logging URL: ' + URL);
  const response = await axios.get<RoverManifest>(URL);
  return response.data;
}