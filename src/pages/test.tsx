import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useState } from "react";
import useSha256Encoder from "~/utils/sha256Encoder";

const Test: React.FC = () => {
  const string =
    "SpecialCodeAlphaRescue29930928:{discrodId}:{endTime}:{amount}";

  const [inputString, setInputString] = useState(string);
  const { encodedString, encodeString } = useSha256Encoder();

  const handleEncode = () => {
    encodeString(inputString);
  };

  console.log("string -> ", string, "encoded string -> ", encodedString);

  return <button onClick={handleEncode}>send encoded</button>;
};

export default Test;
