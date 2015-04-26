CONSTANTS = {
  'NotLoggedInError': 'NotLoggedInError',
  'NotLoggedInErrorMsg': 'You are not logged in!',
  'KhatmaNameIsNotValidError': 'KhatmaNameIsNotValidError',
  'KhatmaNameIsNotValidErrorMsg': 'Khatma name is not valid',
  'KhatmaStartDateIsNotValidError': 'KhatmaStartDateIsNotValidError',
  'KhatmaStartDateIsNotValidErrorMsg': 'Khatma start date is not valid, should be like: 2015-04-20.',
  'KhatmaPeriodIsNotValidError': 'KhatmaPeriodIsNotValidError',
  'KhatmaPeriodIsNotValidErrorMsg': 'Khatma period is not valid, should be positive integer.',
  'PartIdIsNotValidError':  'PartIdIsNotValidError',
  'PartIdIsNotValidErrorMsg': 'Part id is not valid!',
  'DoneValueIsNotValidError': 'DoneValueIsNotValidError',
  'DoneValueIsNotValidErrorMsg': 'Done value is not valid!',
  'KhatmaIdIsNotValidError': 'KhatmaIdIsNotValidError',
  'KhatmaIdIsNotValidErrorMsg': 'Khatma id is not valid!',
  'KhatmaNotYoursCompletelyError': 'KhatmaNotYoursCompletelyError',
  'KhatmaNotYoursCompletelyErrorMsg': 'This khatma is not yours completely, you cannot delete it. Ask the admin to do so.',
  'KhatmaNotYoursError':  'KhatmaNotYoursError',
  'KhatmaNotYoursErrorMsg': 'Khatma is not yours!',
  'UnknownErrorMsg': 'Unknown error happened!'
};
getErrorMessage = function (error) {
  return CONSTANTS[error + 'Msg']
      ? CONSTANTS[error + 'Msg']
      : CONSTANTS['UnknownError'];
};