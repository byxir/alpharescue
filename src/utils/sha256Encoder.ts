import { useState, useEffect, useCallback } from "react";
import { sha256 } from "js-sha256";

function useSha256Encoder() {
  const [encodedString, setEncodedString] = useState<string>("");

  const encodeString = useCallback((inputString: string) => {
    if (inputString) {
      const hash = sha256(inputString);
      setEncodedString(hash);
      return hash;
    }
    return "false";
  }, []);

  return { encodeString };
}

export default useSha256Encoder;
