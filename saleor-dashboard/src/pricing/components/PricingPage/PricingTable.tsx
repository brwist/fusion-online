import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {TableRow, TableCell, TableBody, TableHead, Typography} from "@material-ui/core"
import ResponsiveTable from "../../../components/ResponsiveTable"
import TableCellHeader from "../../../components/TableCellHeader"
import {usePricingProductListQuery} from "../../queries"
import Money from "@saleor/components/Money";
import { PricingDetailDrawer } from "./PricingDetailDrawer";
import moment from "moment-timezone";


const useStyles = makeStyles(
  theme => ({
    [theme.breakpoints.up("lg")]: {
      colName: {
        width: "auto"
      },
      colPrice: {
        width: 300
      },
      colPublished: {
        width: 200
      },
      colType: {
        width: 200
      }
    },
    colAttribute: {
      width: 150
    },
    colFill: {
      padding: 0,
      width: "100%"
    },
    colName: {
      "&$colNameFixed": {
        width: 250
      }
    },
    colNameFixed: {},
    colNameHeader: {
      marginLeft: 32
    },
    colNameWrapper: {
      display: "block"
    },
    colPrice: {
      textAlign: "right"
    },
    colPublished: {},
    colType: {},
    link: {
      cursor: "pointer"
    },
    table: {
      tableLayout: "fixed"
    },
    tableContainer: {
      overflowX: "scroll"
    },
    textLeft: {
      textAlign: "left"
    },
    textRight: {
      textAlign: "right"
    },
    loading: {
      marginLeft: 32,
      width: 300
    },
    noProducts: {
      marginLeft: 32,
      width: 300
    }
  }),
  { name: "PricingList" }
);
export interface PricingTableProps {
  categoryId: string
}

export const PricingTable: React.FC<PricingTableProps> = ({
  categoryId
}) => {
  const classes = useStyles()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [activeProduct, setActiveProduct] = useState("")

  const numberOfColumns = 3
  const {data, loading} = usePricingProductListQuery({variables: {filter: {categories: categoryId ? [categoryId] : []}, first: 100} })
  const productList = data?.products?.edges


  const getProductPrice = (product, amountType) => {
    const priceRangeUndiscounted = product?.pricing?.priceRangeUndiscounted;

    if (!priceRangeUndiscounted) {
      return "-";
    }

    const { start, stop } = priceRangeUndiscounted;
    const {
      gross: { amount: startAmount }
    } = start;
    const {
      gross: { amount: stopAmount }
    } = stop;

    if ( amountType === "low" && startAmount) {
      return (
        <Money
          money={{
            amount: startAmount,
            currency: start.gross.currency
          }}
        />
      );
    } else if ( amountType === "high" && stopAmount){
      return (
        <Money
          money={{
            amount: stopAmount,
            currency: stop.gross.currency
          }}
        />
      );
    } else {
      return (
        "-"
      )
    }
  };
  console.log("productList", productList)
  
  let productRows;

  if (loading) {
    productRows = (
      <TableRow>
        <TableCell>
          <Typography variant="body1" className={classes.loading}>Loading products...</Typography>
        </TableCell>
      </TableRow>)
  } else if (productList.length > 0) {
    productRows = productList.map(({node}) => {
      return (
        <TableRow 
          onClick={() => {
            setIsDrawerOpen(!isDrawerOpen);
            setActiveProduct(node.id)
          }}
          key={node.id}
          className={classes.link}>
        <TableCell className={classes.colName} colSpan={numberOfColumns}>{node.privateMetadata.find(
          ({key, value}) => key === "mpn")?.value}</TableCell>
        <TableCell className={classes.colName} colSpan={numberOfColumns}>{node.category.name}</TableCell>
        <TableCell className={classes.colPrice} colSpan={numberOfColumns}>{getProductPrice(node, "low")}</TableCell>
        <TableCell className={classes.colPrice} colSpan={numberOfColumns}>{getProductPrice(node, "high")}</TableCell>
        <TableCell className={classes.textRight} colSpan={numberOfColumns}>{moment(node.updatedAt).format("MM/DD/YY hh:mm A")}</TableCell>
      </TableRow>
      );
    });
  } else {
    productRows = (
      <TableRow>
        <TableCell>
          <Typography variant="body1" className={classes.noProducts}>No products found</Typography>
        </TableCell>
      </TableRow>)
  }
  return (
    <>
      <PricingDetailDrawer 
        open={isDrawerOpen}
        closeDrawer={() => setIsDrawerOpen(false)}
        productId={activeProduct}
      />
        <div className={classes.tableContainer}>
        <ResponsiveTable className={classes.table}>
          <TableHead>
            <TableCellHeader colSpan={numberOfColumns} className={classes.colNameHeader}>MPN</TableCellHeader>
            <TableCellHeader colSpan={numberOfColumns} className={classes.colNameHeader}>Category</TableCellHeader>
            <TableCellHeader colSpan={numberOfColumns} textAlign="right" className={classes.colPrice}>Low</TableCellHeader>
            <TableCellHeader colSpan={numberOfColumns} textAlign="right" className={classes.colPrice}>High</TableCellHeader>
            <TableCellHeader colSpan={numberOfColumns} textAlign="right" className={classes.colPrice}>Last Updated</TableCellHeader>
          </TableHead>
          <TableBody>
            {productRows}
          </TableBody>
        </ResponsiveTable>
      </div>
    </>
  );
};