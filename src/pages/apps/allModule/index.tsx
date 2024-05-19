// ** React Imports
import { useState } from 'react'

// ** Next Imports
import { GetStaticProps } from 'next/types'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import axios from 'axios'

// ** Types Imports
import { CardStatsType } from 'src/@fake-db/types'

// ** Custom Table Components Imports
import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer'
import { CardContent, CardHeader, FormControl, InputLabel, MenuItem, Select } from '@mui/material'

const columns: GridColDef[] = [
  {
    flex: 0.2,
    minWidth: 230,
    field: 'name',
    headerName: 'SRTA CITY CLUSTER'
  }
]
const data = [
  {
    id: '1',
    name: '/cm/local/modulefiles'
  },
  {
    id: '1',
    name: 'boost/1.74.0'
  },
  {
    id: '1',
    name: 'cmsh'
  },
  {
    id: '1',
    name: 'module-git'
  },
  {
    id: '1',
    name: 'cluster-tools-dell/9.1'
  },
  {
    id: '1',
    name: 'cuda-dcgm/3.1.3.1'
  }
]

const columnsTwo: GridColDef[] = [
  {
    flex: 0.2,
    minWidth: 230,
    field: 'name',
    headerName: 'NANO CLUSTER'
  }
]
const dataTwo = [
  {
    id: '1',
    name: 'connect'
  }
]
const columnsThree: GridColDef[] = [
  {
    flex: 0.2,
    minWidth: 230,
    field: 'name',
    headerName: 'Directory'
  }
]
const dataThree = [
  {
    id: '1',
    name: '/usr/share/Modules/modulefiles'
  },
  {
    id: '1',
    name: 'module-git'
  },
  {
    id: '1',
    name: 'module-info'
  },
  {
    id: '1',
    name: 'modules'
  },
  {
    id: '1',
    name: 'use.own'
  },
  {
    id: '1',
    name: 'cuda-dcgm/3.1.3.1'
  }
]

const AllModule = () => {
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })
  const [role] = useState<string>('')
  const [plan] = useState<string>('')
  const [status] = useState<string>('')
  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Search Filters' sx={{ pb: 4, '& .MuiCardHeader-title': { letterSpacing: '.15px' } }} />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='role-select'>Select Role</InputLabel>
                  <Select
                    fullWidth
                    value={role}
                    id='select-role'
                    label='Select Role'
                    labelId='role-select'

                    // onChange={handleRoleChange}

                    inputProps={{ placeholder: 'Select Role' }}
                  >
                    <MenuItem value=''>Select Role</MenuItem>
                    <MenuItem value='admin'>Admin</MenuItem>
                    <MenuItem value='author'>Author</MenuItem>
                    <MenuItem value='editor'>Editor</MenuItem>
                    <MenuItem value='maintainer'>Maintainer</MenuItem>
                    <MenuItem value='subscriber'>Subscriber</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='plan-select'>Select Plan</InputLabel>
                  <Select
                    fullWidth
                    value={plan}
                    id='select-plan'
                    label='Select Plan'
                    labelId='plan-select'

                    // onChange={handlePlanChange}
                    inputProps={{ placeholder: 'Select Plan' }}
                  >
                    <MenuItem value=''>Select Plan</MenuItem>
                    <MenuItem value='basic'>Basic</MenuItem>
                    <MenuItem value='company'>Company</MenuItem>
                    <MenuItem value='enterprise'>Enterprise</MenuItem>
                    <MenuItem value='team'>Team</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='status-select'>Select Status</InputLabel>
                  <Select
                    fullWidth
                    value={status}
                    id='select-status'
                    label='Select Status'
                    labelId='status-select'
                    
                    // onChange={handleStatusChange}
                    inputProps={{ placeholder: 'Select Role' }}
                  >
                    <MenuItem value=''>Select Role</MenuItem>
                    <MenuItem value='pending'>Pending</MenuItem>
                    <MenuItem value='active'>Active</MenuItem>
                    <MenuItem value='inactive'>Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <div className='flex' style={{ display: 'flex', gap: '20px' }}>
          <Card className=''>
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
          <Card className=''>
            <DataGrid
              autoHeight
              rows={dataTwo}
              columns={columnsTwo}
              checkboxSelection
              disableRowSelectionOnClick
              pageSizeOptions={[10, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
            />
          </Card>
          <Card className=''>
            <DataGrid
              autoHeight
              rows={dataThree}
              columns={columnsThree}
              checkboxSelection
              disableRowSelectionOnClick
              pageSizeOptions={[10, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
            />
          </Card>
        </div>
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

export default AllModule
