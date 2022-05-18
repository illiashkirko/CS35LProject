import react from "react";
import './index.css';


function handleClick() {   
  }

const Table = ({value}) => {
    return (
        <>
    <table id="messageTable" >
        <tbody>
            {value.map(value =>(
                
                <tr key={value[2]}>
                    <td>{value[0]}</td>
                    <td id="votingData">
                    <button id = "like-button" type="button" onClick={handleClick(value)}> <img id = "like-icon" alt="like button" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Facebook_Like_button.svg/1024px-Facebook_Like_button.svg.png" width="20em"/></button>
                    </td>
                    <td>
                        {value[1] == undefined ? 0: value[1] }
                    </td>
                </tr>
            ))}
            
            </tbody>
  
    </table>
    </>
    )
    
            }

     export default Table;