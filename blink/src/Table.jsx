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
                    <button id = "like-button" type="button"> <img id = "like-icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Facebook_Like_button.svg/1024px-Facebook_Like_button.svg.png" width="20em"/></button>
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