import axios from 'axios';
import { getAstronomyPictureOfTheDay, ApodResponse } from '../index';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('getAstronomyPictureOfTheDay', () => {
  const mockSingleApod: ApodResponse = {
    date: '2025-05-04',
    explanation: 'Mock explanation.',
    media_type: 'image',
    service_version: 'v1',
    title: 'Mock Title',
    url: 'https://example.com/image.jpg',
    hdurl: 'https://example.com/hd.jpg',
  };

  it('fetches a single APOD successfully', async () => {
    mockAxios.get.mockResolvedValueOnce({ data: mockSingleApod });
    const result = await getAstronomyPictureOfTheDay({ date: '2025-05-04', api_key: 'TEST_KEY' });
    expect( mockAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('https://api.nasa.gov/planetary/apod?'),
    );
    expect(result).toEqual(mockSingleApod);
  });

  it('fetches multiple APODs when count is provided', async () => {
    const mockArray = [mockSingleApod, { ...mockSingleApod, date: '2025-05-03' }];
    mockAxios.get.mockResolvedValueOnce({ data: mockArray });
    const result = await getAstronomyPictureOfTheDay({ count: 2, api_key: 'TEST_KEY' });
    expect(Array.isArray(result)).toBe(true);
    expect((result as ApodResponse[]).length).toBe(2);
  });

  it('handles API failure gracefully', async () => {
    mockAxios.get.mockRejectedValueOnce(new Error('API failure'));
    await expect(
      getAstronomyPictureOfTheDay({ date: '2025-05-04', api_key: 'TEST_KEY' }),
    ).rejects.toThrow('API failure');
  });
});
