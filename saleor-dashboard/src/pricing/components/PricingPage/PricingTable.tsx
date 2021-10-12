import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {TableRow, TableCell, TableBody, TableHead, Typography} from "@material-ui/core"
import ResponsiveTable from "../../../components/ResponsiveTable"
import TableCellHeader from "../../../components/TableCellHeader"
import {usePricingProductListQuery} from "../../queries"
import Money from "@saleor/components/Money";
import { PricingDetailDrawer } from "./PricingDetailDrawer";
import moment from "moment-timezone";
import { useCategoryDetailsQuery } from "@saleor/categories/queries";


const useStyles = makeStyles(
  theme => ({
    [theme.breakpoints.up("lg")]: {
      colName: {
        width: "auto"
      },
      colPrice: {
        width: "auto"
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
        width: "auto"
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
  const [activeProduct, setActiveProduct] = useState({id: "", variants: [], mpn: "", itemMasterId: ""})


  const {data, loading, refetch} = usePricingProductListQuery({variables: {filter: {categories: categoryId ? [categoryId] : []}, first: 50} })
  const categoryDetails = useCategoryDetailsQuery({variables: {id: categoryId || "a", first: 10}})
  const categorySlug = categoryDetails.data?.category?.slug
  const attributeFilter = categorySlug?.split("-")[0]
  const productList = data?.products?.edges
  const tableAttributes = productList && productList.length > 0 ? productList[0]?.node.attributes.filter(({attribute: {slug}}) => slug?.startsWith(attributeFilter)) : []
  const numberOfColumns = 4 + tableAttributes.length
  const attributeColumnHeadings = tableAttributes.map(({attribute}) => (
    <TableCellHeader key={attribute?.id} colSpan={numberOfColumns} className={classes.colNameHeader}>{attribute?.name}</TableCellHeader>
  ))
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
      const relevantAttributes = node.attributes.filter(({attribute: {slug}}) => slug?.startsWith(attributeFilter))
      const mpn = node.metadata.find(({key}) => key === "mpn")?.value
      const itemMasterId = node.metadata.find(({key}) => key === "item_master_id")?.value
      const attributeValues = relevantAttributes?.map(({values}) => (
        <TableCell key={values[0]?.id} className={classes.colName} colSpan={numberOfColumns}>{values[0]?.name}</TableCell>
      ))
      return (
        <TableRow 
          onClick={() => {
            setIsDrawerOpen(!isDrawerOpen);
            setActiveProduct({
              variants: node.variants,
              id: node.id,
              mpn,
              itemMasterId
            })
          }}
          key={node.id}
          className={classes.link}>
        <TableCell className={classes.colName} colSpan={numberOfColumns}>{mpn}</TableCell>
        {attributeValues}
        <TableCell className={classes.colPrice} colSpan={numberOfColumns}>{getProductPrice(node, "low")}</TableCell>
        <TableCell className={classes.colPrice} colSpan={numberOfColumns}>{getProductPrice(node, "high")}</TableCell>
        <TableCell className={classes.textRight} colSpan={numberOfColumns}>{moment(node.updatedAt).format("MM/DD/YY hh:mm A")}</TableCell>
      </TableRow>
    )});
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
        refetchProducts={refetch}
        open={isDrawerOpen}
        closeDrawer={() => setIsDrawerOpen(false)}
        variants={activeProduct.variants}
        productId={activeProduct.id}
        productMPN={activeProduct.mpn}
        productItemMasterId={activeProduct.itemMasterId?.toString()}
      />
        <div className={classes.tableContainer}>
        <ResponsiveTable className={classes.table}>
          <TableHead>
            <TableCellHeader colSpan={numberOfColumns} className={classes.colNameHeader}>MPN</TableCellHeader>
            {attributeColumnHeadings}
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