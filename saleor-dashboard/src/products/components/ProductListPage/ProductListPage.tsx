import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Drawer from "@material-ui/core/Drawer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CloseIcon from "@material-ui/icons/Close";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CardMenu from "@saleor/components/CardMenu";
import ColumnPicker, {
  ColumnPickerChoice
} from "@saleor/components/ColumnPicker";
import Container from "@saleor/components/Container";
import FilterBar from "@saleor/components/FilterBar";
import PageHeader from "@saleor/components/PageHeader";
import { ProductListColumns } from "@saleor/config";
import { sectionNames } from "@saleor/intl";
import {
  GridAttributes_availableInGrid_edges_node,
  GridAttributes_grid_edges_node
} from "@saleor/products/types/GridAttributes";
import { ProductList_products_edges_node } from "@saleor/products/types/ProductList";
import {
  FetchMoreProps,
  FilterPageProps,
  ListActions,
  PageListProps,
  SortPage
} from "@saleor/types";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { ProductListUrlSortField } from "../../urls";
import ProductList from "../ProductList";
import {
  createFilterStructure,
  ProductFilterKeys,
  ProductListFilterOpts
} from "./filters";

export interface ProductListPageProps
  extends PageListProps<ProductListColumns>,
    ListActions,
    FilterPageProps<ProductFilterKeys, ProductListFilterOpts>,
    FetchMoreProps,
    SortPage<ProductListUrlSortField> {
  activeAttributeSortId: string;
  availableInGridAttributes: GridAttributes_availableInGrid_edges_node[];
  currencySymbol: string;
  gridAttributes: GridAttributes_grid_edges_node[];
  totalGridAttributes: number;
  products: ProductList_products_edges_node[];
  onExport: () => void;
}

const useStyles = makeStyles(
  theme => ({
    columnPicker: {
      margin: theme.spacing(0, 3)
    },
    pricingDetail: {
      margin: theme.spacing(0, 0, 0, 3)
    },
    drawerPadding: {
      padding: theme.spacing(0, 3)
    },
    drawerHeader: {
      padding: theme.spacing(2, 3),
      display: "flex",
      justifyContent: "space-between",
      "& h2": {
        margin: 0
      },
      "& .MuiButton-text": {
        minWidth: 0,
        "& svg": {
          marginLeft: 0
        }
      }
    }
  }),
  { name: "ProductListPage" }
);

