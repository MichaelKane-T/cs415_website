import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {
    const navigate = useNavigate();
    const [rememberMe, setRememberMe] = useState(false);
    const [formData, setFormData] = useState({
      email: "",
      password: "",
      error: "",
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      setFormData({ ...formData, error: null });
      let success = true
      const payload = JSON.stringify({
        email: formData.email,
        password: formData.password,
      })
      
        fetch(process.env.REACT_APP_API_URL_BASE +'/login/', {
            method: 'POST',
            body: payload,
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((res) => {
              if (!res.ok) {
                return res.text().then((text) => {
                  console.error(`Error: ${res.status} - ${text}`);
                  return Promise.reject(text);
                });
              }
              return res.json();
            })
            .then((data) => {
              if (!success) {
                let errorText = '';
                for (const err in data.errors) {
                  for (const msg in data.errors[err]) {
                    errorText += data.errors[err][msg];
                  }
                }
                console.log(errorText);
                setFormData({
                  ...formData,
                  error: errorText,
                });
              } else {
                if (data.success) {
                  window.sessionStorage.setItem('auth', true);
                  window.sessionStorage.setItem('user_id', data.user_id);
                  window.sessionStorage.setItem('token', data.token);
                  navigate('/UserProfile');
                  console.log("you almost there");
                }
              }
            })
            .catch((error) => {
              console.error(error);
              setFormData({
                ...formData,
                error: 'Error connecting to the server',
              });
            });
    }
  
  return (
    <div className="text-white px-8">

        {/* Content container */}
        <div className="max-w-[1240px] mx-auto h-full flex flex-col justify-center items-center relative z-10">
          {/* Welcome heading */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white shadow-xl border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 ">
              <form className="space-y-6" action="#">
                <h3 className="text-xl font-medium text-[#67c1f9] ">Sign In </h3>
                <div>
                  <label
                    for="email"
                    className="text-sm font-medium text-[#67c1f9]  block mb-2 "
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="bg-gray-50 border border-gray-300 text-[#9bd2f4] sm:text-sm rounded-lg focus:ring-[#4c99e7] focus:border-[#46b3f6] block w-full p-2.5 "
                    placeholder="name@company.com"
                    required={true}
                  />
                </div>
                <div>
                  <label
                    for="password"
                    className="text-sm font-medium text-[#67c1f9] block mb-2 "
                  >
                    Your password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-[#4c99e7] sm:text-sm rounded-lg focus:ring-[#4c99e7] focus:border-[#46b3f6] block w-full p-2.5  "
                    required={true}
                  />
                </div>
                <div className="flex items-start">
                  <div className="flex items-start">
                   
                    <div className="text-sm ml-3">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                        className="bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-[#4c99e7] h-4 w-4 rounded"
                        required={true}
                      />
                    </div>
                  </div>
                  <a
                    href={"/register"}
                    className="text-sm text-[#4c99e7] hover:underline ml-auto"
                  >
                    Lost Password?
                  </a>
                </div>
                <button
                  onClick={handleSubmit}
                  className="w-full text-white bg-[#46b3f6] hover:bg-[#9bd2f4] hover:text-[#6593ef]  focus:ring-4 focus:ring-[#4c99e7] font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Login to your account
                </button>
                <div className="text-sm font-medium text-bg-[#32bb7f] ">
                  Not registered?{" "}
                  <a
                    href={"/register"}
                    className="text-[#4c99e7] hover:underline "
                  >
                    Create account
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
     
    </div>
  );
};

export default LoginForm;
