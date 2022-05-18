import react from "react";
import './index.css';
const Table = ({value}) => {
    return (
        <>
    <table id="messageTable" >
        <tbody>
            {value.map((valueM)=>(
                <tr key={valueM}>
                    <td>{valueM}</td>
                    <td id="votingData">
                    <button id = "like-button" type="button"> <img id = "like-icon" alt="like button" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Facebook_Like_button.svg/1024px-Facebook_Like_button.svg.png" width="20em"/></button>
                    </td>
                </tr>
            ))}
            
            </tbody>
  
    </table>
    </>
    )
    
            }

     export default Table;