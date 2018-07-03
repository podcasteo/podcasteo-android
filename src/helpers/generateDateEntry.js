const months = {
  Jan: 'Janvier',
  Feb: 'Février',
  Mar: 'Mars',
  Apr: 'Avril',
  May: 'Mai',
  Jun: 'Juin',
  Jul: 'Juillet',
  Aug: 'Août',
  Sep: 'Septembre',
  Oct: 'Octobre',
  Nov: 'Novembre',
  Dec: 'Décembre',
}

export default function generateDateEntry(date) {
  const values = date.toString().split(' ')

  return `${months[values[1]]} ${values[3]}`
}
