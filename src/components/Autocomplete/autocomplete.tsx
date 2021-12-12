import {
  Autocomplete as MuiAutocomplete,
  Checkbox,
  createFilterOptions,
  TextField
} from '@mui/material'
import {
  FC,
  SyntheticEvent
} from 'react'

type AutocompleteOpts = {
  label: string
  placeholder?: string
  options: string[]
  onChange: (
    event: SyntheticEvent<Element, Event>,
    value: string[]) => void
}

const normalize = (text: string) => text.normalize('NFD').replace(/\W/g, '')

const Autocomplete: FC<AutocompleteOpts> = ({ label, placeholder, options, onChange }) => {
  const _options = Array.from(new Set(options))
    .filter(opt => opt != null)
    .map(opt => opt.toLowerCase())
    .sort((a, b) => a === b ? 0 : a > b ? 1 : -1)

  const filterOptions = createFilterOptions({
    limit: 10,
    ignoreAccents: true,
    trim: true,
    ignoreCase: true,
    matchFrom: 'any',
    stringify: (option:string) => option
  })

  return (
    <MuiAutocomplete
      onChange={onChange}
      id={normalize(label)}
      fullWidth
      multiple
      options={_options}
      filterOptions={filterOptions}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox checked={selected} />
          {option}
        </li>
      )}
      renderInput={ params => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
        />
      )}
    />
  )
}

export default Autocomplete
