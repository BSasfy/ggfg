import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export function useFetch() {
  const apiKey = "AIzaSyDt8lur7UCIe5QA_WFlEZkMG0hm5cPJTsE";
  const spreadsheetId = "1n9Bp5-CfU7-U_B10s3nYq3WUfUbyV-UgdAgjFkJ-XlA";

  const { data } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () =>
      await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A:E?key=${apiKey}`,
      )
        .then((res) => res.json())
        .then((tempArray: string[][][]) => Object.values(tempArray)[2]),
  });

  return data;
}
