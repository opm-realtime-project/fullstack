import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import axios from "axios";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Form() {
  const { theme, setCurrentTheme, currentTheme } = useContext(ThemeContext);
  const bgClassName = theme[currentTheme].bgColor;
  const textColor = theme[currentTheme].textColor;

  // console.log(setCurrentTheme);
  // console.log(currentTheme);
  // console.log(bgClassName);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChangeInput = (item) => {
    const { name, value } = item.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleFormLogin = async (item) => {
    item.preventDefault();
    try {
      const { data } = await axios({
        method: "post",
        url: "http://localhost:3000/login",
        data: input,
      });

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("user", data.user.username);

      navigate("/");

      swal.fire({
        title: "Success login",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);
      swal.fire({
        text: error.response.data.message,
        icon: "error",
        timer: 1000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div>
      {/* component */}
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
        integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm"
        crossOrigin="anonymous"
      />
      <div
        className={`min-h-screen flex flex-col items-center justify-center ${bgClassName}`}>
        <div
          className="
    flex flex-col
    bg-white
    shadow-md
    px-4
    sm:px-6
    md:px-8
    lg:px-10
    py-8
    rounded-3xl
    w-50
    max-w-md
  ">
          <div
            onClick={() => {
              setCurrentTheme(currentTheme === "dark" ? "light" : "dark");
            }}>
            <button
              type="button"
              className="hs-dark-mode-active:hidden hs-dark-mode group flex items-center text-gray-600 hover:text-blue-600 font-medium dark:text-gray-400 dark:hover:text-gray-500"
              data-hs-theme-click-value="dark">
              <svg
                className="flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            </button>
            <button
              type="button"
              className="hs-dark-mode-active:block hidden hs-dark-mode group items-center text-gray-600 hover:text-blue-600 font-medium dark:text-gray-400 dark:hover:text-gray-500"
              data-hs-theme-click-value="light">
              <svg
                className="flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round">
                <circle cx={12} cy={12} r={4} />
                <path d="M12 8a2 2 0 1 0 4 4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
            </button>
          </div>

          <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
            Welcome Back
          </div>
          <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
            Enter your credentials to access your account
          </div>
          <div className="mt-10">
            <form onSubmit={handleFormLogin}>
              <div className="flex flex-col mb-5">
                <label
                  htmlFor="email"
                  className="mb-1 text-xs tracking-wide text-gray-600">
                  E-Mail Address:
                </label>
                <div className="relative">
                  <div
                    className="
              inline-flex
              items-center
              justify-center
              absolute
              left-0
              top-0
              h-full
              w-10
              text-gray-400
            ">
                    <i className="fas fa-at text-blue-500" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className="
              text-sm
              placeholder-gray-500
              pl-10
              pr-4
              rounded-2xl
              border border-gray-400
              w-full
              py-2
              focus:outline-none focus:border-blue-400
            "
                    placeholder="Enter your email"
                    onChange={handleChangeInput}
                  />
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="password"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                  Password:
                </label>
                <div className="relative">
                  <div
                    className="
              inline-flex
              items-center
              justify-center
              absolute
              left-0
              top-0
              h-full
              w-10
              text-gray-400
            ">
                    <span>
                      <i className="fas fa-lock text-blue-500" />
                    </span>
                  </div>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    className="
              text-sm
              placeholder-gray-500
              pl-10
              pr-4
              rounded-2xl
              border border-gray-400
              w-full
              py-2
              focus:outline-none focus:border-blue-400
            "
                    placeholder="Enter your password"
                    onChange={handleChangeInput}
                  />
                </div>
              </div>
              <div className="flex w-full">
                <button
                  type="submit"
                  className="
            flex
            mt-2
            items-center
            justify-center
            focus:outline-none
            text-white text-sm
            sm:text-base
            bg-blue-500
            hover:bg-blue-600
            rounded-2xl
            py-2
            w-full
            transition
            duration-150
            ease-in
          ">
                  <span className="mr-2 uppercase">Sign In</span>
                  <span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex justify-center items-center mt-6">
          <a
            href="#"
            target="_blank"
            className="
      inline-flex
      items-center
      text-gray-700
      font-medium
      text-xs text-center
    ">
            <span className={`ml-2 ${textColor}`}>
              You don't have an account?
            </span>
          </a>
          <Link
            to={"/register"}
            href="#"
            className="text-xs ml-2 text-blue-500 font-semibold">
            Register now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Form;
