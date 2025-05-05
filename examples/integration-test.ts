// examples/integration-test.ts
import { getAstronomyPictureOfTheDay } from 'rocketdata';
(async () => {
  try {
    const data = await getAstronomyPictureOfTheDay({
      count: 1,
      api_key: 'DEMO_KEY',
    });
    console.log('Integration test result:', data);
  } catch (error) {
    console.error('Failed to fetch APOD:', error);
  }
})();
