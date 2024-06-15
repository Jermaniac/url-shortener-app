import { MouseIcon } from "../icons/MouseIcon";
import type { URL } from "../types/api";

interface CustomTableProps {
  urls: URL[];
}

const CustomTable = ({ urls }: CustomTableProps) => {
  return (
    <main class="flex justify-center m-5 p-4">
      <table class="border table-fixed w-full max-w-2xl font-semibold">
        <thead class="text-xl bg-pink-900">
          <tr>
            <th>URL</th>
            <th>TIMES VISITED</th>
            <th></th>
          </tr>
        </thead>
        <tbody class="[&_tr:nth-child(odd)]:bg-pink-600 text-center">
          {urls &&
            urls.map((item: URL) => (
              <tr>
                <td class="truncate" id="truncatedText">
                  {item.long_url}
                </td>
                <td>{item.visits}</td>
                <td class="flex items-center justify-center m-1.5">
                  <a
                    href={`${import.meta.env.PUBLIC_VITE_BACKEND_URI}/${
                      item.short_url
                    }`}
                    target="_blank"
                  >
                    <MouseIcon />
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </main>
  );
};

export default CustomTable;
