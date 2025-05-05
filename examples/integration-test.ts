// examples/integration-test.ts
import { getAstronomyPictureOfTheDay, getMarsRoverPhotosByMartianSol, getMarsRoverPhotosByEarthDate } from 'rocketdata';
(async () => {
  try {
    const data = await getAstronomyPictureOfTheDay({
      count: 1,
      api_key: 'DEMO_KEY',
    });
    console.log('Integration test result:', data);
    const roverData = await getMarsRoverPhotosByMartianSol({
      camera: 'FHAZ',
      sol: 1000,
      api_key: 'DEMO_KEY',
    })
    console.log('Integration test result:', roverData);
  } catch (error) {
    console.error('Failed to fetch APOD:', error);
  }
})();
