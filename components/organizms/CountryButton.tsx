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
        sx={{
          position: "absolute",
          zIndex: 1,
          top: "15%",
          left: "60%",
          border: 1,
          borderColor: "primary",
          ":hover": {
            color: "red",
            borderColor: "red",
          },
        }}
        size="small"
        onClick={() => handleClick("韓国")}
      >
        韓国
      </Button>
      <Button
        sx={{
          position: "absolute",
          zIndex: 1,
          top: "40%",
          left: "45%",
          ":hover": {
            color: "red",
            borderColor: "red",
          },
        }}
        variant="outlined"
        size="small"
        onClick={() => handleClick("台湾")}
      >
        台湾
      </Button>
      <Button
        sx={{
          position: "absolute",
          zIndex: 1,
          top: "45%",
          left: "1%",
          ":hover": {
            color: "red",
            borderColor: "red",
          },
        }}
        variant="outlined"
        size="small"
        onClick={() => handleClick("ミャンマー")}
      >
        ミャンマー
      </Button>
      <Button
        sx={{
          position: "absolute",
          zIndex: 1,
          top: "55%",
          left: "10%",
          ":hover": {
            color: "red",
            borderColor: "red",
          },
        }}
        variant="outlined"
        size="small"
        onClick={() => handleClick("タイ")}
      >
        タイ
      </Button>
      <Button
        sx={{
          position: "absolute",
          zIndex: 1,
          top: "50%",
          left: "28%",
          ":hover": {
            color: "red",
            borderColor: "red",
          },
        }}
        variant="outlined"
        size="small"
        onClick={() => handleClick("ベトナム")}
      >
        ベトナム
      </Button>
      <Button
        sx={{
          position: "absolute",
          zIndex: 1,
          top: "65%",
          left: "10%",
          ":hover": {
            color: "red",
            borderColor: "red",
          },
        }}
        variant="outlined"
        size="small"
        onClick={() => handleClick("マレーシア")}
      >
        マレーシア
      </Button>
      <Button
        sx={{
          position: "absolute",
          zIndex: 1,
          top: "73%",
          left: "12%",
          ":hover": {
            color: "red",
            borderColor: "red",
          },
        }}
        variant="outlined"
        size="small"
        onClick={() => handleClick("シンガポール")}
      >
        シンガポール
      </Button>
      <Button
        sx={{
          position: "absolute",
          zIndex: 1,
          top: "60%",
          left: "50%",
          ":hover": {
            color: "red",
            borderColor: "red",
          },
        }}
        variant="outlined"
        size="small"
        onClick={() => handleClick("フィリピン")}
      >
        フィリピン
      </Button>
      <Button
        sx={{
          position: "absolute",
          zIndex: 1,
          top: "85%",
          left: "40%",
          ":hover": {
            color: "red",
            borderColor: "red",
          },
        }}
        variant="outlined"
        size="small"
        onClick={() => handleClick("インドネシア")}
      >
        インドネシア
      </Button>
    </>
  );
}
