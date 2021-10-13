import React, {useState, useEffect, useCallback} from "react";
import {
  Button,
  Container,
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
import { DataGrid, GridColDef, GridValueGetterParams} from "@mui/x-data-grid";
import PageHeader from "../../../components/PageHeader";
import { useOfferListQuery } from "../../queries";
import { 
  useVariantUpdateMutation, useVariantCreateMutation, useVariantDeleteMutation,
  useProductVariantSetDefaultMutation
} from "../../../products/mutations";
import moment from "moment-timezone";

const WAREHOUSE_ID = "V2FyZWhvdXNlOmY0YTc2YmNkLWM2MjgtNDhkNS1hMjRkLWM1YjM3YzFlNjA3OA=="

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTypography-h5': {
      color: '#66cc66',
      fontWeight: 600,
    },
    '& .MuiDataGrid-columnHeader:focus': {
      outline: 'none',
    },
    '& .MuiDataGrid-columnsContainer': {
      borderBottom: '1px solid #eaeaea',
    },
    '& .MuiDataGrid-columnHeaderTitle': {
      fontSize: 12,
      fontWeight: 600,
      marginRight: 0,
    },
    '& .MuiDataGrid-row': {
      border: '1px solid #fff',
      borderBottomColor: '#eaeaea',
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    '& .MuiDataGrid-row.Mui-selected': {
      marginTop: 0.4,
      width: "102%",
      border: '1px solid #66cc66',
      backgroundColor: 'rgba(102, 204, 102, 0.12)',
    },
    '& .MuiDataGrid-cell': {
      fontSize: 12,
      '&:hover': {
        backgroundColor: 'rgba(102, 204, 102, 0.08)',
      },
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
    width: 100,
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
    valueFormatter: ({value}) => value || "-"
  },
  {
    field: 'leadTime',
    headerName: 'Lead Time',
    headerAlign: 'right',
    align: 'right',
    width: 120,
    editable: true,
    sortable: false,
    valueFormatter: ({value}) => {
      if ( value == -1) {
        return "Unknown"
      } else if (value == 0) {
        return "In Stock"
      } else if (value == 1) {
        return "1 Month"
      } else {
        return `${value} days`
      }
    }
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
    valueFormatter: ({value}) => value ? `$${Number(value)?.toFixed(2)}` : "-"
  },
  {
    field: 'margin',
    headerName: 'Margin',
    headerAlign: 'right',
    align: 'right',
    editable: true,
    sortable: false,
    valueFormatter:({value}) => value ? `${value}%` : "-"
  },
  {
    field: 'sellPrice',
    headerName: 'Sell Price',
    headerAlign: 'right',
    align: 'right',
    width: 110,
    editable: true,
    sortable: false,
    valueFormatter: ({value}) =>  value ? `$${Number(value)?.toFixed(2)}` : "-"
  },
];

export interface PricingDetailDrawerProps {
  open: boolean;
  refetchProducts: any;
  closeDrawer: () => void;
  variants: Array<{
    id: string,
    sku: string,
    costPrice: {
      amount: number
    },
    margin: number,
    price: {
      amount: number
    },
    quantityAvailable: number,
    offer: {
      offerId: string,
      leadTimeDays: number,
      coo: string
    }
  }>;
  defaultVariant: string | null;
  productId: string;
  productMPN: string;
  productItemMasterId: string;
}

