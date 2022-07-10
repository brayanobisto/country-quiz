import { setCountries, setQuestion } from './globalSlice'

export const getCountries = () => async (dispatch, getState) => {
  const response = await fetch('https://restcountries.com/v3.1/all')
  const data = await response.json()

  const countries = data.map(({ name, capital, flags }) => ({
    name: name.common,
    capital: capital ? capital[0] : "Doesn't have capital",
    flag: flags.svg,
  }))

  dispatch(setCountries(countries))
  dispatch(setQuestion())
}
