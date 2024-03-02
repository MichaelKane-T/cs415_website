import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserView = () => {
  const navigate = useNavigate();
  const [columns, setColumns] = useState([
    "user_id",
    "first_name",
    "second_name",
    "pass_word",
    "recovery_key",
    "date_created",
    "email",
  ]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    if (!window.sessionStorage.getItem("auth")) navigate("/unauthorized");
    fetch(process.env.REACT_APP_API_URL_BASE + "/users")
      .then((res) => res.json())
      .then((data) => {
        setRecords(data.users);
      })
      .catch((error) => console.error(error));
  }, [navigate]);

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-center text-sm font-light p-2">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  {columns.map((c, i) => (
                    <th key={i} className="px-6 py-4 bg-slate-400">
                      {c.replaceAll("_", " ").toUpperCase()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {records.map((record, i) => (
                  <tr
                    key={i}
                    className={`border-b ${
                      i % 2 === 0
                        ? "bg-neutral-50"
                        : "bg-cyan-100 dark:bg-neutral-800"
                    } text-neutral-800 dark:text-neutral-50`}
                  >
                    {columns.map((key, j) => (
                      <td key={j} className="whitespace-nowrap px-6 py-4">
                        {key === "pass_word" || key === "recovery_key"
                          ? `******${record[key].slice(-2)}`
                          : record[key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserView;