export const ProductListPage: React.FC<ProductListPageProps> = props => {
  const {
    currencySymbol,
    currentTab,
    defaultSettings,
    gridAttributes,
    availableInGridAttributes,
    filterOpts,
    hasMore,
    initialSearch,
    loading,
    settings,
    tabs,
    totalGridAttributes,
    onAdd,
    onAll,
    onExport,
    onFetchMore,
    onFilterChange,
    onSearchChange,
    onTabChange,
    onTabDelete,
    onTabSave,
    onUpdateListSettings,
    ...listProps
  } = props;
  const intl = useIntl();
  const classes = useStyles(props);

  const handleSave = (columns: ProductListColumns[]) =>
    onUpdateListSettings("columns", columns);

  const filterStructure = createFilterStructure(intl, filterOpts);

  const columns: ColumnPickerChoice[] = [
    {
      label: intl.formatMessage({
        defaultMessage: "Published",
        description: "product status"
      }),
      value: "isPublished" as ProductListColumns
    },
    {
      label: intl.formatMessage({
        defaultMessage: "Price",
        description: "product price"
      }),
      value: "price" as ProductListColumns
    },
    {
      label: intl.formatMessage({
        defaultMessage: "Type",
        description: "product type"
      }),
      value: "productType" as ProductListColumns
    },
    ...availableInGridAttributes.map(attribute => ({
      label: attribute.name,
      value: `attribute:${attribute.id}`
    }))
  ];

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  type DrawerSide = "top" | "left" | "bottom" | "right";
  const toggleDrawer = (side: DrawerSide, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  function createData(
    vendor: string,
    date: string,
    country: string,
    leadTime: number,
    qty: number,
    cost: string
  ) {
    return { vendor, date, country, leadTime, qty, cost };
  }

  const rows = [
    createData("XX004", "00/00", "United States", 2, 3, "00.00"),
    createData("XX007", "00/00", "United States", 4, 12, "00.00"),
    createData("XX007", "00/00", "United States", 4, 12, "00.00"),
    createData("XX007", "00/00", "United States", 4, 12, "00.00")
  ];

  function createHistoryData(date: string, change: string, price: string) {
    return { date, change, price };
  }

  const historyRows = [
    createHistoryData("00/00/00", "+ $00.00", "00.00"),
    createHistoryData("00/00/00", "+ $00.00", "00.00"),
    createHistoryData("00/00/00", "+ $00.00", "00.00"),
    createHistoryData("00/00/00", "+ $00.00", "00.00")
  ];

  return (
    <Container>
      <PageHeader title={intl.formatMessage(sectionNames.products)}>
        <CardMenu
          menuItems={[
            {
              label: intl.formatMessage({
                defaultMessage: "Export Products",
                description: "export products to csv file, button"
              }),
              onSelect: onExport,
              testId: "export"
            }
          ]}
          data-test="menu"
        />
        <ColumnPicker
          className={classes.columnPicker}
          columns={columns}
          defaultColumns={defaultSettings.columns}
          hasMore={hasMore}
          loading={loading}
          initialColumns={settings.columns}
          total={
            columns.length -
            availableInGridAttributes.length +
            totalGridAttributes
          }
          onFetchMore={onFetchMore}
          onSave={handleSave}
        />
        <Button
          onClick={onAdd}
          color="primary"
          variant="contained"
          data-test="add-product"
        >
          <FormattedMessage
            defaultMessage="Create Product"
            description="button"
          />
        </Button>
        <Button
          onClick={toggleDrawer("right", true)}
          className={classes.pricingDetail}
          color="primary"
          variant="contained"
        >
          <FormattedMessage
            defaultMessage="Open Pricing Detail"
            description="button"
          />
        </Button>
      </PageHeader>

      <Drawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer("right", false)}
      >
        <div className={classes.drawerHeader}>
          <h2>
            <a href="#">SR37K</a>
          </h2>
          <Button onClick={toggleDrawer("right", false)}>
            <CloseIcon />
          </Button>
        </div>

        <div className={classes.drawerPadding}>
          <h2>Offers</h2>
        </div>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Vendor</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Country of Origin</TableCell>
              <TableCell align="right">Lead Time</TableCell>
              <TableCell align="right">Qty</TableCell>
              <TableCell align="right">Cost</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.vendor} hover>
                <TableCell component="th" scope="row">
                  {row.vendor}
                </TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">{row.country}</TableCell>
                <TableCell align="right">{row.leadTime} days</TableCell>
                <TableCell align="right">{row.qty}</TableCell>
                <TableCell align="right">${row.cost}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className={classes.drawerPadding}>
          <h2>Pricing History</h2>
        </div>
        <Table className="borderless">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Change</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historyRows.map(row => (
              <TableRow key={row.date} hover>
                <TableCell component="th" scope="row">
                  {row.date}
                </TableCell>
                <TableCell align="right">{row.change}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Drawer>

      <Card>
        <FilterBar
          currencySymbol={currencySymbol}
          currentTab={currentTab}
          initialSearch={initialSearch}
          onAll={onAll}
          onFilterChange={onFilterChange}
          onSearchChange={onSearchChange}
          onTabChange={onTabChange}
          onTabDelete={onTabDelete}
          onTabSave={onTabSave}
          tabs={tabs}
          allTabLabel={intl.formatMessage({
            defaultMessage: "All Products",
            description: "tab name"
          })}
          filterStructure={filterStructure}
          searchPlaceholder={intl.formatMessage({
            defaultMessage: "Search Products..."
          })}
        />
        <ProductList
          {...listProps}
          loading={loading}
          gridAttributes={gridAttributes}
          settings={settings}
          onUpdateListSettings={onUpdateListSettings}
        />
      </Card>
    </Container>
  );
};
ProductListPage.displayName = "ProductListPage";
export default ProductListPage;
