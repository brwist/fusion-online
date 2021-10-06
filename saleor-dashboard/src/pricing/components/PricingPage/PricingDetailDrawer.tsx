import React, {useState, useEffect, useCallback} from "react";
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
import Hidden from "@material-ui/core/Hidden"
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
// import Container from "@saleor/components/Container";
import PageHeader from "../../../components/PageHeader";
import { useOfferListQuery } from "../../queries";
import moment from "moment-timezone"

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
    width: 120,
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
    headerAlign: 'right',
    align: 'right',
    width: 80,
    editable: true,
    sortable: false,
  },
  {
    field: 'cost',
    headerName: 'Cost',
    headerAlign: 'right',
    align: 'right',
    editable: true,
    sortable: false,
  },
  {
    field: 'margin',
    headerName: 'Margin',
    headerAlign: 'right',
    align: 'right',
    editable: true,
    sortable: false,
  },
  {
    field: 'sellPrice',
    headerName: 'Sell Price',
    headerAlign: 'right',
    align: 'right',
    width: 110,
    editable: true,
    sortable: false,
  },
];

export interface PricingDetailDrawerProps {
  open: boolean;
  closeDrawer: () => void;
  productId: string;
  productMPN: string;
  productItemMasterId: string;
}

export const PricingDetailDrawer: React.FC<PricingDetailDrawerProps> = (
  {
    open,
    closeDrawer,
    productId,
    productMPN,
    productItemMasterId
  }) => {
  const classes = useStyles();
  const [hideDropdown, setHideDropdown] = useState(true)

  const handleDrawerClose = () => {
    setHideDropdown(true)
    closeDrawer()
  }
  const {data} = useOfferListQuery({variables: {itemMasterId: productItemMasterId }})
  console.log(data)
  const offersWithVariants = productItemMasterId && data?.offers?.filter((offer) => offer.productVariant) || []
  console.log("offers with variants:", offersWithVariants)
  
  const offers = data?.offers || []
  const priceSortedOffers = productItemMasterId && offers.length > 0 ? [...offers].sort(
    (a,b) => (a.offerPrice > b.offerPrice) ? 1 : ((b.offerPrice > a.offerPrice) ? -1 : 0)) : []

  const formatLeadTime = (leadTime) => {
    if (leadTime === -1) {
      return "Unknown"
    } else if (leadTime === 0) {
      return "In Stock"
    } else if (leadTime === 1) {
      return "1 Month"
    } else {
      return `${leadTime} days`
    }
  }

  const defaultVariantTableRows = offersWithVariants.map(offer => ({
      id: offer?.id,
      origin: offer?.coo || "-",
      leadTime: formatLeadTime(offer?.leadTimeDays),
      qty: offer?.productVariant.quantityAvailable,
      cost: `$${offer?.offerPrice?.toFixed(2)}`, 
      margin: offer?.productVariant.margin || "-",
      sellPrice: `$${offer?.productVariant.price.amount}` || "-"
    }));
  
  const [variantTableRows, setVariantTableRows] = useState([])

  useEffect(() => {
    setVariantTableRows(defaultVariantTableRows)
  }, [productItemMasterId])
  
  const handleCellEditCommit = useCallback(({id, field, value}) => variantTableRows.map(row => {
      if (row.id === id) {
        return {...row, [field]: value}
      }
      return row
    }), [variantTableRows])

  const offerTableRows = productItemMasterId && data?.offers?.map(offer => (
      <StyledTableRow key={offer?.id}>
        <StyledTableCell>{offer?.vendor.vendorNumber}</StyledTableCell>
        <StyledTableCell align="right">{offer?.dateAdded ? moment(parseInt(offer.dateAdded)).format("MM/DD/YY") : "-"}</StyledTableCell>
        <StyledTableCell align="right">{offer?.coo || "-"}</StyledTableCell>
        <StyledTableCell align="right">{formatLeadTime(offer?.leadTimeDays)}</StyledTableCell>
        <StyledTableCell align="right">{offer?.quantity}</StyledTableCell>
        <StyledTableCell align="right">${offer?.offerPrice}</StyledTableCell>
      </StyledTableRow>
    ))

  return (
    <Drawer
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="right"
      open={open}
      onClose={handleDrawerClose}
    >
      <div className={classes.padding}>
        <PageHeader
          className={classes.root}
          title={productMPN}
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
              <StyledTableCell className={classes.noBorder} align="right">${priceSortedOffers[0]?.offerPrice}</StyledTableCell>
              <StyledTableCell className={classes.noBorder} align="right">
                {priceSortedOffers[0] ? moment(parseInt(priceSortedOffers[0].dateAdded)).format("MM/DD/YY") : "-"}
              </StyledTableCell>
              <StyledTableCell className={classes.noBorder} align="right">{priceSortedOffers[0]?.vendor.vendorNumber}</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell className={classes.noBorder}>High</StyledTableCell>
              <StyledTableCell className={classes.noBorder} align="right">${priceSortedOffers[priceSortedOffers.length - 1]?.offerPrice}</StyledTableCell>
              <StyledTableCell className={classes.noBorder} align="right">
                {priceSortedOffers[priceSortedOffers.length - 1] ? moment(parseInt(priceSortedOffers[priceSortedOffers.length - 1].dateAdded)).format("MM/DD/YY") : "-"}
              </StyledTableCell>
              <StyledTableCell className={classes.noBorder} align="right">{priceSortedOffers[priceSortedOffers.length - 1]?.vendor.vendorNumber}</StyledTableCell>
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
              rows={variantTableRows}
              columns={columns}
              disableColumnMenu
              onCellEditCommit={handleCellEditCommit}
              // pageSize={5}
              // rowsPerPageOptions={[5]}
              // disableSelectionOnClick
            />
            <div className={classes.padding}>
              <Button 
                onClick={() => setHideDropdown(false)}
                color="primary"
              >Add Variant</Button>
              <Hidden xsUp={hideDropdown}>
                <FormControl
                  className={`${classes.formControl} ${hideDropdown && 'd-none'}`}
                    variant="outlined"
                >
                  <InputLabel htmlFor="select-offer">Select Offer</InputLabel>
                  <Select
                    native
                    inputProps={{
                      name: 'select-offer',
                      id: 'select-offer',
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                  </Select>
                </FormControl>
              </Hidden>
            </div>
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
            {offerTableRows}
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
