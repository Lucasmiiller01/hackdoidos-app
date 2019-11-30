export const types = {
  ASYNC_CREATE_REPORT: 'ASYNC_CREATE_REPORT'
}

export const createReport = values => ({ type: types.ASYNC_CREATE_REPORT, payload: values })
