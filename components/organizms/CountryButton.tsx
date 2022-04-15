import { Button } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

type Props = {
  selectCountry: string;
  setSelectCountry: Dispatch<SetStateAction<string>>;
};

export default function CountryButton(props: Props) {
  const handleClick = (value: string) => {
    props.setSelectCountry(value);
  };

  return (
    <>
      <Button
        className="z-10 top-20 left-56 fixed"
        variant="outlined"
        size="small"
        onClick={() => handleClick("韓国")}
      >
        韓国
      </Button>
      <Button
        className="z-10 absolute top-44 left-48"
        variant="outlined"
        size="small"
        onClick={() => handleClick("台湾")}
      >
        台湾
      </Button>
      <Button
        className="z-10 absolute top-48 left-1"
        variant="outlined"
        size="small"
        onClick={() => handleClick("ミャンマー")}
      >
        ミャンマー
      </Button>
      <Button
        className="z-10 absolute top-60 left-10"
        variant="outlined"
        size="small"
        onClick={() => handleClick("タイ")}
      >
        タイ
      </Button>
      <Button
        className="z-10 top-64 left-28"
        variant="outlined"
        size="small"
        onClick={() => handleClick("ベトナム")}
      >
        ベトナム
      </Button>
      <Button
        className="z-10 absolute top-80 left-10"
        variant="outlined"
        size="small"
        onClick={() => handleClick("マレーシア")}
      >
        マレーシア
      </Button>
      <Button
        className="z-10 absolute bottom-24 left-12"
        variant="outlined"
        size="small"
        onClick={() => handleClick("シンガポール")}
      >
        シンガポール
      </Button>
      <Button
        className="z-10 absolute top-64 left-48"
        variant="outlined"
        size="small"
        onClick={() => handleClick("フィリピン")}
      >
        フィリピン
      </Button>
      <Button
        className="z-10 absolute bottom-16 left-44"
        variant="outlined"
        size="small"
        onClick={() => handleClick("インドネシア")}
      >
        インドネシア
      </Button>
    </>
  );
}
