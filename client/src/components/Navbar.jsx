import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <>
      <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full">
        <div className="mb-2 sm:mb-0">
          <span className="text-2xl no-underline text-grey-darkest hover:text-blue-dark">
            Home
          </span>
        </div>
        <div>
          <button
            onClick={() => {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("user");
              navigate("/login");
            }}
            className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
