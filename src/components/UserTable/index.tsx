import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { User } from '../../types';
import { FC } from 'react';

interface UserTableProps {
    data: User[];
    setSelectedIds: React.Dispatch<React.SetStateAction<GridRowSelectionModel | undefined>>;
    selectedIds: GridRowSelectionModel | undefined
}

const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'email', headerName: 'Email', width: 350 },
    { field: 'createdAt', headerName: 'Joined Us', width: 220 },
    { field: 'lastSeen', headerName: 'Last Seen', width: 220 },
    { field: 'status', headerName: 'Status', width: 120 },
];

export const UserTable: FC<UserTableProps> = ({ data, setSelectedIds, selectedIds }) => {
    const handleSelectionChange = (newSelection: GridRowSelectionModel) => {
        setSelectedIds(newSelection);

        //     const selectedUsers = data.filter((user) => newSelection.ids.has(user.id!));
        //     console.log('Selected user objects:', selectedUsers);
    };

    return (
        <Paper sx={{ width: '100%', overflowX: 'auto' }}>
            <DataGrid
                rows={data}
                columns={columns}
                checkboxSelection
                hideFooterPagination
                onRowSelectionModelChange={handleSelectionChange}
                rowSelectionModel={selectedIds}
                sx={{
                    border: 0,
                    minWidth: '600px',
                }}
                getRowId={(row) => row.id}
            />
        </Paper>
    );
};
