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
  const [name, setName] = useState([]);
  const [lastName, setLastName] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [userAddress, setUserAddress] = useState([]);
  const [UserProfileBio, setUserProfileBio] = useState([]);
  const [modifiedDate, setModifiedDate] = useState([]);
  const user_id = window.sessionStorage.getItem("user_id");
  
  useEffect(() => {
    if (!window.sessionStorage.getItem("auth")) navigate("/unauthorized");
    fetch(process.env.REACT_APP_API_URL_BASE + "/users/"+user_id)
      .then((res) => res.json())
      .then((data) => {

        if (data.user ) {
          setName(data.user.first_name)
          setLastName(data.user.second_name)
              }
      })
        .catch((error) => console.error(error));

  },[navigate,user_id]);
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


  const UserCard = () => {
  
  
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
                    <h1 className="text-xl font-bold">{name} {lastName}</h1>
                    <p>{UserProfileBio}</p>
                    <div className="mt-6 flex flex-wrap gap-4 justify-center">
                      <a href="javascript:void(0)" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                        Update Info
                      </a>
                    </div>
                  </div>
                  <hr className="my-6 border-t border-gray-300" />
                  <div className="flex flex-col">
                    <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">Skills</span>
                    <ul>
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

      <button
            className="flex justify-center w-[200px] rounded-md font-medium my-6 mx-auto py-3 ring-1 ring-cyan-200 bg-blue-500 hover:bg-blue-300 hover:-translate-y-1 hover:scale-125 text-white hover:text-blue-700  px-4 hover:rounded transition ease-in-out delay-150 duration-300"
            onClick={handleLogout}
            key="logout-button"
          >
            Logout
          </button>
  
    
    </div>
  );
};

export default UserProfile;
