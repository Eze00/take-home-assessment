
function calculateBPRisk(systolic, diastolic) {

  if (systolic === null || diastolic === null) {
    return 0;;
  }

  let systolicScore = 0;
  if (systolic < 120) {
    systolicScore = 0;
  } else if (systolic >= 120 && systolic <= 129) {
    systolicScore = 1;
  } else if (systolic >= 130 && systolic <= 139) {
    systolicScore = 2;
  } else if (systolic >= 140) {
    systolicScore = 3;
  }

  let diastolicScore = 0;
  if (diastolic < 80) {
    diastolicScore = 0;
  } else if (diastolic >= 80 && diastolic <= 89) {
    diastolicScore = 2;
  } else if (diastolic >= 90) {
    diastolicScore = 3;
  }

  return Math.max(systolicScore, diastolicScore);
}

export default calculateBPRisk;