import axios from 'axios';
import { getAstronomyPictureOfTheDay, getMarsRoverPhotosByMartianSol, ApodResponse, MarsPhoto, RoverQueryParams } from '../index';


jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('getAstronomyPictureOfTheDay', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockSingleApod: ApodResponse = {
    date: '2025-05-04',
    explanation: 'Mock explanation.',
    media_type: 'image',
    service_version: 'v1',
    title: 'Mock Title',
    url: 'https://example.com/image.jpg',
    hdurl: 'https://example.com/hd.jpg',
  };
  const URL = 'https://api.nasa.gov/planetary/apod?date=2025-05-04&api_key=TEST_KEY';

  it('fetches a single APOD successfully', async () => {
    mockAxios.get.mockResolvedValue({ data: mockSingleApod });
    const result = await getAstronomyPictureOfTheDay({ date: '2025-05-04', api_key: 'TEST_KEY' });
    expect( mockAxios.get).toHaveBeenCalledWith(
      expect.stringContaining(URL),
    );
    expect(result).toEqual(mockSingleApod);
  });

  it('fetches multiple APODs when count is provided', async () => {
    const mockArray = [mockSingleApod, { ...mockSingleApod, date: '2025-05-03' }];
    mockAxios.get.mockResolvedValue({ data: mockArray });
    const result = await getAstronomyPictureOfTheDay({ count: 2, api_key: 'TEST_KEY' });
    expect(Array.isArray(result)).toBe(true);
    expect((result as ApodResponse[]).length).toBe(2);
  });

  it('handles API failure gracefully', async () => {
    mockAxios.get.mockRejectedValue(new Error('API failure'));
    await expect(
      getAstronomyPictureOfTheDay({ date: '2025-05-04', api_key: 'TEST_KEY' }),
    ).rejects.toThrow('API failure');
  });
});

describe('getMarsRoverPhotosByMartianSol', () => {
  const mockMarsPhoto: MarsPhoto = {
    id: 1,
    sol: 1000,
    img_src: 'source',
    earth_date: '2025-05-04',
    camera: {
      abbreviation: 'FHAZ',
      fullName: 'Front Hazard Avoidance Camera',
      supportedRovers: ['Curiosity', 'Opportunity', 'Spirit'],
    },
    rover: {
      id: 1,
      name: 'Curiosity',
      landing_date: '2025-05-04',
      launch_date: '2025-05-04',
      status: 'active',
    }
  }
  const URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?camera=FHAZ&sol=1000&api_key=DEMO_KEY`;
  it('fetches Mars Rover photos successfully', async () => {
    mockAxios.get.mockResolvedValueOnce({ data: mockMarsPhoto });
    const params: RoverQueryParams = {
      camera: 'FHAZ',
      sol: 1000,
      api_key: 'DEMO_KEY',
    }
    const result = await getMarsRoverPhotosByMartianSol(params);
    expect( mockAxios.get).toHaveBeenCalledWith(
      expect.stringContaining(URL)
    )
    expect(result).toEqual(mockMarsPhoto);
  });
});