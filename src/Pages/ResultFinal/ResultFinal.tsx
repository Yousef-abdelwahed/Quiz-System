import "./ResultFinal.module.scss";
import { useTranslation } from "react-i18next";

const ResultFinal = () => {
  const { t, i18n } = useTranslation();
  return (
    <>
    <div className="p-5 rounded-lg  md:w-[50%] border-[#00000033] border-solid border-2">
    <div className="overflow-x-auto">
              <table className="min-w-full border text-center  text-sm font-light dark:border-neutral-500">
              <caption className="py-3 text-lg font-semibold text-left  text-gray-900 bg-white">
                  {t("Results")}
                </caption>
                <thead className="border-b   font-semibold bg-[#0D1321] text-white">
                  <tr>
                    <th
                      className="border-r px-2 py-2 dark:border-neutral-500"
                    >
                      {t("Student name")}
                    </th>
                    <th
                      scope="col"
                      className="border-r px-2 py-2 dark:border-neutral-500"
                    >
                      {t("Score")}
                    </th>
                    <th
                      scope="col"
                      className="border-r px-2 py-2 dark:border-neutral-500"
                    >
                      {t("Average")}
                    </th>
                    <th
                      scope="col"
                      className="border-r px-2 py-2 dark:border-neutral-500"
                    >
                      {t("Time submitted")}
                    </th>
                  </tr>
                </thead>
                <tbody>
               
                  <tr  className="border-b dark:border-neutral-500 ">
                    <td className="whitespace-nowrap border-r px-4  font-semibold dark:border-neutral-500">
                    Jacob Hamuel
                    </td>
                    <td className="whitespace-nowrap border-r px-4 py-2 font-semibold dark:border-neutral-500">
                    16
                    </td>
                    <td className="whitespace-nowrap border-r px-4 py-2 font-semibold dark:border-neutral-500">
                    20
                    </td>
                    <td className="whitespace-nowrap border-r px-4 py-2 font-semibold dark:border-neutral-500">
                    09 : 00
                    </td>
                  </tr>
                  <tr  className="border-b dark:border-neutral-500 ">
                    <td className="whitespace-nowrap border-r px-4  font-semibold dark:border-neutral-500">
                    Jacob Hamuel
                    </td>
                    <td className="whitespace-nowrap border-r px-4 py-2 font-semibold dark:border-neutral-500">
                    16
                    </td>
                    <td className="whitespace-nowrap border-r px-4 py-2 font-semibold dark:border-neutral-500">
                    20
                    </td>
                    <td className="whitespace-nowrap border-r px-4 py-2 font-semibold dark:border-neutral-500">
                    09 : 00
                    </td>
                  </tr>
                  <tr  className="border-b dark:border-neutral-500 ">
                    <td className="whitespace-nowrap border-r px-4  font-semibold dark:border-neutral-500">
                    Jacob Hamuel
                    </td>
                    <td className="whitespace-nowrap border-r px-4 py-2 font-semibold dark:border-neutral-500">
                    16
                    </td>
                    <td className="whitespace-nowrap border-r px-4 py-2 font-semibold dark:border-neutral-500">
                    20
                    </td>
                    <td className="whitespace-nowrap border-r px-4 py-2 font-semibold dark:border-neutral-500">
                    09 : 00
                    </td>
                  </tr>
                  <tr  className="border-b dark:border-neutral-500 ">
                    <td className="whitespace-nowrap border-r px-4  font-semibold dark:border-neutral-500">
                    Jacob Hamuel
                    </td>
                    <td className="whitespace-nowrap border-r px-4 py-2 font-semibold dark:border-neutral-500">
                    16
                    </td>
                    <td className="whitespace-nowrap border-r px-4 py-2 font-semibold dark:border-neutral-500">
                    20
                    </td>
                    <td className="whitespace-nowrap border-r px-4 py-2 font-semibold dark:border-neutral-500">
                    09 : 00
                    </td>
                  </tr>
                  <tr  className="border-b dark:border-neutral-500 ">
                    <td className="whitespace-nowrap border-r px-4  font-semibold dark:border-neutral-500">
                    Jacob Hamuel
                    </td>
                    <td className="whitespace-nowrap border-r px-4 py-2 font-semibold dark:border-neutral-500">
                    16
                    </td>
                    <td className="whitespace-nowrap border-r px-4 py-2 font-semibold dark:border-neutral-500">
                    20
                    </td>
                    <td className="whitespace-nowrap border-r px-4 py-2 font-semibold dark:border-neutral-500">
                    09 : 00
                    </td>
                  </tr>
                  <tr  className="border-b dark:border-neutral-500 ">
                    <td className="whitespace-nowrap border-r px-4  font-semibold dark:border-neutral-500">
                    Jacob Hamuel
                    </td>
                    <td className="whitespace-nowrap border-r px-4 py-2 font-semibold dark:border-neutral-500">
                    16
                    </td>
                    <td className="whitespace-nowrap border-r px-4 py-2 font-semibold dark:border-neutral-500">
                    20
                    </td>
                    <td className="whitespace-nowrap border-r px-4 py-2 font-semibold dark:border-neutral-500">
                    09 : 00
                    </td>
                  </tr>
                  <tr  className="border-b dark:border-neutral-500 ">
                    <td className="whitespace-nowrap border-r px-4  font-semibold dark:border-neutral-500">
                    Jacob Hamuel
                    </td>
                    <td className="whitespace-nowrap border-r px-4 py-2 font-semibold dark:border-neutral-500">
                    16
                    </td>
                    <td className="whitespace-nowrap border-r px-4 py-2 font-semibold dark:border-neutral-500">
                    20
                    </td>
                    <td className="whitespace-nowrap border-r px-4 py-2 font-semibold dark:border-neutral-500">
                    09 : 00
                    </td>
                  </tr>
                  <tr  className="border-b dark:border-neutral-500 ">
                    <td className="whitespace-nowrap border-r px-4  font-semibold dark:border-neutral-500">
                    Jacob Hamuel
                    </td>
                    <td className="whitespace-nowrap border-r px-4 py-2 font-semibold dark:border-neutral-500">
                    16
                    </td>
                    <td className="whitespace-nowrap border-r px-4 py-2 font-semibold dark:border-neutral-500">
                    20
                    </td>
                    <td className="whitespace-nowrap border-r px-4 py-2 font-semibold dark:border-neutral-500">
                    09 : 00
                    </td>
                  </tr>
                  <tr  className="border-b dark:border-neutral-500 ">
                    <td className="whitespace-nowrap border-r px-4  font-semibold dark:border-neutral-500">
                    Jacob Hamuel
                    </td>
                    <td className="whitespace-nowrap border-r px-4 py-2 font-semibold dark:border-neutral-500">
                    16
                    </td>
                    <td className="whitespace-nowrap border-r px-4 py-2 font-semibold dark:border-neutral-500">
                    20
                    </td>
                    <td className="whitespace-nowrap border-r px-4 py-2 font-semibold dark:border-neutral-500">
                    09 : 00
                    </td>
                  </tr>
                 
                </tbody>
              </table>
      </div>
      
    </div>
    </>
  );
};

export default ResultFinal;