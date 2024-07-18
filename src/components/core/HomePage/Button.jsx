
import React from "react";
import { Link } from "react-router-dom";
//children h button k ander ka text
//active basically color btayega 
//linkto path btayega ki kaha jana button p click krke

const CTAButton = ({ children, active, linkto }) => {
    return (
        <Link to={linkto}>
            <div className={`text-center font-bold text-[13px] px-6 py-3 rounded-lg transition-all duration-200 hover:scale-95
             ${active?"bg-yellow-50 text-black border-r border-b border-white  ":"bg-richblack-800 text-white border-r border-b border-richblack-300 "}
             `}>{children}</div>
        </Link>
    );
}

export default CTAButton;
