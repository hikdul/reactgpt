import { typingLoaderProps } from '../../../intenfaces'
import './typingLoader.css'
 
 export const TypingLoader = ({className}: typingLoaderProps) => {
   return (
    <div className={`typing ${className}`}>
        <span className="circle scaling"></span>
        <span className="circle scaling"></span>
        <span className="circle scaling"></span>
    </div>
   )
 }
 