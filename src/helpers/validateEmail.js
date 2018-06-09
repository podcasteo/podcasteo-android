import get from 'lodash/get'

export default function (email) {
  if (get(email, 'length', 0) < 2) {
    return false
  }

  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) { //eslint-disable-line
    return true
  }

  return false
}
