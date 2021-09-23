import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Route, RouteComponentProps } from "react-router-dom";
import {pricingListPath} from "../../urls"
import {Card, TableRow, TableCell, TableBody, Drawer, TableHead} from "@material-ui/core"
import Container from "@saleor/components/Container";
import PageHeader from "../../../components/PageHeader"
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
    }
  }),
  { name: "PricingList" }
);

const PricingPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [activeProduct, setActiveProduct] = useState("")
  const classes = useStyles()
  const numberOfColumns = 3
  const {data} = usePricingProductListQuery({variables: {filter: {categories: []}, first: 100} })
  const productList = data?.products?.edges || []


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
  console.log(productList)

  const productRows = productList.map(({node}) => {
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

  return (
    <Container>
      <PricingDetailDrawer 
        open={isDrawerOpen}
        closeDrawer={() => setIsDrawerOpen(false)}
        productId={activeProduct}
      />
      <PageHeader title="Pricing"/>
      <Card>
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
      </Card>
    </Container>
  )
}


const Component = () => (
  <Route exact path={pricingListPath} component={PricingPage} />
);

export default Component;
