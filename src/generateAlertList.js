import calculateBPRisk from "./utils/riskCalculations/calculateBPRisk.js";
import calculateTempRisk from "./utils/riskCalculations/calculateTemperatureRisk.js";
import calculateAgeRisk from "./utils/riskCalculations/calculateAgeRisk.js";
import {
  parseTemperature,
  parseBloodPressure,
  parseAge,
} from "./utils/parsing.js";

function hasdata_quality_issues(patient) {
  const invalidBP =
    parseBloodPressure(patient.blood_pressure).systolic === null ||
    parseBloodPressure(patient.blood_pressure).diastolic === null;
  const invalidTemperature = parseTemperature(patient.temperature) === null;
  const invalidAge = parseAge(patient.age) === null;

  return invalidBP || invalidTemperature || invalidAge;
}

function generateAlertList(patients) {
  const high_risk_patients = [];
  const fever_patients = [];
  const data_quality_issues = [];

  patients.forEach((patient) => {
    const bloodPressure = parseBloodPressure(patient.blood_pressure);
    const temperature = parseTemperature(patient.temperature);
    const age = parseAge(patient.age);

    if (hasdata_quality_issues(patient)) {
      data_quality_issues.push(patient.patient_id);
    }

    const bpScore = calculateBPRisk(
      bloodPressure.systolic,
      bloodPressure.diastolic
    );
    const tempScore = calculateTempRisk(temperature);
    const ageScore = calculateAgeRisk(age);

    const totalRisk = bpScore + tempScore + ageScore;

    if (totalRisk >= 4) {
      high_risk_patients.push(patient.patient_id);
    }

    if (temperature !== null && temperature >= 99.6) {
      fever_patients.push(patient.patient_id);
    }
  });

  return {
    high_risk_patients: high_risk_patients,
    fever_patients: fever_patients,
    data_quality_issues: data_quality_issues,
  };
}

export default generateAlertList;
