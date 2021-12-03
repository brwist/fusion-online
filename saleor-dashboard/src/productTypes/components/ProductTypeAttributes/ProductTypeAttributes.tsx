import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import CardTitle from "@saleor/components/CardTitle";
import Checkbox from "@saleor/components/Checkbox";
import ResponsiveTable from "@saleor/components/ResponsiveTable";
import Skeleton from "@saleor/components/Skeleton";
import {
  SortableTableBody,
  SortableTableRow
} from "@saleor/components/SortableTable";
import TableHead from "@saleor/components/TableHead";
import { maybe, renderCollection, stopPropagation } from "@saleor/misc";
import { ListActions, ReorderAction } from "@saleor/types";
import { AttributeTypeEnum } from "@saleor/types/globalTypes";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import Switch from "@material-ui/core/Switch";
import { useState } from "react";
import { useProductTypeUpdateMutation } from "@saleor/productTypes/mutations";
import useNotifier from "@saleor/hooks/useNotifier";
import { commonMessages } from "@saleor/intl";

import {
  ProductTypeDetails_productType_productAttributes,
  ProductTypeDetails_productType_variantAttributes
} from "../../types/ProductTypeDetails";
import { attribute } from "@saleor/attributes/fixtures";

const useStyles = makeStyles(
  {
    colAction: {
      "&:last-child": {
        paddingRight: 0
      },
      width: 80
    },
    colGrab: {
      width: 60
    },
    colName: {},
    colSlug: {
      width: 300
    },
    link: {
      cursor: "pointer"
    },
    textLeft: {
      textAlign: "left"
    }
  },
  { name: "ProductTypeAttributes" }
);

interface ProductTypeAttributesProps extends ListActions {
  attributes:
    | ProductTypeDetails_productType_productAttributes[]
    | ProductTypeDetails_productType_variantAttributes[];
  disabled: boolean;
  type: string;
  onAttributeAssign: (type: AttributeTypeEnum) => void;
  onAttributeClick: (id: string) => void;
  onAttributeReorder: ReorderAction;
  onAttributeUnassign: (id: string) => void;
  // onHasAttributeToggle: (featuredProduct: boolean) => void;
}

const numberOfColumns = 5;

