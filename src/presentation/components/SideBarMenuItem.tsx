import { NavLink } from "react-router-dom"
import { menuRoutesProps } from "../../intenfaces"

export const SideBarMenuItem = ({to, title, icon, description}:menuRoutesProps) => {
  return (
                <NavLink
                key={to}
                to={to}
                className={({isActive})=> isActive 
                            ? 'flex justify-center bg-gray-800 rounded-md p-3 transition-colors' 
                            : 'flex justify-center hover:bg-gray-900 rounded-md p-3 transition-colors'}
                >
                    <i className={`${icon} text-2xl mr-4 text-indigo-400`}></i>
                    <div className="flex flex-col flex-grow">
                        <span className="text-white text-lg font-semibold">
                            {title}
                        </span>
                        <span className="text-gray-400 text-sm">
                            {description}
                        </span>
                        
                    </div>
                </NavLink>
  )
}
