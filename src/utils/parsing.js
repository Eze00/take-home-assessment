function parseBloodPressure(bloodPressure) {
  if (!bloodPressure || typeof bloodPressure !== "string") {
    return { systolic: null, diastolic: null };
  }

  const parts = bloodPressure.split("/");
  if (parts.length !== 2) {
    return { systolic: null, diastolic: null };
  }
  const systolic = parseInt(parts[0]);
  const diastolic = parseInt(parts[1]);

  if (isNaN(systolic) || isNaN(diastolic)) {
    return { systolic: null, diastolic: null };
  }

  return { systolic, diastolic };
}

function parseTemperature(temperature) {
    if (typeof temperature === 'number') {
    return isNaN(temperature) ? null : temperature;
  }
//   console.log('temp is not a number');
  return null;
}

function parseAge(age) {
    if (typeof age === 'number') {
    return isNaN(age) ? null : age;
  }
//   console.log('age is not a number');
  return null;
}

export { parseBloodPressure, parseTemperature, parseAge };
