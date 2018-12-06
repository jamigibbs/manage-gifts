import React from 'react'
import PropTypes from 'prop-types'
import { TableCell, TableHead, TableRow, TableSortLabel, Tooltip} from '@material-ui/core'

const rows = [
  { id: 'name', numeric: false, disablePadding: false, label: 'Receiver Name' },
  { id: 'giftsCount', numeric: true, disablePadding: false, label: 'Assigned Gifts' },
  { id: 'purchasedCount', numeric: true, disablePadding: false, label: 'Purchased Gifts' },
  { id: 'actions', numeric: false, disablePadding: false, label: 'Actions' }
]

const ReceiversListHead = ({onRequestSort, order, orderBy}) => {

  const createSortHandler = property => event => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {rows.map(row => {
          return (
            <TableCell
              key={row.id}
              numeric={row.numeric}
              padding={row.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === row.id ? order : false}
            >
              <Tooltip
                title="Sort"
                placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                enterDelay={300}
              >
                <TableSortLabel
                  active={orderBy === row.id}
                  direction={order}
                  onClick={createSortHandler(row.id)}
                >
                  {row.label}
                </TableSortLabel>
              </Tooltip>
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  )
}

ReceiversListHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired
}

export default ReceiversListHead
