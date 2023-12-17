import React, { useEffect, useState } from 'react'
import '../MyStyle.css'
import logo from '../../images/chatLogo.png'
import { IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import { AnimatePresence, motion } from "framer-motion"
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios'
function Groups() {
    const [users, setUsers] = useState([]);
    const [checkedState, setCheckedState] = useState([]);
    const [group,setGroup]=useState([]);
    const [groupName,setGroupName]=useState("");



    async function getAllUsers() {
        const token = localStorage.getItem('token')
        try {
            const userList = await axios.get('http://localhost:3000/users/allusers', { headers: { Authorization: token } })
            setUsers(userList.data);
            setCheckedState(new Array(users.length).fill(false))
            console.log(checkedState)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAllUsers();

    }, [setCheckedState])

    function handleChange(position,user) {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );

        setCheckedState(updatedCheckedState);
        const result = group.find(({ id }) => id === user.id);
        if(result==undefined){
            group.push({id:user.id,name:user.name})
        }else{
            const index = group.indexOf(result);
            group.splice(index, 1);
        }
       
        
    }

    const handleCreateGroup=async()=>{
        if(groupName=="" ){
            alert("group name can not be empty")
            return;
        }else if(group.length==0){
            alert("please add some people in the group")
            return;
        }

        try {
            const token=localStorage.getItem("token")
            const response=await axios.post('http://localhost:3000/groups/creategroup',{group,groupName},{ headers: { Authorization: token } });
            if(response.status==200){
                setCheckedState(new Array(users.length).fill(false));
                setGroup([]);
                setGroupName("");
                alert("group created successfully")
            }
        } catch (error) {
            console.log(error)
        }
    }

  console.log(checkedState)
    

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
                    <input type='text' value={groupName} onChange={(e)=>setGroupName(e.target.value)} className='search-box' placeholder='Enter Group Name' />
                    <IconButton onClick={handleCreateGroup}>
                        <SendIcon  />
                    </IconButton>
                </div>
                <div className='sb-search'>
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <input placeholder='search' className='search-box' />
                </div>
                <div className='sb-search'>
                    {group.map((g)=>(
                        <div style={{backgroundColor:"red",margin:"2px", borderRadius:"5px"}}>{g.name}</div>
                    ))}
                </div>
                <div className='ug-list'>
                    {users.map((user, index) =>
                    (<motion.div key={user.id}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className='ug-item'>
                        <div class="con-icon">{user.name[0].toUpperCase()}</div>
                        <div class="con-title">{user.name} </div>
                        <input type='checkBox' checked={checkedState[index]} onChange={() => handleChange(index,user)} />
                    </motion.div>)
                    )}

                    {/* <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className='ug-item'>
                        <div class="con-icon">R</div>
                        <div class="con-title">Test user1 </div>
                        <input type='checkBox'/>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className='ug-item'>
                        <div class="con-icon">R</div>
                        <div class="con-title">Test user1 </div>
                        <input type='checkBox'/>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className='ug-item'>
                        <div class="con-icon">R</div>
                        <div class="con-title">Test user1 </div>
                        <input type='checkBox'/>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className='ug-item'>
                        <div class="con-icon">R</div>
                        <div class="con-title">Test user1 </div>
                        <input type='checkBox'/>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className='ug-item'>
                        <div class="con-icon">R</div>
                        <div class="con-title">Test user1 </div>
                        <input type='checkBox'/>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className='ug-item'>
                        <div class="con-icon">R</div>
                        <div class="con-title">Test user1 </div>
                        <input type='checkBox'/>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className='ug-item'>
                        <div class="con-icon">R</div>
                        <div class="con-title">Test user1 </div>
                        <input type='checkBox'/>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className='ug-item'>
                        <div class="con-icon">R</div>
                        <div class="con-title">Test user1 </div>
                        <input type='checkBox'/>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className='ug-item'>
                        <div class="con-icon">R</div>
                        <div class="con-title">Test user1 </div>
                        <input type='checkBox'/>
                    </motion.div> */}
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default Groups
