import "dotenv/config";
import {
  fetchPatients,
  submitAssessment,
} from "./utils/apiCalls/allAPICalls.js";
import { baseUrl, apiKey } from "./constants.js";
import generateAlertList from "./generateAlertList.js";

async function main() {
  try {
    const patients = await fetchPatients(baseUrl, apiKey);
    const submissionResponse = await submitAssessment(
      generateAlertList(patients)
    );

    return submissionResponse;
  } catch (error) {
    console.error("Caught error interracting with API:", error);
    throw error;
  }
}

main();
