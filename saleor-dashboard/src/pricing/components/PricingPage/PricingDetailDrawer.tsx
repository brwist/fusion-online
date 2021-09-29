import React from "react";
import {
  Button,
  Drawer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  FormControl,
  InputLabel,
  Select
} from "@material-ui/core";
import { withStyles, Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
// import Container from "@saleor/components/Container";
import PageHeader from "../../../components/PageHeader";

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTypography-h5': {
      color: '#66cc66',
      fontWeight: 600,
    },
    '& .MuiDataGrid-columnsContainer': {
      borderBottom: '1px solid #eaeaea',
    },
    '& .MuiDataGrid-columnHeaderTitle': {
      fontSize: 12,
      fontWeight: 600,
    },
    '& .MuiDataGrid-row': {
      marginTop: 1,
      border: '1px solid #fff',
      borderBottomColor: '#eaeaea',
      '&:hover': {
        backgroundColor: 'rgba(102, 204, 102, 0.12)',
        borderColor: '#66cc66',
      },
    },
    '& .MuiDataGrid-cell': {
      fontSize: 12,
      '&:nth-of-type(1)': {
        color: '#66cc66',
        fontWeight: 600,
      },
    },
  },
  drawerPaper: {
  //   paddingTop: 48,
  //   paddingBottom: 48,
  },
  formControl: {
    minWidth: 200,
  },
  padding: {
    padding: 24,
  },
  noBorder: {
    borderBottom: 0,
  },
}),{ name: "PricingDetailDrawer" });

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(1)': {
        fontSize: 12,
        fontWeight: 600,
      },
    },
    head: {
      fontSize: 12,
      fontWeight: 600,
    },
    body: {
      height: 40,
      fontSize: 14,
    },
  }),{ name: "PricingDetailDrawer" },
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      // '&:nth-of-type(odd)': {
      //   backgroundColor: theme.palette.action.hover,
      // },
    },
  }),{ name: "PricingDetailDrawer" },
)(TableRow);

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 80,
    sortable: false,
  },
  {
    field: 'origin',
    headerName: 'Origin',
    headerAlign: 'right',
    align: 'right',
    editable: true,
    sortable: false,
  },
  {
    field: 'leadTime',
    headerName: 'Lead Time',
    headerAlign: 'right',
    align: 'right',
    width: 120,
    editable: true,
    sortable: false,
  },
  {
    field: 'qty',
    headerName: 'Qty',
    type: 'number',
    width: 80,
    editable: true,
    sortable: false,
  },
  {
    field: 'min',
    headerName: 'Min',
    type: 'number',
    width: 80,
    editable: true,
    sortable: false,
  },
  {
    field: 'max',
    headerName: 'Max',
    type: 'number',
    width: 80,
    editable: true,
    sortable: false,
  },
  {
    field: 'spq',
    headerName: 'SPQ',
    type: 'number',
    width: 80,
    editable: true,
    sortable: false,
  },
  {
    field: 'cost',
    headerName: 'Cost',
    editable: true,
    sortable: false,
  },
  {
    field: 'margin',
    headerName: 'Margin',
    editable: true,
    sortable: false,
  },
  {
    field: 'sellPrice',
    headerName: 'Sell Price',
    editable: true,
    sortable: false,
  },
];

const rows = [
  { id: 1, origin: 'United States', leadTime: '2 days', qty: 35, min: 1, max: 100, spq: 1, cost: '$00.00', margin: '00%', sellPrice: '$00.00', },
  { id: 2, origin: 'United States', leadTime: '2 days', qty: 35, min: 1, max: 100, spq: 1, cost: '$00.00', margin: '00%', sellPrice: '$00.00', },
  { id: 3, origin: 'United States', leadTime: '2 days', qty: 35, min: 1, max: 100, spq: 1, cost: '$00.00', margin: '00%', sellPrice: '$00.00', },
  { id: 4, origin: 'United States', leadTime: '2 days', qty: 35, min: 1, max: 100, spq: 1, cost: '$00.00', margin: '00%', sellPrice: '$00.00', },
];

export interface PricingDetailDrawerProps {
  open: boolean;
  closeDrawer: () => void;
  productId: string;
}

