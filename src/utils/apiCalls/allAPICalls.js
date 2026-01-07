import { baseUrl, apiKey } from "../../constants.js";
import { delay } from "../apiCallDelay.js";

async function apiCall(url, options, amountOfRetries = 3){
    for (let attemptNumber = 1; attemptNumber <= amountOfRetries; attemptNumber++) {
        try{
            const res = await fetch(url, options);

            if(res.status === 429){
                await delay(2000);
            } else if (res.status === 500 || res.status === 503){
                await delay(1000);
            }

            if(!res.ok){
                throw new Error(`API call failed. Status: ${res.status}`);
            }

            return await res.json();

        } catch (error) {
            if (attemptNumber === amountOfRetries - 1) throw error;  else await delay(1000);
        }
    }
}

async function fetchPatients() {
    const patients = [];
    let page = 1;
    let hasMorePages = true;
    const options = {
        method: 'GET',
        headers: {
            'x-api-key': apiKey,
        }
    }

    while(hasMorePages){
        const patientsURL = `${baseUrl}/patients?page=${page}&limit=20`;
        const res = await apiCall(patientsURL, options);
        if (res && res.data) {
            patients.push(...res.data);
            hasMorePages = res.pagination?.hasNext || false;
            page++;

            // wait some time before next request to avoid hitting rate limits
            hasMorePages ? await delay(500) : null;
        } else {
            hasMorePages = false;
        }
    }
    return patients;
}

async function submitAssessment(results) {
    const submitAssessmentURL = `${baseUrl}/submit-assessment`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
        },
        body: JSON.stringify(results)
    }

    return await apiCall(submitAssessmentURL, options);
}

export { apiCall, fetchPatients, submitAssessment };