export const PricingDetailDrawer: React.FC<PricingDetailDrawerProps> = (
  {
    open,
    refetchProducts,
    closeDrawer,
    variants,
    defaultVariant,
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
  const offers = data?.offers?.filter((offer) => !offer?.productVariant) || []

  const priceSortedOffers = productItemMasterId && offers?.length > 0 ? [...offers].sort(
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
  const defaultVariantTableRows = variants.map(variant => ({
    id: variant?.offer?.offerId || variant.id,
    origin: variant?.offer?.coo,
    leadTime: variant?.offer?.leadTimeDays,
    qty: variant?.quantityAvailable,
    cost: variant?.costPrice?.amount,
    margin: variant?.margin,
    sellPrice: variant?.price?.amount
  }));
  
  const [variantTableRows, setVariantTableRows] = useState([])

  useEffect(() => {
    setVariantTableRows(defaultVariantTableRows)
    if (defaultVariant) {
      setSelectionModel([defaultVariant])
    }
  }, [variants])

  const [selectionModel, setSelectionModel] = useState([])
  
  const handleCellEditCommit = useCallback(({id, field, value}) => {
      const updatedRows = variantTableRows.map(row => {
        if (row.id === id) {
            return {...row, [field]: value}
          }
          return row
      });
      setVariantTableRows(updatedRows)
  }, [variantTableRows])
  
  const handleOfferSelect = (event) => {
    const offerId = event.target.value
    const offerData = offers?.find(offer => offer?.id === offerId)
    setVariantTableRows([
      ...variantTableRows,
      {
        id: offerData?.offerId,
        origin: offerData?.coo,
        leadTime: offerData?.leadTimeDays,
        qty: offerData?.quantity,
        cost: offerData?.offerPrice,
        margin: null,
        sellPrice: null
      }
    ])
    setHideDropdown(true);
  }

  const offerTableRows = productItemMasterId && offers?.map(offer => (
      <StyledTableRow key={offer?.offerId}>
        <StyledTableCell>{offer?.offerId}</StyledTableCell>
        <StyledTableCell>{offer?.vendor.vendorNumber}</StyledTableCell>
        <StyledTableCell align="right">{offer?.dateAdded ? moment(parseInt(offer.dateAdded)).format("MM/DD/YY") : "-"}</StyledTableCell>
        <StyledTableCell align="right">{offer?.coo || "-"}</StyledTableCell>
        <StyledTableCell align="right">{formatLeadTime(offer?.leadTimeDays)}</StyledTableCell>
        <StyledTableCell align="right">{offer?.quantity}</StyledTableCell>
        <StyledTableCell align="right">${offer?.offerPrice}</StyledTableCell>
      </StyledTableRow>
    ))
  
  const [variantUpdate, variantUpdateMutationData] = useVariantUpdateMutation({
    onCompleted: (data) => console.log(data),
    onError: (error) => console.log("VariantUpdate Errors:", error)
  })

  const [variantCreate, variantCreateMutationData] = useVariantCreateMutation({
    onCompleted: (data) => console.log(data),
    onError: (error) => console.log("VariantCreate Error:", error)
  })

  const [setDefaultVariant, setDefaultVariantData] = useProductVariantSetDefaultMutation({
    onCompleted: (data) => console.log(data),
    onError: (error) => console.log("Error setting variant default:", error)
  })

  const handleUpdate = async () => {
    const variantOfferIds = variants?.map(variant => variant?.offer?.offerId);

    variantTableRows.forEach(async ({id, qty, cost, sellPrice}) => {
      if (variantOfferIds.includes(id)) {
        // run update mutation
        const variantData = variants?.find(variant => variant?.offer?.offerId == id )
        variantUpdate({variables: {
          id: variantData.id,
          sku: variantData.sku,
          addStocks: [],
          removeStocks: [],
          trackInventory: true,
          stocks: [{warehouse: WAREHOUSE_ID, quantity: qty }],
          costPrice: cost,
          price: sellPrice
        }});
        // set default variant if id matches selected row
        if (id == selectionModel[0]) {
          setDefaultVariant({variables: {
            productId,
            variantId: variantData.id
          }})
        }
      } else {
        // run create mutation
        const offerData = offers?.find(offer => offer?.offerId == id)
        const {data: {productVariantCreate}} = await variantCreate({variables: {
          input: {
            sku: id,
            trackInventory: true,
            product: productId,
            stocks: [{warehouse: WAREHOUSE_ID, quantity: qty}],
            costPrice: cost,
            price: sellPrice,
            offer: offerData?.id
          }
        }});
        // set default variant if id matches selected row
        if (id == selectionModel[0]) {
          const variantId = productVariantCreate?.productVariant?.id
          setDefaultVariant({variables: {
            productId,
            variantId
          }})
        }
      }
    })
    handleDrawerClose()
    refetchProducts()
  }

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
            onClick={handleUpdate}
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
            onChange={(event) => setSelectionModel([event.target.value])}
            value={selectionModel[0] || ""}
          >
            <option aria-label="None" value="" />
            {variantTableRows.map(row => (
              <option key={row.id} value={row.id}>{row.id}</option>
            ))}
          </Select>
        </FormControl>
      </div>

      <div style={{ width: 800 }} className={classes.root}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid
              autoHeight
              // pageSize={5}
              // pagination
              rowHeight={40}
              rows={variantTableRows}
              columns={columns}
              disableColumnMenu
              hideFooter
              disableSelectionOnClick
              onCellEditCommit={handleCellEditCommit}
              selectionModel={selectionModel}
              style={{paddingLeft: 24, paddingRight: 24}}
            />
            <div style={{paddingLeft: 24, paddingRight: 24, paddingTop: 24}}>
              <Button 
                onClick={() => setHideDropdown(!hideDropdown)}
                color="primary"
              >Add Variant</Button>
              <Hidden xsUp={hideDropdown}>
                <Container disableGutters>
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
                    onChange={handleOfferSelect}
                  >
                    <option aria-label="None" value="" />
                    {productItemMasterId && offers?.map(offer => (
                      <option key={offer.id} value={offer.id}>{offer.vendor.vendorNumber}</option>
                    ))}
                  </Select>
                </FormControl>
                </Container>
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
              <StyledTableCell>ID</StyledTableCell>
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
