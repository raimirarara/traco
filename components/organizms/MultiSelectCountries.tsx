import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const countries = [
  {
    value: "韓国",
  },
  {
    value: "台湾",
  },
  {
    value: "ミャンマー",
  },
  {
    value: "タイ",
  },
  {
    value: "ベトナム",
  },
  {
    value: "フィリピン",
  },
  {
    value: "マレーシア",
  },
  {
    value: "シンガポール",
  },
  {
    value: "インドネシア",
  },
];

type Props = {
  selectCountries: string[];
  setSelectCountries: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function MultiSelectCountries(props: Props) {
  const handleChange = (
    event: SelectChangeEvent<typeof props.selectCountries>
  ) => {
    const {
      target: { value },
    } = event;
    props.setSelectCountries(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  React.useEffect(() => {
    console.log(props.selectCountries);
  }, [props.selectCountries]);

  return (
    <div className={"flex justify-center mt-16"}>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">countries</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={props.selectCountries}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {countries.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
