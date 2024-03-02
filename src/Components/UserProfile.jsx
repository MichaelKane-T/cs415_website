import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const [userColumns, setUserColumns] = useState([]);
  const [record, setRecord] = useState([]);
  const [addressColumns, setAddressColumns] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [phoneColumns, setPhoneColumns] = useState([]);
  const [phones, setPhones] = useState([]);
  const [infoColumns, setInfoColumns] = useState([]);
  const [info, setInfo] = useState([]);
  const [user, setUser] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [userAddress, setUserAddress] = useState([]);
  const [UserProfileBio, setUserProfileBio] = useState([]);
  const [modifiedDate, setModifiedDate] = useState([]);
  const user_id = window.sessionStorage.getItem("user_id");
  
  useEffect(() => {
    if (!window.sessionStorage.getItem("auth")) navigate("/unauthorized");
    fetch(process.env.REACT_APP_API_URL_BASE + "/users")
      .then((res) => res.json())
      .then((data) => {
        console.log("***********");
        console.log(data.users);
        console.log("***********");
      })
        .catch((error) => console.error(error));

  },[]);
  useEffect(() => {
    if (!window.sessionStorage.getItem("auth")) navigate("/unauthorized");

    fetch(process.env.REACT_APP_API_URL_BASE + "/users/user/" + user_id)
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUserColumns(Object.keys(data.user));
          setRecord(data.user);
        }

        if (data.info && data.info.length > 0) {
          // Access user_info_id from the first item in the info array
         
          setInfo(data.info);
          setUser(data.info[0].user)
          setUserInfo(data.info[0].user_info_id)
          setUserProfileBio(data.info[0].profile_bio)
          setModifiedDate(data.info[0].modified_date)

        }
      })
      .catch((error) => console.error(error));
  }, [navigate, user_id]);

  useEffect(() => {
    if (!window.sessionStorage.getItem("auth")) navigate("/unauthorized");

    fetch(process.env.REACT_APP_API_URL_BASE + "/addresses/user/" + user_id)
      .then((res) => res.json())
      .then((data) => {
        console.log("......................");
        console.log(data);
        console.log("......................");

        if (data.useraddress) {
          setAddressColumns(Object.keys(data.useraddress));
          setRecord(data.useraddress);

          
        }

        if (data.useraddress && data.useraddress.length > 0) {
          setAddressColumns(Object.keys(data.useraddress[0]));
          setAddresses(data.useraddress);
          console.log("+++++")
          console.log(Object.keys(data.useraddress[0]));
          console.log("+++++")
        }
      })
      .catch((error) => console.error(error));
  }, [navigate, user_id]);

  function handleLogout(e) {
    e.preventDefault();
    window.sessionStorage.removeItem("auth");
    window.sessionStorage.removeItem("user_id");
    window.sessionStorage.removeItem("token");
    navigate("/login");
  }

  const Card = ({ title, data }) => {
    return (
      <div className="max-w-[1240px] mx-auto h-full flex flex-col justify-center items-center relative z-10">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="flex grid-flow-row md:grid-flow-row lg:grid-flow-row gap-4">
          {data.map((item, i) => (
            <div
              key={`${title.toLowerCase()}-card-${i}`}
              className="bg-gradient-to-br from-lime-500 via-yellow-500 to-yellow-300 p-4 rounded-lg shadow-xl pl-3 hover:scale-105 duration-300 border border-green-400"
            >
              {Object.keys(item).map((key, j) => (
                <div
                  key={`${title.toLowerCase()}-card-${i}-${j}`}
                  className="mb-2"
                >
                  <p className="font-bold text-black">
                    {key.replaceAll("_", " ").toUpperCase()}
                  </p>
                  {/* Check if the value is an object or array, and handle it accordingly */}
                  {typeof item[key] === "object" ? (
                    // If it's an object or array, convert it to a string for display
                    <p className="text-black">{JSON.stringify(item[key])}</p>
                  ) : (
                    // If it's a primitive type, display it directly
                    <p className="text-black">{item[key]}</p>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };
  const UserCard = ({ title, data }) => {
  
  
    return (
      <div>
        <div className="bg-gray-100">
          <h1 className="text-2xl font-bold">{}</h1>
          <div className="container mx-auto py-8">
            <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
              <div className="col-span-4 sm:col-span-3">
                <div className="bg-white shadow rounded-lg p-6">
                  <div className="flex flex-col items-center">
                    <img
                      src="https://randomuser.me/api/portraits/men/94.jpg"
                      className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                      alt="User Profile"
                    />
                    <h1 className="text-xl font-bold">John Doe</h1>
                    <p className="text-gray-700">Software Developer</p>
                    <div className="mt-6 flex flex-wrap gap-4 justify-center">
                      <a href="javascript:void(0)" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                        Contact
                      </a>
                      <a href="javascript:void(0)" className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded">
                        Resume
                      </a>
                    </div>
                  </div>
                  <hr className="my-6 border-t border-gray-300" />
                  <div className="flex flex-col">
                    <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">Skills</span>
                    <ul>
                      <li className="mb-2">JavaScript</li>
                      <li className="mb-2">React</li>
                      <li className="mb-2">Node.js</li>
                      <li className="mb-2">HTML/CSS</li>
                      <li className="mb-2">Tailwind CSS</li>
                      <li className="mb-2">User ID: {userInfo}</li>
                      <li className="mb-2">User Address: {userInfo}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-span-4 sm:col-span-9">
                {/* ... rest of your code remains unchanged ... */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="text-black px-8 flex flex-col justify-between">
      <UserCard/>
  
      <div className="w-screen h-screen overflow-hidden relative">
        <div className="max-w-[1240px] mx-auto h-full flex flex-col justify-center items-center relative z-10">
          <div className="flex flex-col md:flex-row justify-items-end gap-4">
            <div className="flex row-span-1">
              <Card title="User Info" data={info} />
            </div>
            <div className="flex row-span-1">
              <Card title="Addresses" data={addresses} />
              {/* Add the button at the bottom */}
            </div>
            {/* <div className="col-span-1">
              <Card title="Phones" data={phones} />
            </div> */}
          </div>
          <button
            className="flex justify-center motion-safe:animate-bounce w-[200px] rounded-md font-medium my-6 mx-auto py-3 ring-1 ring-yellow-200 bg-lime-500 hover:bg-lime-300 hover:-translate-y-1 hover:scale-125 text-white hover:text-lime-700  px-4 hover:rounded transition ease-in-out delay-150 duration-300"
            onClick={handleLogout}
            key="logout-button"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
