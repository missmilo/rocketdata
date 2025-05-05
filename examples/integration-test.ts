// examples/integration-test.ts
import { 
    getAstronomyPictureOfTheDay, 
    getMarsRoverPhotosByMartianSol, 
    getMarsRoverPhotosByEarthDate,
    getRoverMissionManifest
} from 'rocketdata';
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
    const roverData2 = await getMarsRoverPhotosByEarthDate({
      camera: 'FHAZ',
      earth_date: '2015-6-3',
      api_key: 'DEMO_KEY',
    })
    console.log('Integration test result:', roverData2);
    const roverManifest = await getRoverMissionManifest('curiosity', 'DEMO_KEY');
    console.log('Integration test result:', roverManifest);

  } catch (error) {
    console.error('Failed to fetch APOD:', error);
  }
})();
