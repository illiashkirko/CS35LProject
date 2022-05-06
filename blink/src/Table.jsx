import react from "react";
import './index.css';
const Table = ({value}) => {
    return (
        <>
    <table className="messages" >
        <tbody>
            <tr>
            <th></th>
            <th></th>
            <th></th>
            </tr>
            
            {value.map((valueM)=>(
                <tr key={valueM}>
                    <td>{valueM}</td>
                    <td>
                    <button type="button"> <img src="https://upload.wikimedia.org/wikipedia/commons/2/23/Facebook_Like_button.svg" height ="10" width="10" /></button>
                    </td>
                    <td></td>
  
                </tr>
  
            ))}
            
            </tbody>
  
    </table>
    </>
    )
    
            }

     export default Table;