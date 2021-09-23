import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Drawer from "@material-ui/core/Drawer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Container from "@saleor/components/Container";
import PageHeader from "../../../components/PageHeader";


export interface PricingDetailDrawerProps {
  open: boolean;
  closeDrawer: () => void;
  productId: string;
}

export const PricingDetailDrawer: React.FC<PricingDetailDrawerProps> = (
  {open, closeDrawer, productId}) => {
  return (
    <Drawer
    anchor="right"
    open={open}
    onClose={closeDrawer}
  >
    <Container>
      <PageHeader title={productId}>
      <Button
          onClick={() => console.log("click")}
          color="primary"
          variant="contained"
        >
        Update
        </Button>
      </PageHeader>
      <Card>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>All Vendors</TableCell>
              <TableCell align="right">Cost</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Vendor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Low</TableCell>
              <TableCell align="right">$000.00</TableCell>
              <TableCell align="right">00/00/00</TableCell>
              <TableCell align="right">XX0004</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>High</TableCell>
              <TableCell align="right">$000.00</TableCell>
              <TableCell align="right">00/00/00</TableCell>
              <TableCell align="right">XX0004</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </Container>
  </Drawer>
  );
};