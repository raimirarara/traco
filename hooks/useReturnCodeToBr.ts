import HTMLReactParser from "html-react-parser";

export default function useReturnCodeToBr(
  text: string
): string | JSX.Element | JSX.Element[] {
  if (text === "") {
    return text;
  } else {
    return HTMLReactParser(text.replace(/\r?\n/g, "<br>"));
  }
}
