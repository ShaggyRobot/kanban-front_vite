import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

function LangControl(): JSX.Element {
  const [lang, setLang] = useState(localStorage.getItem('i18nextLng') || '');
  const { i18n } = useTranslation();

  const changeHandler = (e: SelectChangeEvent) => {
    setLang(e.target.value);
    i18n.changeLanguage(e.target.value);
  };

  return (
    <FormControl size="small" margin="dense" sx={{ alignItems: 'center' }}>
      <InputLabel id="lang-select">
        <LanguageIcon />
      </InputLabel>

      <Select
        labelId="lang-select"
        id="lang-select"
        value={lang}
        sx={{ alignItems: 'center' }}
        label="----"
        autoWidth={true}
        onChange={changeHandler}
      >
        <MenuItem value="en">en</MenuItem>
        <MenuItem value="ru">ru</MenuItem>
      </Select>
    </FormControl>
  );
}
export { LangControl };
