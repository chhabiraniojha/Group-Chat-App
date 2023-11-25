import React from 'react'
import '../MyStyle.css'
import logo from '../../images/chatLogo.png'
import { IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
function User_Groups() {
    return (
        <div className='list-container'>
            <div className='ug-header'>
                <img src={logo} alt='logo' style={{ height: '2rem', width: '2rem' }} />
                <p className='ug-title'>Online Users</p>
            </div>
            <div className='sb-search'>
                <IconButton>
                    <SearchIcon />
                </IconButton>
                <input placeholder='search' className='search-box' />
            </div>
            <div className='ug-list'>
                <div className='ug-item'>
                    <div class="con-icon">R</div>
                    <div class="con-title">Test user1 </div>
                </div>
                <div className='ug-item'>
                    <div class="con-icon">M</div>
                    <div class="con-title">Test user2 </div>
                </div>
                <div className='ug-item'>
                    <div class="con-icon">M</div>
                    <div class="con-title">Test user2 </div>
                </div>
                <div className='ug-item'>
                    <div class="con-icon">M</div>
                    <div class="con-title">Test user2 </div>
                </div>
                <div className='ug-item'>
                    <div class="con-icon">M</div>
                    <div class="con-title">Test user2 </div>
                </div>
                <div className='ug-item'>
                    <div class="con-icon">M</div>
                    <div class="con-title">Test user2 </div>
                </div>
                <div className='ug-item'>
                    <div class="con-icon">M</div>
                    <div class="con-title">Test user2 </div>
                </div>
                <div className='ug-item'>
                    <div class="con-icon">M</div>
                    <div class="con-title">Test user2 </div>
                </div>
                <div className='ug-item'>
                    <div class="con-icon">M</div>
                    <div class="con-title">Test user2 </div>
                </div>
                <div className='ug-item'>
                    <div class="con-icon">M</div>
                    <div class="con-title">Test user2 </div>
                </div>
            </div>
        </div>
    )
}

export default User_Groups
