function calculateTemperatureRisk(temperature) {
 if (temperature === null) {
    return 0; 
  }

  if (temperature <= 99.5) {
    return 0; 
  } else if (temperature >= 99.6 && temperature <= 100.9) {
    return 1; 
  } else if (temperature >= 101.0) {
    return 2; 
  }
  
  return 0;
}

export default calculateTemperatureRisk;
