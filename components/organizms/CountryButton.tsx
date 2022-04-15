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
        className="z-10 absolute top-28 left-96"
        variant="outlined"
        size="small"
        onClick={() => handleClick("韓国")}
      >
        韓国
      </Button>
      <Button
        className="z-10 absolute top-64 left-80"
        variant="outlined"
        size="small"
        onClick={() => handleClick("台湾")}
      >
        台湾
      </Button>
      <Button
        className="z-10 absolute top-72 left-5"
        variant="outlined"
        size="small"
        onClick={() => handleClick("ミャンマー")}
      >
        ミャンマー
      </Button>
      <Button
        className="z-10 absolute bottom-80 left-40"
        variant="outlined"
        size="small"
        onClick={() => handleClick("ベトナム")}
      >
        ベトナム
      </Button>
      <Button
        className="z-10 absolute bottom-80 left-20"
        variant="outlined"
        size="small"
        onClick={() => handleClick("タイ")}
      >
        タイ
      </Button>
      <Button
        className="z-10 absolute bottom-48 left-20"
        variant="outlined"
        size="small"
        onClick={() => handleClick("マレーシア")}
      >
        マレーシア
      </Button>
      <Button
        className="z-10 absolute bottom-40 left-24"
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
        className="z-10 absolute bottom-20 left-56"
        variant="outlined"
        size="small"
        onClick={() => handleClick("インドネシア")}
      >
        インドネシア
      </Button>
    </>
  );
}
