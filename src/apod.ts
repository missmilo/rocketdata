import axios from 'axios';
import { buildQueryParams } from './util';

/**
 * @interface ApodResponse
 * @version 2.0.2
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
 * @version 2.0.2
 * @description The request parameters for getAstronomyPictureOfTheDay.
 * @property {string} [date] - Optional, date of the APOD.
 * @property {string} [start_date] - Optional, start date of the APOD.
 * @property {string} [end_date] - Optional, end date of the APOD.
 * @property {number} [count] - Optional, number of APODs to return.
 * @property {boolean} [thumbs] - Optional, whether to return thumbnails.
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

const NASA_API_URL = 'https://api.nasa.gov';
const APOD_API = `${NASA_API_URL}/planetary/apod`;

/**
 * @function getAstronomyPictureOfTheDay
 * @version 2.0.2
 * @param {ApodRequestParams} params - The request parameters.
 * @returns {Promise<ApodResponse>} 
 * @fulfill {ApodResponse} - The astronomy picture of the day.
 * @reject {Error} - The error object.
 * @description getAstronomyPictureOfTheDay is a function that returns the Astronomy Picture of the Day from NASA's API.
 * @example
 * const result = await getAstronomyPictureOfTheDay({
 *   date: '2023-06-25',
 *   start_date: '2023-06-20',
 *   end_date: '2023-06-25',
 *   count: 5,
 *   thumbs: true,
 *   api_key: 'DEMO_KEY',
 * });
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

