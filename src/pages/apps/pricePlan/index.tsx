// ** React Imports
import { MouseEvent, useCallback, useState } from 'react'

// ** Next Imports
import { GetStaticProps, InferGetStaticPropsType } from 'next/types'

// ** MUI Imports
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports

// ** Custom Components Imports

// ** Utils Import

// ** Actions Imports

// ** Third Party Components
import axios from 'axios'

// ** Types Imports
import { CardStatsType } from 'src/@fake-db/types'

// ** Custom Table Components Imports
import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer'
import TableHeader from 'src/views/apps/user/list/TableHeader'

const RowOptions = () => {
  // ** Hooks

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <Icon icon='mdi:dots-vertical' />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        {/* <MenuItem
          component={Link}
          sx={{ '& svg': { mr: 2 } }}
          onClick={handleRowOptionsClose}
          href='/apps/user/view/overview/'
        >
          <Icon icon='mdi:eye-outline' fontSize={20} />
          View
        </MenuItem> */}
        <MenuItem onClick={handleRowOptionsClose} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='mdi:pencil-outline' fontSize={20} />
          Edit
        </MenuItem>
        {/* <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='mdi:delete-outline' fontSize={20} />
          Delete
        </MenuItem> */}
      </Menu>
    </>
  )
}

const columns: GridColDef[] = [
  {
    flex: 0.2,
    minWidth: 230,
    field: 'Year',
    headerName: 'Year'
  },
  {
    flex: 0.2,
    minWidth: 230,
    field: 'Month',
    headerName: 'Month'
  },
  {
    flex: 0.2,
    minWidth: 230,
    field: 'CPU',
    headerName: 'CPU Hrs Price(EGP)	'
  },
  {
    flex: 0.2,
    minWidth: 230,
    field: 'GPU',
    headerName: 'GPU Hrs Price(EGP)	'
  },
  {
    flex: 0.2,
    minWidth: 230,
    field: 'Memory',
    headerName: 'Memory Hrs Price(EGP)	'
  },
  {
    flex: 0.1,
    minWidth: 90,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: () => <RowOptions />
  }
]
const data = [
  {
    id: '1',
    Year: '2022',
    Month: '0',
    CPU: '0.6',
    GPU: '25',
    Memory: '0.1'
  },
  {
    id: '2',
    Year: '2023',
    Month: '0',
    CPU: '0.6',
    GPU: '25',
    Memory: '0.1'
  },
  {
    id: '2',
    Year: '2024',
    Month: '0',
    CPU: '0.6',
    GPU: '25',
    Memory: '0.1'
  },
  {
    id: '2',
    Year: '2024',
    CPU: '0.6',
    GPU: '25',
    Memory: '0.1'
  },
  {
    id: '2',
    Year: '2024',
    Month: '1',
    CPU: '0.6',
    GPU: '25',
    Memory: '0.1'
  }
]

const PricePlan = ({}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [value, setValue] = useState<string>('')
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  // ** Hooks

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <Divider />
          <TableHeader
            value={value}
            handleFilter={handleFilter}
            toggle={toggleAddUserDrawer}
            nameButton='New Price Plane'
          />
          <DataGrid
            autoHeight
            rows={data}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
          />
        </Card>
      </Grid>

      <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
    </Grid>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await axios.get('/cards/statistics')
  const apiData: CardStatsType = res.data

  return {
    props: {
      apiData
    }
  }
}

export default PricePlan
