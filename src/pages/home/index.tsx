import { memo, useState } from 'react'
import { UserTable } from '../../components/UserTable'
import Navbar from '../../components/Navbar'
import { useDeleteUsersMutation, useGetUsersQuery, useUpdateUserStatusMutation } from '../../redux/api/user.api'
import { Button, CircularProgress, IconButton, Tooltip } from '@mui/material'
import { FaRegTrashCan, FaUnlockKeyhole } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import { GridRowSelectionModel } from '@mui/x-data-grid'
import toast from 'react-hot-toast'

const Home = () => {
    const { data, isLoading } = useGetUsersQuery({})
    const [selectedIds, setSelectedIds] = useState<GridRowSelectionModel>();
    const [deleteUser, { isLoading: deleteLoading }] = useDeleteUsersMutation()
    const [updateUserStatus] = useUpdateUserStatusMutation()

    const handleDelete = async () => {
        await deleteUser({ ids: [...selectedIds?.ids!] })
        toast.success("User deleted!")
    }

    const handleUpdateUserStatus = async (isBlockAction: boolean) => {
        await updateUserStatus({ ids: [...selectedIds?.ids!], status: isBlockAction ? "BLOCKED" : "ACTIVE" })
        toast.success("User status updated!")
    }

    return (
        <>
            <Navbar />
            <div className='container mx-auto flex flex-col gap-3 mt-[50px]'>
                <div className='flex items-center gap-5 mb-3'>
                    <Tooltip placement='top' title='Block Users'>
                        <Button onClick={() => handleUpdateUserStatus(true)} startIcon={<FaLock />} variant='outlined'>Block</Button>
                    </Tooltip>
                    <Tooltip placement='top' title='Unlock Users'>
                        <IconButton onClick={() => handleUpdateUserStatus(false)}><FaUnlockKeyhole className='text-[#1976d2]' /></IconButton>
                    </Tooltip>
                    <Tooltip placement='top' title='Delete Users'>
                        <IconButton disabled={deleteLoading} onClick={handleDelete}> <FaRegTrashCan className='text-red-600' /></IconButton>
                    </Tooltip>
                </div>
                {
                    isLoading ? <CircularProgress /> : <UserTable selectedIds={selectedIds} setSelectedIds={setSelectedIds} data={data} />
                }
            </div>
        </>
    )
}

export default memo(Home)