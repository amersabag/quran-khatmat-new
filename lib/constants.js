CONSTANTS = {
  'NotLoggedInError': 'NotLoggedInError',
  'NotLoggedInErrorMsg': 'You are not logged in!',
  'KhatmaNameIsNotValidError': 'KhatmaNameIsNotValidError',
  'KhatmaNameIsNotValidErrorMsg': 'Khatma name is not valid',
  'KhatmaStartDateIsNotValidError': 'KhatmaStartDateIsNotValidError',
  'KhatmaStartDateIsNotValidErrorMsg': 'Khatma start date is not valid, should be like: 2015-04-20.',
  'KhatmaPeriodIsNotValidError': 'KhatmaPeriodIsNotValidError',
  'KhatmaPeriodIsNotValidErrorMsg': 'Khatma period is not valid, should be positive integer.',
  'UnknownErrorMsg': 'Unknown error happened!'
};
function getErrorMessage(error) {
  return CONSTANTS[error + 'Msg']
      ? CONSTANTS[error + 'Msg']
      : CONSTANTS['UnknownError'];
}