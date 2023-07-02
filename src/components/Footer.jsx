import React from 'react';
import Select from 'react-select';
import { themeOptions } from '../Utils/themeOptions';
import { useTheme } from '../Context/ThemeContext';
import RefreshIcon from '@mui/icons-material/Refresh';


const Footer = () => {

    
    const { setTheme,theme} = useTheme();

    function refreshPage(){ 
        window.location.reload(); 
    }

    const handleChange = (e) => {
       setTheme(e.value);
       
       localStorage.setItem("theme", JSON.stringify(e.value));


    }
    return (
        <div className='footer'>
            <div className="links">
                <a href='https://github.com/vishal9934' target='_blank'> <img className="icon" src="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_1280.png" alt="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_1280.png" /> </a>
                <a href='https://www.linkedin.com/in/vishal-chandrawanshi-a31a56232/' target='_blank'>  <img className="icon" src="https://static-00.iconduck.com/assets.00/linkedin-icon-2048x2048-ya5g47j2.png" alt="https://static-00.iconduck.com/assets.00/linkedin-icon-2048x2048-ya5g47j2.png" /> </a>
                <a href='https://www.instagram.com/itz_mr._vishu/' target='_blank'> <img  className="icon" src="https://wallpapers-clan.com/wp-content/uploads/2022/01/black-3d-instagram-icon-aesthetic.png" /> </a>
                
            </div>

            <span style={{cursor:'pointer'}}onClick={refreshPage}><RefreshIcon fontSize="large" /></span>
            <div className="themeButton">

                  <Select  
                    onChange={handleChange}
                    options={themeOptions}
                    menuPlacement='top'
                     defaultValue={{label: theme.label, value: theme}}
                    styles = {{
                        control: (styles, state) => ({...styles,
                             borderColor: state.isFocused ? theme.color : theme.typeBoxtext,
                            backgroundColor: theme.typeBoxtext,
                             color: "white"
                            }),

                        menu: styles =>({...styles, backgroundColor: theme.background }),

                        option : ( styles, {isFocused}) =>{
                            return {
                                ...styles,
                                backgroundColor : (!isFocused) ? theme.background : theme.textColor ,
                                color: (!isFocused) ? theme.textColor : theme.background, 
                                cursor : 'pointer'
                            }
                        }
                    }}
                 />
            </div>
        </div>

    )
}

export default Footer