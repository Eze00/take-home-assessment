function calculateAgeRisk(age) {
  if (age === null) {
    return 0;
  }

  if (age < 40) {
    return 0;
  } else if (age >= 40 && age <= 65) {
    return 1;
  } else if (age > 65) {
    return 2;
  }

  return 0;
}

export default calculateAgeRisk;
