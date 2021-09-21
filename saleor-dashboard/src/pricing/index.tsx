import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Route, RouteComponentProps } from "react-router-dom";
import {pricingListPath} from "./urls"
import {Card, TableRow, TableCell, TableBody} from "@material-ui/core"
import Checkbox from "@saleor/components/Checkbox";
import Container from "../components/Container"
import PageHeader from "../components/PageHeader"
import ResponsiveTable from "../components/ResponsiveTable"
import TableHead from "../components/TableHead"
import TableCellHeader from "../components/TableCellHeader"

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
  const classes = useStyles()
  const numberOfColumns = 2
  return (
    <Container>
      <PageHeader title="Pricing"/>
      <Card>
        <div className={classes.tableContainer}>
        <ResponsiveTable className={classes.table}>
          <TableHead>
            <TableCellHeader colSpan={numberOfColumns} className={classes.colNameHeader}>Product</TableCellHeader>
            <TableCellHeader colSpan={numberOfColumns} textAlign="right" className={classes.colPrice}>Price</TableCellHeader>
          </TableHead>
          <TableBody>
          <TableRow className={classes.link}>
            <TableCell padding="checkbox">
              <Checkbox />
            </TableCell>
            <TableCell className={classes.colName} colSpan={numberOfColumns}>Intel Pentium Processor</TableCell>
            <TableCell className={classes.colPrice} colSpan={numberOfColumns}>$100.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox />
            </TableCell>
            <TableCell className={classes.colName} colSpan={numberOfColumns}>Intel Pentium Processor</TableCell>
            <TableCell className={classes.colPrice} colSpan={numberOfColumns}>$100.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox />
            </TableCell>
            <TableCell className={classes.colName} colSpan={numberOfColumns}>Intel Pentium Processor</TableCell>
            <TableCell className={classes.colPrice} colSpan={numberOfColumns}>$100.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox />
            </TableCell>
            <TableCell className={classes.colName} colSpan={numberOfColumns}>Intel Pentium Processor</TableCell>
            <TableCell className={classes.colPrice} colSpan={numberOfColumns}>$100.00</TableCell>
          </TableRow>
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