const ProductTypeAttributes: React.FC<ProductTypeAttributesProps> = props => {
  const [check, setCheck] = useState(false);
  const notify = useNotifier();

  const [errors, setErrors] = React.useState({
    addAttributeErrors: [],
    editAttributeErrors: []
  });

  const [
    updateProductType,
    updateProductTypeOpts
  ] = useProductTypeUpdateMutation({
    onCompleted: updateData => {
      if (
        !updateData.productTypeUpdate.errors ||
        updateData.productTypeUpdate.errors.length === 0
      ) {
        notify({
          status: "success",
          text: intl.formatMessage(commonMessages.savedChanges)
        });
      } else if (
        updateData.productTypeUpdate.errors !== null &&
        updateData.productTypeUpdate.errors.length > 0
      ) {
        setErrors(prevErrors => ({
          ...prevErrors,
          formErrors: updateData.productTypeUpdate.errors
        }));
      }
    }
  });

  const handleProductTypeAttributeToggle = (featuredProduct: boolean, id) => {
    const updatedAttributes = props?.attributes.map(attributes => {
      if (attributes.id === id) {
        return { ...attribute, featuredProduct: true };
      } else {
        return attribute;
      }
    });

    // updateProductType({
    //   variables: {
    //     id,
    //     input: {
    //       featuredProduct
    //     }
    //   }
    // });
  };

  const {
    attributes,
    disabled,
    isChecked,
    selected,
    toggle,
    toggleAll,
    toolbar,
    type,
    onAttributeAssign,
    onAttributeClick,
    onAttributeReorder,
    onAttributeUnassign
    // onHasAttributeToggle
  } = props;
  const classes = useStyles(props);
  const intl = useIntl();

  return (
    <Card
      data-test={
        type === AttributeTypeEnum.PRODUCT
          ? "product-attributes"
          : "variant-attributes"
      }
    >
      <CardTitle
        title={
          type === AttributeTypeEnum.PRODUCT
            ? intl.formatMessage({
                defaultMessage: "Product Attributes",
                description: "section header"
              })
            : intl.formatMessage({
                defaultMessage: "Variant Attributes",
                description: "section header"
              })
        }
        toolbar={
          <Button
            color="primary"
            variant="text"
            onClick={() => onAttributeAssign(AttributeTypeEnum[type])}
          >
            <FormattedMessage
              defaultMessage="Assign attribute"
              description="button"
            />
          </Button>
        }
      />
      <ResponsiveTable>
        <colgroup>
          <col className={classes.colGrab} />
          <col />
          <col className={classes.colName} />
          <col className={classes.colSlug} />
          <col className={classes.colAction} />
        </colgroup>
        {attributes?.length > 0 && (
          <TableHead
            colSpan={numberOfColumns}
            disabled={disabled}
            dragRows
            selected={selected}
            items={attributes}
            toggleAll={toggleAll}
            toolbar={toolbar}
          >
            <TableCell className={classes.colName}>
              <FormattedMessage defaultMessage="Attribute name" />
            </TableCell>
            <TableCell className={classes.colName}>
              <FormattedMessage
                defaultMessage="Slug"
                description="attribute internal name"
              />
            </TableCell>
            {type === AttributeTypeEnum.PRODUCT ? (
              <TableCell className={classes.colName}>
                <FormattedMessage defaultMessage="Featured" />
              </TableCell>
            ) : (
              ""
            )}
            <TableCell />
          </TableHead>
        )}
        <SortableTableBody onSortEnd={onAttributeReorder}>
          {renderCollection(
            attributes,
            (attribute, attributeIndex) => {
              const isSelected = attribute ? isChecked(attribute.id) : false;

              return (
                <SortableTableRow
                  selected={isSelected}
                  className={!!attribute ? classes.link : undefined}
                  hover={!!attribute}
                  key={maybe(() => attribute.id)}
                  index={attributeIndex || 0}
                  data-test="id"
                  data-test-id={maybe(() => attribute.id)}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      disabled={disabled}
                      disableClickPropagation
                      onChange={() => toggle(attribute.id)}
                    />
                  </TableCell>
                  <TableCell
                    className={classes.colName}
                    onClick={
                      !!attribute
                        ? () => onAttributeClick(attribute.id)
                        : undefined
                    }
                    data-test="name"
                  >
                    {maybe(() => attribute.name) ? (
                      attribute.name
                    ) : (
                      <Skeleton />
                    )}
                  </TableCell>
                  <TableCell className={classes.colSlug} data-test="slug">
                    {maybe(() => attribute.slug) ? (
                      attribute.slug
                    ) : (
                      <Skeleton />
                    )}
                  </TableCell>

                  {type === AttributeTypeEnum.PRODUCT ? (
                    <TableCell className={classes.colAction}>
                      <Switch
                        // id={maybe(() => attribute.id)}
                        defaultChecked={attribute.featuredProduct}
                        // disabled={disabled}

                        color="primary"
                        name="attributeToogle"
                        onChange={e => {
                          handleProductTypeAttributeToggle(
                            e.target.checked,
                            attribute.id
                          );
                        }}

                        // onChange={(e)=>{attribute.featuredProduct=e.target.checked}}
                        // onChange={(event)=> {handleCheck(event.target.checked)}}
                      />
                    </TableCell>
                  ) : (
                    ""
                  )}

                  <TableCell className={classes.colAction}>
                    <IconButton
                      onClick={stopPropagation(() =>
                        onAttributeUnassign(attribute.id)
                      )}
                    >
                      <DeleteIcon color="primary" />
                    </IconButton>
                  </TableCell>
                </SortableTableRow>
              );
            },
            () => (
              <TableRow>
                <TableCell colSpan={numberOfColumns}>
                  <FormattedMessage defaultMessage="No attributes found" />
                </TableCell>
              </TableRow>
            )
          )}
        </SortableTableBody>
      </ResponsiveTable>
    </Card>
  );
};
ProductTypeAttributes.displayName = "ProductTypeAttributes";
export default ProductTypeAttributes;