export const PricingDetailDrawer: React.FC<PricingDetailDrawerProps> = (
  {open, closeDrawer, productId}) => {
  const classes = useStyles();

  return (
    <Drawer
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="right"
      open={open}
      onClose={closeDrawer}
    >
      <div className={classes.padding}>
        <PageHeader
          className={classes.root}
          title={productId}
        >
          <Button
            onClick={() => console.log("click")}
            color="primary"
            variant="contained"
          >
            Update
          </Button>
        </PageHeader>

        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell>All Vendors</StyledTableCell>
              <StyledTableCell align="right">Cost</StyledTableCell>
              <StyledTableCell align="right">Date</StyledTableCell>
              <StyledTableCell align="right">Vendor</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <StyledTableCell className={classes.noBorder}>Low</StyledTableCell>
              <StyledTableCell className={classes.noBorder} align="right">$000.00</StyledTableCell>
              <StyledTableCell className={classes.noBorder} align="right">00/00/00</StyledTableCell>
              <StyledTableCell className={classes.noBorder} align="right">XX0004</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell className={classes.noBorder}>High</StyledTableCell>
              <StyledTableCell className={classes.noBorder} align="right">$000.00</StyledTableCell>
              <StyledTableCell className={classes.noBorder} align="right">00/00/00</StyledTableCell>
              <StyledTableCell className={classes.noBorder} align="right">XX0004</StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>

        <h2>Product Variants</h2>
        <FormControl
          className={classes.formControl}
          variant="outlined"
        >
          <InputLabel htmlFor="default-variant">Default Variant</InputLabel>
          <Select
            native
            inputProps={{
              name: 'default-variant',
              id: 'default-variant',
            }}
          >
            <option aria-label="None" value="" />
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </Select>
        </FormControl>
      </div>

      <div style={{ width: 800 }} className={classes.root}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid
              autoHeight
              autoPageSize
              pagination
              rowHeight={40}
              rows={rows}
              columns={columns}
              // pageSize={5}
              // rowsPerPageOptions={[5]}
              // disableSelectionOnClick
            />
          </div>
        </div>
      </div>

      <div className={classes.padding}>
        <h2>Offers</h2>
        <Table size="small">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Vendor</StyledTableCell>
              <StyledTableCell align="right">Date</StyledTableCell>
              <StyledTableCell align="right">Country of Origin</StyledTableCell>
              <StyledTableCell align="right">Lead Time</StyledTableCell>
              <StyledTableCell align="right">Qty</StyledTableCell>
              <StyledTableCell align="right">Cost</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell>XX0004</StyledTableCell>
              <StyledTableCell align="right">00/00</StyledTableCell>
              <StyledTableCell align="right">United States</StyledTableCell>
              <StyledTableCell align="right">2 days</StyledTableCell>
              <StyledTableCell align="right">3</StyledTableCell>
              <StyledTableCell align="right">$00.00</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>XX0004</StyledTableCell>
              <StyledTableCell align="right">00/00</StyledTableCell>
              <StyledTableCell align="right">United States</StyledTableCell>
              <StyledTableCell align="right">2 days</StyledTableCell>
              <StyledTableCell align="right">3</StyledTableCell>
              <StyledTableCell align="right">$00.00</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>XX0004</StyledTableCell>
              <StyledTableCell align="right">00/00</StyledTableCell>
              <StyledTableCell align="right">United States</StyledTableCell>
              <StyledTableCell align="right">2 days</StyledTableCell>
              <StyledTableCell align="right">3</StyledTableCell>
              <StyledTableCell align="right">$00.00</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>XX0004</StyledTableCell>
              <StyledTableCell align="right">00/00</StyledTableCell>
              <StyledTableCell align="right">United States</StyledTableCell>
              <StyledTableCell align="right">2 days</StyledTableCell>
              <StyledTableCell align="right">3</StyledTableCell>
              <StyledTableCell align="right">$00.00</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>XX0004</StyledTableCell>
              <StyledTableCell align="right">00/00</StyledTableCell>
              <StyledTableCell align="right">United States</StyledTableCell>
              <StyledTableCell align="right">2 days</StyledTableCell>
              <StyledTableCell align="right">3</StyledTableCell>
              <StyledTableCell align="right">$00.00</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>XX0004</StyledTableCell>
              <StyledTableCell align="right">00/00</StyledTableCell>
              <StyledTableCell align="right">United States</StyledTableCell>
              <StyledTableCell align="right">2 days</StyledTableCell>
              <StyledTableCell align="right">3</StyledTableCell>
              <StyledTableCell align="right">$00.00</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>XX0004</StyledTableCell>
              <StyledTableCell align="right">00/00</StyledTableCell>
              <StyledTableCell align="right">United States</StyledTableCell>
              <StyledTableCell align="right">2 days</StyledTableCell>
              <StyledTableCell align="right">3</StyledTableCell>
              <StyledTableCell align="right">$00.00</StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </div>

      <div className={classes.padding}>
        <h2>Pricing History</h2>
        <Table size="small">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell align="right">Change</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell className={classes.noBorder}>00/00</StyledTableCell>
              <StyledTableCell className={classes.noBorder} align="right">+$00.00</StyledTableCell>
              <StyledTableCell className={classes.noBorder} align="right">$000.00</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell className={classes.noBorder}>00/00</StyledTableCell>
              <StyledTableCell className={classes.noBorder} align="right">+$00.00</StyledTableCell>
              <StyledTableCell className={classes.noBorder} align="right">$000.00</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell className={classes.noBorder}>00/00</StyledTableCell>
              <StyledTableCell className={classes.noBorder} align="right">+$00.00</StyledTableCell>
              <StyledTableCell className={classes.noBorder} align="right">$000.00</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell className={classes.noBorder}>00/00</StyledTableCell>
              <StyledTableCell className={classes.noBorder} align="right">+$00.00</StyledTableCell>
              <StyledTableCell className={classes.noBorder} align="right">$000.00</StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </div>
    </Drawer>
  );
};
