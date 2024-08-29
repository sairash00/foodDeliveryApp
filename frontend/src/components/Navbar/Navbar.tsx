import { IoCartOutline} from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import Search from "./Search";
import { useState, useEffect } from "react";
import { CheckLoggedIn } from "../../utils/AuthenticateFunctions";


const Navbar = () => {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authDetails = await CheckLoggedIn({ admin: false});
        setIsAuthenticated(authDetails.isAuthenticated)

      } catch (error) {
        setIsAuthenticated(false);
        if(error)  {
          setIsAuthenticated(false)
        }
      }
    };

    checkAuth();
  }, [navigate]);

    const [show, setShow] = useState<boolean>(false)

    const handleShow = ():void => {
        setShow(!show)
    }

  return (
    <>
        {show ? <Search handleShow = {handleShow} /> : <></>}
        <nav className="flex px-[6rem] w-[100vw] sticky top-0 bg-[#f5f5f5b2] backdrop-blur-[50px] border-b max-md:px-[4rem] h-[10vh] max-xs:px-[1rem] py-4 justify-between items-center  " >
            <Link to={"/products"} className=" text-3xl font-bold text-[#FC4E03] " >Yumm !</Link>
            <ul className="flex gap-10 items-center " >
                {/* <li onClick={handleShow} className="text-xl max-md:hidden hover:text-[gray] hover:scale-[1.2] transition-all font-semibold " ><IoSearch/></li> */}
                {isAuthenticated ? <li className="text-xl max-md:hidden hover:text-[gray] hover:scale-[1.2] transition-all font-semibold " > <Link to={"/dashboard/cart"} ><IoCartOutline/></Link> </li> : <></> }
                {isAuthenticated ?<></> :<li className="text-sm  max-md:hidden hover:text-[gray] transition-all font-semibold " > <Link to={"/login"} >Login/Register</Link> </li>}
                <li onClick={handleShow} className="text-2xl hover:text-[gray] hover:scale-[1.2] transition-all font-semibold " ><RxHamburgerMenu/></li>
            </ul>
        </nav>
        
    </>
  )
}

export default Navbar