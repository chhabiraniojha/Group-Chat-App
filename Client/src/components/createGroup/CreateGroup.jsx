import React from 'react'
import '../MyStyle.css'
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { IconButton } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';


function CreateGroup() {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                    ease: 'anticipate',
                    duration: 0.3
                }}
                className='create-group-container'>
                <input placeholder='Enter group Name' className='search-box' />
                <div>
                    <IconButton>
                        <DoneOutlineIcon />
                    </IconButton>

                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default CreateGroup
