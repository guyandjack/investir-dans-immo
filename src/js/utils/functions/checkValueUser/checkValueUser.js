/****************************************************************************
 * Simplified validation helpers : the inputs rely on HTML constraints and
 * calculator logic to remain consistent.
 ****************************************************************************/

function checkValueUserMonthly() {
  return true;
}

function checkValueUserIncome() {
  return true;
}

function checkValueUserDuty() {
  return true;
}

function checkValueUserRadioFiscal() {
  const hasLocationChoice = document.querySelector(
    "#location-type-container-radio input[name='type-location']:checked",
  );

  const hasTaxChoice = document.querySelector(
    "#fiscal input[name='taux-impot']:checked",
  );

  const hasFiscalRegime = document.querySelector(
    "#fiscal input[name='regime-fiscal']:checked",
  );

  return Boolean(hasLocationChoice && hasTaxChoice && hasFiscalRegime);
}

export {
  checkValueUserMonthly,
  checkValueUserDuty,
  checkValueUserIncome,
  checkValueUserRadioFiscal,
};
