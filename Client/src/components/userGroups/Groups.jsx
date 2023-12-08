import React from 'react'
import '../MyStyle.css'
import logo from '../../images/chatLogo.png'
import { IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { AnimatePresence, motion } from "framer-motion"
function Groups() {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                    ease: 'anticipate',
                    duration: 0.2
                }}
                className='list-container'>
                <div className='ug-header'>
                    <img src={logo} alt='logo' style={{ height: '2rem', width: '2rem' }} />
                    <p className='ug-title'>Available Groups</p>
                </div>
                <div className='sb-search'>
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <input placeholder='search' className='search-box' />
                </div>
                <div className='ug-list'>
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className='ug-item'>
                        <div class="con-icon">R</div>
                        <div class="con-title">Test user1 </div>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className='ug-item'>
                        <div class="con-icon">R</div>
                        <div class="con-title">Test user1 </div>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className='ug-item'>
                        <div class="con-icon">R</div>
                        <div class="con-title">Test user1 </div>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className='ug-item'>
                        <div class="con-icon">R</div>
                        <div class="con-title">Test user1 </div>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className='ug-item'>
                        <div class="con-icon">R</div>
                        <div class="con-title">Test user1 </div>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className='ug-item'>
                        <div class="con-icon">R</div>
                        <div class="con-title">Test user1 </div>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className='ug-item'>
                        <div class="con-icon">R</div>
                        <div class="con-title">Test user1 </div>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className='ug-item'>
                        <div class="con-icon">R</div>
                        <div class="con-title">Test user1 </div>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className='ug-item'>
                        <div class="con-icon">R</div>
                        <div class="con-title">Test user1 </div>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className='ug-item'>
                        <div class="con-icon">R</div>
                        <div class="con-title">Test user1 </div>
                    </motion.div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default Groups
