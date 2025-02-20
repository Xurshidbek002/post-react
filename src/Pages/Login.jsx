import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault(),
      axios({
        method: "POST",
        url: "https://realauto.limsa.uz/api/auth/signin",
        data: {
          phone_number: phone,
          password: password,
        },
      })
        .then((res) => {
          localStorage.setItem(
            "accessToken",
            res.data.data.tokens.accessToken.token
          );
          toast.success("Muvaffaqiyatli o'tildi!");
          navigate("/");
          navi;
        })
        .catch((err) => {
          console.log(err);
        });
  };
  return (
    <div>
      <div>
        <div className="flex justify-center items-center bg-[#9f9f9f] h-[100vh]">
          <div className="w-full max-w-xs">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Username"
                  autoComplete="current-username"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="*************"
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={login}
                >
                  Sign In
                </button>
                <a
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
