import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useData } from "../../context/DatabaseContext";
import EditScheduleModal from "../Modal";
import useAdmin from "../../hooks/useAdmin";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Schedule({ data, special, title, studentFromShohor }) {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);

  let { deleteSchedule } = useData();
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <h1>{title}</h1>
      <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              {special ? (
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Day
                </th>
              ) : (
                ""
              )}
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Trip Name
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Departure time
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Stopage
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Bus No.
              </th>
              {isAdmin ? (
                <>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Edit
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Delete
                  </th>
                </>
              ) : (
                ""
              )}
            </tr>
          </thead>
          <tbody>
            {data?.map((item, idx) => (
              <tr key={idx}>
                {special ? (
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-600 whitespace-no-wrap">
                      <span className=" capitalize"> {item.day}</span>
                    </p>
                  </td>
                ) : (
                  ""
                )}
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-600 whitespace-no-wrap">
                    <span className=" capitalize"> {item.busType}</span>
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {item.schedule}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-600 whitespace-no-wrap">
                    {item.stopage.map((stopage) => (
                      <h1 className="bg-fuchsia-100 rounded-3xl mt-1 w-32">
                        {stopage}
                      </h1>
                    ))}
                  </p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                    />
                    <p className="text-gray-600 whitespace-no-wrap">
                      {item.busNumber}
                    </p>
                  </span>
                </td>
                {isAdmin ? (
                  <>
                    {" "}
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button
                        onClick={() => openModal()}
                        className="text-lime-600 whitespace-no-wrap"
                      >
                        <PencilSquareIcon className="w-6" />
                      </button>

                      <EditScheduleModal
                        isOpen={isOpen}
                        data={item}
                        closeModal={closeModal}
                      />
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button
                        onClick={() => deleteSchedule(item.id)}
                        className="text-red-600 whitespace-no-wrap"
                      >
                        <TrashIcon className="w-6" />
                      </button>
                    </td>
                  </>
                ) : (
                  ""
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
