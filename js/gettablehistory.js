import { addInner } from "https://jscroot.github.io/element/croot.js";

export const URLGetDevice = "https://asia-southeast2-urse-project.cloudfunctions.net/urse-gethistory";

export const tableDevice = `
<tr>
    <td>
        <div
            class="inline-flex items-center h-6 px-3 text-label-md text-pink-700 dark:text-pink-200 bg-pink-100 dark:bg-opacity-20 rounded-full">
            #NAME#
        </div>
    </td>
    <td>
        <div
            class="inline-flex items-center h-6 px-3 text-label-md text-pink-700 dark:text-pink-200 bg-pink-100 dark:bg-opacity-20 rounded-full">
            #PAYLOAD#
        </div>
    </td>
    <td>
        <div
            class="inline-flex items-center h-6 px-3 text-label-md text-pink-700 dark:text-pink-200 bg-pink-100 dark:bg-opacity-20 rounded-full">
            #CREATED#
        </div>
    </td>
</tr>
`;

export function responseData(results) {
  console.log(results);
  results.data.forEach(isiTable);
}

export function isiTable(value) {
  const content = tableDevice
    .replace(/#PAYLOAD#/g, value.payload)
    .replace(/#NAME#/g, value.name)
    .replace(/#CREATED#/g, value.created_at);
  addInner("history", content);
}