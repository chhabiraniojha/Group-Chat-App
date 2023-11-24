import React from 'react'
import '../MyStyle.css'
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { IconButton } from '@mui/material';


function CreateGroup() {
    return (
        <div className='create-group-container'>
            <input placeholder='Enter group Name' className='search-box' />
            <div>
                <IconButton>
                    <DoneOutlineIcon />
                </IconButton>

            </div>
        </div>
    )
}

export default CreateGroup
