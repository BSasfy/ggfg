import { useQuery } from "@tanstack/react-query";

export function useFetch() {
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY;
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

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
