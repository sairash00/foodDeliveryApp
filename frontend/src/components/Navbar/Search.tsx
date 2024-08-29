import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { CheckLoggedIn } from "../../utils/AuthenticateFunctions";
import toast from "react-hot-toast";
import axios, { AxiosResponse } from "axios";

interface Props {
  handleShow: () => void;
}

interface Response {
  status: number;
  success: boolean;
  message: string;
}

const Search = ({ handleShow }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authDetails = await CheckLoggedIn({ admin: true });
        setIsAuthenticated(authDetails.isAuthenticated);
        setIsAdmin(authDetails.isAdmin);
      } catch (error) {
        if(error){
          setIsAuthenticated(false);
          setIsAdmin(false);
        }
      }
    };

    checkAuth();
  }, [navigate]);

  const logout = async (): Promise<void> => {
    setLoading(true);
    try {
      const response: AxiosResponse<Response> = await axios.get(
        import.meta.env.VITE_LOGOUT
      );
      if (response.status === 200 && response.data.success) {
        setLoading(false);
        toast.success(response.data.message || "User Logged Out");
        navigate("/login");
      }
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Couldn't log out");
        return;
      } else {
        toast.error("Couldn't log out");
        return;
      }
    }
  };

  return (
    <div className=" w-[100vw] backdrop-blur-[10px] h-[100vh] z-10 fixed bg-[#00000070] ">
      <div className=" w-full flex max-md:flex-col-reverse justify-between h-full">
        <div className=" w-[55%] md:h-full max-md:w-full "></div>
        <div className=" md:w-[40%] max-md:shadow-none h-full border-l border-[#ffffff50] overflow-hidden w-full">
          <div className="w-full border-b border-[#ffffff50] flex justify-end h-[10vh] px-[2rem] py-2  text-[#fff] text-4xl">
            <RxCross2
              onClick={handleShow}
              className="hover:text-[#e4e3e3] transition-all hover:scale-[1.2]  "
            />
          </div>
          <Link
            onClick={handleShow}
            to={"/products"}
            className=" text-[#fff]  text-2xl w-full flex justify-center hover:bg-[#FC4E03] border-b border-[#ffffff50] hover:text-[#fff] py-4 px-4 "
          >
            Home
          </Link>
          <Link
            onClick={handleShow}
            to={"/products"}
            className=" text-[#fff]  text-2xl w-full flex justify-center hover:bg-[#FC4E03] border-b border-[#ffffff50] hover:text-[#fff] py-4 px-4 "
          >
            Products
          </Link>
            <Link
              onClick={handleShow}
              to={"/dashboard/orders"}
              className=" text-[#fff]  text-2xl w-full flex justify-center hover:bg-[#FC4E03] border-b border-[#ffffff50] hover:text-[#fff] py-4 px-4 "
            >
              Orders
            </Link>

            <Link
              onClick={handleShow}
              to={"/dashboard/cart"}
              className=" text-[#fff]  text-2xl w-full flex justify-center hover:bg-[#FC4E03] border-b border-[#ffffff50] hover:text-[#fff] py-4 px-4  "
            >
              Cart
            </Link>
         
          {isAdmin ? (
            <Link
              onClick={handleShow}
              to={"/Admin"}
              className=" text-[#fff]  text-2xl w-full flex justify-center hover:bg-[#FC4E03] border-b border-[#ffffff50] hover:text-[#fff] py-4 px-4  "
            >
              Admin
            </Link>
          ) : (
            <></>
          )}
          {isAuthenticated ? (
            <div
              onClick={logout}
              className=" text-[#fff]  text-2xl w-full flex justify-center hover:bg-[#FC4E03] border-b border-[#ffffff50] hover:text-[#fff] py-4 px-4  "
            >
              {loading ? "Logging Out" : "Logout"}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
