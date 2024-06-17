import { useEffect, useState } from "preact/hooks";
import { MouseIcon } from "../icons/MouseIcon";
import type { URL } from "../types/api";
import { getUrlsFromApi } from "../services/urls";

const CustomTable = () => {
  const [urls, setUrls] = useState<URL[]>([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUrls() {
      setIsLoading(true);
      const responseUrl = await getUrlsFromApi() as URL[];
      setUrls(responseUrl);
      setIsLoading(false);
    }
    fetchUrls();
  }, []);

  return (
    <main class="flex justify-center m-5 p-4">
      {isLoading ? (
        <div
          class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        ></div>
      ) : (
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
      )}
    </main>
  );
};

export default CustomTable;
